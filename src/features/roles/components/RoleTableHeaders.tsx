export default function RoleTableHeaders() {
	return (
		<thead>
			<tr>
				{["Name", "Description", "Edit", "Delete"].map((header, index) => (
					<th key={index} className="text-center text-lg">
						{header}
					</th>
				))}
			</tr>
		</thead>
	);
}
