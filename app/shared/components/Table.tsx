import { Box } from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
    <Box>
      <Box h="fit-content" borderRadius="8px" p={2}>
        <Box as="table">
          <Box as="thead">
            {table.getHeaderGroups().map((headerGroup) => (
              <Box as="tr" key={headerGroup.id}>
                {headerGroup.headers.map((header, i) => (
                  <Box
                    as="th"
                    w="auto"
                    bg="blue.300"
                    borderBottom="1px solid blue"
                    color="white"
                    py={1}
                    px={5}
                    key={header.id}
                    borderTopLeftRadius={i === 0 ? "12px" : undefined}
                    borderTopRightRadius={
                      i === headerGroup.headers?.length - 1 ? "12px" : undefined
                    }
                  >
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
          </Box>
          <Box as="tbody">
            {table.getRowModel().rows.map((row) => (
              <Box
                as="tr"
                role="group"
                _hover={{
                  bg: "gray.100",
                  cursor: !!onRowClick ? "pointer" : undefined,
                }}
                border="1px solid blue"
                onClick={() => onRowClick?.(row.original)}
                key={row.id}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <Box
                    as="td"
                    _groupHover={{ color: "blue.600" }}
                    px={5}
                    borderRight={
                      i !== row.getAllCells()?.length - 1
                        ? "1px solid blue"
                        : undefined
                    }
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
