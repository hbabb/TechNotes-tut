/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults";

import {
  type ColumnFiltersState,
  type SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowDown, ArrowUp, ArrowUpDown, CircleCheckIcon, CircleXIcon } from "lucide-react";

import { Filter } from "@/components/react-table/filter";
import { Button } from "@/components/ui/button";
import { usePolling } from "@/hooks/usePolling";
import { useRouter, useSearchParams } from "next/navigation";
import { type JSX, useEffect, useMemo, useState } from "react";

type Props = {
  data: TicketSearchResultsType;
};

type RowType = TicketSearchResultsType[0];

/**
 * The TicketTable component displays a table of tickets, with
 * filtering, sorting, and pagination.
 *
 * @param {TicketSearchResultsType} data - The data to display in the table.
 * @returns {JSX.Element} The table component.
 */
export function TicketTable({ data }: Props): JSX.Element {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "ticketDate",
      desc: false, // false for asc, true for desc
    },
  ]);

  // Poll for new data every 30 seconds.
  usePolling(searchParams.get("searchText"), 30000);

  // Get the current page index from the search params. If the page is not
  // specified, default to 0.
  const pageIndex = useMemo(() => {
    const page = searchParams.get("page");
    return page ? Number.parseInt(page) - 1 : 0;
  }, [searchParams.get("page")]);

  // The column headers array contains the keys of the columns to display
  // in the table.
  const columnHeadersArray: Array<keyof RowType> = [
    "ticketDate",
    "title",
    "tech",
    "firstName",
    "lastName",
    "email",
    "completed",
  ];

  // The column widths object specifies the width of each column in the table.
  const columnWidths = {
    completed: 100,
    ticketDate: 50,
    title: 250,
    tech: 225,
    email: 225,
  };

  // The column helper is used to create the columns for the table.
  const columnHelper = createColumnHelper<RowType>();

  // The columns array contains the column definitions.
  const columns = columnHeadersArray.map((columnName) => {
    return columnHelper.accessor(
      (row) => {
        // Transformational: convert the value of the column to a string.
        const value = row[columnName];
        if (columnName === "ticketDate" && value instanceof Date) {
          return value.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
        }

        if (columnName === "completed") {
          return value ? "COMPLETED" : "OPEN";
        }

        return value;
      },
      {
        id: columnName,
        size: columnWidths[columnName as keyof typeof columnWidths] ?? undefined,
        header: ({ column }) => {
          // Render the header for the column.
          return (
            <Button
              variant="ghost"
              className="flex w-full justify-between pl-1"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {columnName[0].toUpperCase() + columnName.slice(1)}

              {column.getIsSorted() === "asc" && <ArrowUp className="ml-2 size-4" />}

              {column.getIsSorted() === "desc" && <ArrowDown className="ml-2 size-4" />}

              {column.getIsSorted() !== "desc" && column.getIsSorted() !== "asc" && (
                <ArrowUpDown className="ml-2 size-4" />
              )}
            </Button>
          );
        },
        cell: ({ getValue }) => {
          // Presentational: render the cell for the column.
          const value = getValue();

          if (columnName === "completed") {
            return (
              <div className="grid place-content-center">
                {value === "OPEN" ? (
                  <CircleXIcon className="opacity-25" />
                ) : (
                  <CircleCheckIcon className="text-blue-600" />
                )}
              </div>
            );
          }
          return value;
        },
      },
    );
  });

  // The table state is initialized with the page index, column filters,
  // and sorting.
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
  });

  // When the column filters change, update the search params.
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();

    if (pageCount <= currentPageIndex && currentPageIndex > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [table.getState().columnFilters]);

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border border-border">
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-secondary p-1"
                    style={{ width: header.getSize() }}
                  >
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div className="grid place-content-center">
                        <Filter
                          column={header.column}
                          filteredRows={table
                            .getFilteredRowModel()
                            .rows.map((row) => row.getValue(header.column.id))}
                        />
                      </div>
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                onClick={() => router.push(`/tickets/form?ticketId=${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-1">
        <div>
          <p className="whitespace-nowrap font-bold">
            {`Page ${table.getState().pagination.pageIndex + 1} of ${Math.max(1, table.getPageCount())}`}
            &nbsp;&nbsp;
            {`[${table.getFilteredRowModel().rows.length} ${table.getFilteredRowModel().rows.length !== 1 ? "total results" : "result"}]`}
          </p>
        </div>
        <div className="flex flex-row gap-1">
          <div className="flex flex-row gap-1">
            <Button variant="outline" onClick={() => router.refresh()}>
              Refresh Data
            </Button>
            <Button variant="outline" onClick={() => table.resetSorting()}>
              Reset Sorting
            </Button>
            <Button variant="outline" onClick={() => table.resetColumnFilters()}>
              Reset Filters
            </Button>
          </div>
          <div className="flex flex-row gap-1">
            <Button
              variant="outline"
              onClick={() => {
                const newIndex = table.getState().pagination.pageIndex - 1;
                table.setPageIndex(newIndex);
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", (newIndex + 1).toString());
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const newIndex = table.getState().pagination.pageIndex + 1;
                table.setPageIndex(newIndex);
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", (newIndex + 1).toString());
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
