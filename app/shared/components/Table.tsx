import { Box } from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
export default function Table<T>({
  data,
  columns,
  onRowClick,
}: {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (rowData: T) => void;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Box as="tr" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Box as="th" w="auto" px={5} key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </Box>
              ))}
            </Box>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Box
              as="tr"
              onClick={() => onRowClick?.(row.original)}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <Box as="td" px={5} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Box>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
