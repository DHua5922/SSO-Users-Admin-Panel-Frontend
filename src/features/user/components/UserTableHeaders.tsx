export default function UserTableHeaders() {
  return (
    <thead>
      <tr>
        {["Username", "Email", "Role", "Edit", "Delete"].map(
          (header, index) => (
            <th key={index} className="text-center text-lg">
              {header}
            </th>
          ),
        )}
      </tr>
    </thead>
  );
}
