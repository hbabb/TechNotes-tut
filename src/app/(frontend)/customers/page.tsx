import { CustomerSearch } from "@/app/(frontend)/customers/CustomerSearch";
import { CustomerTable } from "@/app/(frontend)/customers/CustomerTable";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
import * as Sentry from "@sentry/nextjs";

export const metadata = {
  title: "Customer Search",
};

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) {
    // Start Sentry monitor
    const span = Sentry.startInactiveSpan({
      name: "getAllCustomers",
    });
    const results = await getCustomerSearchResults(""); // Fetch all customers
    span.end();

    return (
      <>
        <CustomerSearch />
        {results.length ? (
          <CustomerTable data={results} />
        ) : (
          <p className="mt-4">No customers found</p>
        )}
      </>
    );
  }

  // Start Sentry span for filtered search
  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResults",
  });
  const results = await getCustomerSearchResults(searchText);
  span.end();

  return (
    <>
      <CustomerSearch />
      {results.length ? <CustomerTable data={results} /> : <p className="mt-4">No results found</p>}
    </>
  );
}
