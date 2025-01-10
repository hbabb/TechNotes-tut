import { SearchButton } from "@/components/layout/SearchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";

/**
 * A simple search form for searching for tickets.
 *
 * This component renders a `form` element with an `input` and a `SearchButton`.
 * The `input` has a `name` attribute of "searchText", and the `type` attribute is set to "text".
 * The `placeholder` attribute is set to "Search Tickets...".
 * The `className` attribute is set to "w-full", which makes the input take up the full width of its parent.
 * The `autoFocus` attribute is set to `true`, which makes the input receive focus automatically when the component is rendered.
 *
 * The `SearchButton` component is a custom component that renders a "Search" button.
 * When the button is clicked, the form is submitted to the `/tickets` route.
 */
export function TicketSearch() {
  return (
    <Form action="/tickets" className="flex items-center gap-2">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Tickets..."
        className="w-full"
        autoFocus
      />
      <SearchButton />
    </Form>
  );
}
