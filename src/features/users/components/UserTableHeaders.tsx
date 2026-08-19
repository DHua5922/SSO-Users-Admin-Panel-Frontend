export default function UserTableHeaders() {
	return (
		<thead>
			<tr>
				{["Username", "Email", "Role", "Edit", "Delete"].map(
					(header, index) => (
						<th key={index} scope="col" className="table-header">
							{header}
						</th>
					),
				)}
			</tr>
		</thead>
	);
}
