import { db } from "@/db";
import { customers } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";

// The fields below were commented out because they are not currently used in the Customers table for search queries. The table columnHeaderArray can be adjusted to add these if needed.
// The firstName and lastName from ilike are replaced with the sql call and are no longer needed. This allows the search params to search for both the firstName and lastName or parts of them rather than an either/or.

export async function getCustomerSearchResults(searchText: string) {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        // ilike(customers.firstName, `%${searchText}%`),
        // ilike(customers.lastName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        // ilike(customers.address1, `%${searchText}%`),
        // ilike(customers.address2, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.state, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        // ilike(customers.notes, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`,
      ),
    );
  return results;
}
