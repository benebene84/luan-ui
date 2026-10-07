export type McpIndex = {
	version: string;
	generatedFrom: string;
	components: ComponentDoc[];
};

export type ComponentDoc = {
	name: string;
	displayName: string;
	exportName: string;
	exports: string[];
	importPath: string;
	description: string;
	props: PropDoc[];
	variants: Record<string, string[]>;
	sections: DocSection[];
	examples: CodeExample[];
};

export type PropDoc = {
	name: string;
	type: string;
	required: boolean;
	options?: string[];
	defaultValue?: string;
	description?: string;
	group?: string;
	groupExtra?: string;
};

export type DocSection = {
	heading: string;
	markdown: string;
};

export type CodeExample = {
	title: string;
	language: string;
	code: string;
};
