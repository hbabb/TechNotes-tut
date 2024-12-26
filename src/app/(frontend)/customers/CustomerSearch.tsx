import { SearchButton } from "@/components/layout/SearchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export function CustomerSearch() {
  return (
    <Form action="/customers" className="flex items-center gap-2">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Customers..."
        className="w-full"
        autoFocus
      />
      <SearchButton />
    </Form>
  );
}
