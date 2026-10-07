type PropDef = {
	name: string;
	type: string;
	defaultValue?: string;
	description?: string;
};

type PropsTableProps = {
	heading?: string;
	rows: PropDef[];
	extra?: string;
};

export function PropsTable({ heading, rows, extra }: PropsTableProps) {
	return (
		<div className="sb-props-table">
			{heading ? <h4>{heading}</h4> : null}
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row.name}>
							<td>
								<code>{row.name}</code>
							</td>
							<td>
								<code>{row.type}</code>
							</td>
							<td>
								{row.defaultValue ? <code>{row.defaultValue}</code> : "—"}
							</td>
							<td>{row.description}</td>
						</tr>
					))}
				</tbody>
			</table>
			{extra ? <p>{extra}</p> : null}
		</div>
	);
}
