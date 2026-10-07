import type { ComponentDoc, PropDoc } from "../scripts/mcp-index.types.ts";

export function renderComponent(component: ComponentDoc): string {
	const out = [`# ${component.displayName}`, "", component.description, ""];

	if (component.exportName) {
		out.push("## Import", "", "```tsx", renderImport(component), "```", "");
	}

	if (component.props.length > 0) {
		out.push("## Props", "");
		for (const group of groupProps(component.props)) {
			if (group.heading) {
				out.push(`### ${group.heading}`, "");
			}
			if (group.extra) {
				out.push(group.extra, "");
			}
			out.push(
				"| Prop | Type | Required | Default | Options | Description |",
				"| --- | --- | --- | --- | --- | --- |",
			);
			for (const prop of group.props) {
				const options =
					prop.options?.map((option) => `\`${option}\``).join(", ") ?? "";
				out.push(
					`| \`${prop.name}\` | \`${escapeTable(prop.type)}\` | ${prop.required ? "yes" : "no"} | ${prop.defaultValue ? `\`${escapeTable(prop.defaultValue)}\`` : ""} | ${options} | ${prop.description ?? ""} |`,
				);
			}
			out.push("");
		}
	}

	const variantEntries = Object.entries(component.variants);
	if (variantEntries.length > 0) {
		out.push("## Variants", "");
		for (const [key, values] of variantEntries) {
			out.push(
				`- **${key}**: ${values.map((value) => `\`${value}\``).join(", ")}`,
			);
		}
		out.push("");
	}

	for (const section of component.sections) {
		out.push(`## ${section.heading}`, "", section.markdown, "");
	}

	if (component.examples.length > 0) {
		out.push("## Examples", "");
		for (const example of component.examples) {
			out.push(
				`### ${example.title}`,
				"",
				`\`\`\`${example.language}`,
				example.code,
				"```",
				"",
			);
		}
	}

	return out.join("\n").trim();
}

function renderImport(component: ComponentDoc): string {
	const names =
		component.exports.length > 0 ? component.exports : [component.exportName];

	if (names.length === 1) {
		return `import { ${names[0]} } from "${component.importPath}";`;
	}

	return [
		"import {",
		...names.map((name) => `\t${name},`),
		`} from "${component.importPath}";`,
	].join("\n");
}

function groupProps(props: PropDoc[]): {
	heading?: string;
	extra?: string;
	props: PropDoc[];
}[] {
	const groups: {
		heading?: string;
		extra?: string;
		props: PropDoc[];
	}[] = [];

	for (const prop of props) {
		const last = groups.at(-1);
		if (last && last.heading === prop.group) {
			last.props.push(prop);
			continue;
		}

		groups.push({
			heading: prop.group,
			extra: prop.groupExtra,
			props: [prop],
		});
	}

	return groups;
}

function escapeTable(value: string): string {
	return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}
