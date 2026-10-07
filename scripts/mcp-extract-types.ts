import { createRequire } from "node:module";
import { dirname, relative, resolve } from "node:path";
import type { PropDoc } from "./mcp-index.types.ts";

type TS = typeof import("typescript-6");

const require = createRequire(import.meta.url);
const ts = require("typescript-6") as TS;

const SRC_ROOT = "src/";
const MAX_ENUM_OPTIONS = 24;

export function createTsProgram(
	rootDir: string,
): import("typescript-6").Program {
	const configPath = ts.findConfigFile(
		rootDir,
		ts.sys.fileExists,
		"tsconfig.json",
	);
	if (!configPath) {
		throw new Error("tsconfig.json not found");
	}

	const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
	if (configFile.error) {
		throw new Error(
			ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n"),
		);
	}

	const parsed = ts.parseJsonConfigFileContent(
		configFile.config,
		ts.sys,
		dirname(configPath),
	);

	return ts.createProgram({
		rootNames: parsed.fileNames,
		options: parsed.options,
	});
}

export function extractOwnedProps(
	program: import("typescript-6").Program,
	filePath: string,
	rootDir: string,
): PropDoc[] {
	const sourceFile = findSourceFile(program, filePath);
	if (!sourceFile) {
		return [];
	}

	const checker = program.getTypeChecker();
	const props: PropDoc[] = [];
	const seen = new Set<string>();

	const visit = (node: import("typescript-6").Node) => {
		if (ts.isTypeAliasDeclaration(node) && node.name.text.endsWith("Props")) {
			const group = node.name.text.replace(/Props$/, "");
			const type = checker.getTypeFromTypeNode(node.type);

			for (const symbol of type.getProperties()) {
				if (!isDeclaredInSrc(symbol, rootDir)) {
					continue;
				}

				const name = symbol.getName();
				const key = `${group}.${name}`;
				if (seen.has(key)) {
					continue;
				}
				seen.add(key);

				const declaration = firstPropertyDeclaration(symbol);
				const typeNode = declaration?.type;
				const typeText = typeNode
					? collapseWhitespace(typeNode.getText(declaration.getSourceFile()))
					: checker.typeToString(
							checker.getTypeOfSymbolAtLocation(symbol, sourceFile),
						);
				const options = typeNode
					? optionsFromTypeNode(typeNode)
					: optionsFromCheckerType(
							checker.getTypeOfSymbolAtLocation(symbol, sourceFile),
						);

				props.push({
					name,
					type: typeText,
					required: isRequired(symbol, declaration),
					...(options ? { options } : {}),
					group,
				});
			}
		}

		ts.forEachChild(node, visit);
	};

	visit(sourceFile);
	return props;
}

export function extractVariants(
	program: import("typescript-6").Program,
	filePath: string,
): Record<string, string[]> {
	const sourceFile = findSourceFile(program, filePath);
	if (!sourceFile) {
		return {};
	}

	const variants: Record<string, string[]> = {};

	const visit = (node: import("typescript-6").Node) => {
		if (
			ts.isCallExpression(node) &&
			isGetVariantsCall(node) &&
			node.arguments[0]
		) {
			const argument = node.arguments[0];
			if (ts.isObjectLiteralExpression(argument)) {
				const variantsProp = argument.properties.find(
					(property) =>
						ts.isPropertyAssignment(property) &&
						propertyName(property) === "variants",
				);

				if (
					variantsProp &&
					ts.isPropertyAssignment(variantsProp) &&
					ts.isObjectLiteralExpression(variantsProp.initializer)
				) {
					for (const property of variantsProp.initializer.properties) {
						if (
							!ts.isPropertyAssignment(property) ||
							!ts.isObjectLiteralExpression(property.initializer)
						) {
							continue;
						}

						const name = propertyName(property);
						if (!name) {
							continue;
						}

						const options = property.initializer.properties
							.map(propertyName)
							.filter((option): option is string => option != null);

						if (isBooleanVariant(options) || options.length === 0) {
							continue;
						}

						variants[name] = options;
					}
				}
			}
		}

		ts.forEachChild(node, visit);
	};

	visit(sourceFile);
	return variants;
}

function isGetVariantsCall(
	node: import("typescript-6").CallExpression,
): boolean {
	return (
		ts.isIdentifier(node.expression) && node.expression.text === "getVariants"
	);
}

