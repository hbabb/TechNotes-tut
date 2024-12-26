import { TicketSearch } from "@/app/(frontend)/tickets/TicketSearch";
import { TicketTable } from "@/app/(frontend)/tickets/TicketTable";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";

export const metadata = {
  title: "Ticket Search",
};

/**
 * The ticket search page.
 *
 * This page displays a search bar and a table of tickets. If the user enters a
 * search query, the table will display the search results. If no search query is
 * entered, the table will display all open tickets.
 */
export default async function Tickets({
  searchParams,
}: {
  /**
   * The search parameters.
   *
   * This is a promise that resolves to an object with the search query and any
   * other search parameters.
   */
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  // If no search query is entered, display all open tickets
  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        {/* The search bar */}
        <TicketSearch />
        {/* The table of tickets */}
        {results.length ? (
          <TicketTable data={results} />
        ) : (
          <p className="mt-4">No open tickets found</p>
        )}
      </>
    );
  }

  // If a search query is entered, display the search results
  const results = await getTicketSearchResults(searchText);

  return (
    <>
      {/* The search bar */}
      <TicketSearch />
      {/* The table of tickets */}
      {results.length ? <TicketTable data={results} /> : <p className="mt-4">No results found</p>}
    </>
  );
}
