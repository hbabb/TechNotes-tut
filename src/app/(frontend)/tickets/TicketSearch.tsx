import { SearchButton } from "@/components/layout/SearchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export function TicketSearch() {
  return (
    <Form action="/tickets" className="flex items-center gap-2">
      <Input name="searchText" type="text" placeholder="Search Tickets..." className="w-full" />
      <SearchButton />
    </Form>
  );
}
