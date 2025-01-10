import { DebouncedInput } from "@/components/react-table/DebouncedInput";
import type { Column } from "@tanstack/react-table";

type Props<T> = {
  column: Column<T, unknown>;
  filteredRows: string[];
};

export function Filter<T>({ column, filteredRows }: Props<T>) {
  const columnFilterValue = column.getFilterValue();

  const uniqueFilteredValues = new Set(filteredRows);

  const sortedUniqueValues = Array.from(uniqueFilteredValues).sort();

  return (
    <>
      {/* biome-ignore lint/style/useTemplate: <explanation> */}
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.map((value, i) => (
          <option value={value} key={`${i}-${column.id}`} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${uniqueFilteredValues.size})`}
        className="w-full rounded border bg-card shadow"
        // biome-ignore lint/style/useTemplate: <explanation>
        list={column.id + "list"}
      />
    </>
  );
}
