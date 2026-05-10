export default function DataTable({
  columns,
  children,
  isEmpty = false,
  emptyMessage = "No items found.",
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm w-full overflow-x-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-5 h-[52px] text-sm font-semibold text-[#0F172B] tracking-wide whitespace-nowrap ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E2E8F0]">
          {isEmpty ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-14 text-slate-400 text-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}