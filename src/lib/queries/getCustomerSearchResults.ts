import { db } from "@/db";
import { customers } from "@/db/schema";
import { asc, ilike, or, sql } from "drizzle-orm";

export async function getCustomerSearchResults(searchText: string) {
  const results = await db
    .select({
      id: customers.id,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      phone: customers.phone,
      city: customers.city,
      state: customers.state,
      zip: customers.zip,
      active: customers.active,
    })
    .from(customers)
    .where(
      or(
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.state, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`,
      ),
    )
    .orderBy(asc(customers.firstName));

  return results;
}

export type CustomerSearchResultsType = Awaited<ReturnType<typeof getCustomerSearchResults>>;
