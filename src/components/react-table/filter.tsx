import { DebouncedInput } from "@/components/react-table/DebouncedInput";
import type { Column } from "@tanstack/react-table";

type Props<T> = {
  column: Column<T, unknown>;
};

export function Filter<T>({ column }: Props<T>) {
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = Array.from(column.getFacetedUniqueValues().keys()).sort();

  return (
    <>
      <datalist id={`${column.id}list`}>
        {sortedUniqueValues.map((value, i) => (
          <option value={value} key={`${i}-${column.id}`} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        onChange={(value: any) => column.setFilterValue(value)}
        placeholder={`Search... (${[...column.getFacetedUniqueValues()].filter((arr) => arr[0]).length})`}
        className="w-full rounded border bg-card shadow"
        list={`${column.id}list`}
      />
    </>
  );
}
