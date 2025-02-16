import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomTable({ title, subtitle, columns, data }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium">{title}</h2>
        <select className="border rounded-md px-3 py-1 text-sm">
          <option>This month</option>
        </select>
      </div>
      {subtitle && <p className="text-gray-500 text-sm mb-4">{subtitle}</p>}
      <Table>
        <TableHeader className="bg-[#f6f6f6] rounded-t-lg">
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.accessor}
                className="text-gray-800 font-bold py-4 px-6"
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell
                  key={col.accessor}
                  className="p-4 border-b border-[#f6f6f6]"
                >
                  {row[col.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
