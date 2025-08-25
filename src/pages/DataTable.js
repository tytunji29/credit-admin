import React, { useState, useMemo } from "react";

const DataTable = ({ columns, data, pageSize = 5 }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  // 🔍 Filter rows
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // 📄 Pagination logic
  const start = page * pageSize;
  const paginatedData = filteredData.slice(start, start + pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="p-4">
      {/* Search box */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded mb-3 w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0); // reset to first page when searching
        }}
      />

      {/* Table */}
      <table className="w-full border-collapse border rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="border p-2 text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-100">
                {columns.map((col, j) => (
                  <td key={j} className="border p-2">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-4 text-gray-500"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page + 1} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