function propertyName(
	property: import("typescript-6").ObjectLiteralElementLike,
): string | undefined {
	if (
		!ts.isPropertyAssignment(property) &&
		!ts.isShorthandPropertyAssignment(property) &&
		!ts.isMethodDeclaration(property)
	) {
		return undefined;
	}

	if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) {
		return property.name.text;
	}

	return undefined;
}

function isBooleanVariant(options: string[]): boolean {
	return (
		options.length > 0 &&
		options.every((option) => option === "true" || option === "false")
	);
}

function isDeclaredInSrc(
	symbol: import("typescript-6").Symbol,
	rootDir: string,
): boolean {
	const declarations = symbol.getDeclarations() ?? [];
	return declarations.some((declaration) => {
		const fileName = declaration.getSourceFile().fileName;
		const relativePath = toPosix(relative(rootDir, fileName));
		return (
			relativePath.startsWith(SRC_ROOT) && !fileName.includes("node_modules")
		);
	});
}

function firstPropertyDeclaration(
	symbol: import("typescript-6").Symbol,
):
	| import("typescript-6").PropertySignature
	| import("typescript-6").PropertyDeclaration
	| undefined {
	for (const declaration of symbol.getDeclarations() ?? []) {
		if (
			ts.isPropertySignature(declaration) ||
			ts.isPropertyDeclaration(declaration)
		) {
			return declaration;
		}
	}

	return undefined;
}

function isRequired(
	symbol: import("typescript-6").Symbol,
	declaration:
		| import("typescript-6").PropertySignature
		| import("typescript-6").PropertyDeclaration
		| undefined,
): boolean {
	if (declaration?.questionToken) {
		return false;
	}

	return (symbol.flags & ts.SymbolFlags.Optional) === 0;
}

function optionsFromTypeNode(
	typeNode: import("typescript-6").TypeNode,
): string[] | undefined {
	if (ts.isParenthesizedTypeNode(typeNode)) {
		return optionsFromTypeNode(typeNode.type);
	}

	if (ts.isUnionTypeNode(typeNode)) {
		return literalsFromTypeNodes(typeNode.types);
	}

	if (
		ts.isTypeReferenceNode(typeNode) &&
		typeNode.typeName.getText() === "ResponsiveValue" &&
		typeNode.typeArguments?.[0]
	) {
		return optionsFromTypeNode(typeNode.typeArguments[0]);
	}

	if (ts.isLiteralTypeNode(typeNode) && ts.isStringLiteral(typeNode.literal)) {
		return [typeNode.literal.text];
	}

	return undefined;
}

function literalsFromTypeNodes(
	nodes: readonly import("typescript-6").TypeNode[],
): string[] | undefined {
	const literals: string[] = [];

	for (const node of nodes) {
		if (ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal)) {
			literals.push(node.literal.text);
			continue;
		}

		if (node.kind === ts.SyntaxKind.UndefinedKeyword) {
			continue;
		}

		return undefined;
	}

	if (literals.length === 0 || literals.length > MAX_ENUM_OPTIONS) {
		return undefined;
	}

	return literals;
}

function optionsFromCheckerType(
	type: import("typescript-6").Type,
): string[] | undefined {
	if (!type.isUnion()) {
		return undefined;
	}

	const literals: string[] = [];

	for (const part of type.types) {
		if (part.flags & ts.TypeFlags.Undefined) {
			continue;
		}
		if (part.isStringLiteral()) {
			literals.push(part.value);
			continue;
		}
		return undefined;
	}

	if (literals.length === 0 || literals.length > MAX_ENUM_OPTIONS) {
		return undefined;
	}

	return literals;
}

function findSourceFile(
	program: import("typescript-6").Program,
	filePath: string,
): import("typescript-6").SourceFile | undefined {
	const absolute = toPosix(resolve(filePath));
	for (const sourceFile of program.getSourceFiles()) {
		if (toPosix(sourceFile.fileName) === absolute) {
			return sourceFile;
		}
	}

	const marker = "/src/components/";
	const index = absolute.lastIndexOf(marker);
	if (index === -1) {
		return undefined;
	}

	const suffix = absolute.slice(index + 1);
	return program
		.getSourceFiles()
		.find((sourceFile) => toPosix(sourceFile.fileName).endsWith(suffix));
}

function collapseWhitespace(value: string): string {
	return value.replace(/\s+/g, " ").trim();
}

function toPosix(filePath: string): string {
	return filePath.split("\\").join("/");
}
