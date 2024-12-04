"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { tickets } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertTicketSchema, type insertTicketSchemaType } from "@/lib/schema/ticket";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const saveTicketAction = actionClient
  .metadata({ actionName: "saveTicketAction" })
  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: ticket }: { parsedInput: insertTicketSchemaType }) => {
    const { isAuthenticated } = getKindeServerSession();

    const isAuth = await isAuthenticated();

    if (!isAuth) redirect("/login");

    // throw Error("Test Error") This is just for testing (comment out when not needed!!!!!)

    // New ticket
    // All new tickets are open by default - no need to set completed to true
    // createdAt and updatedAt are set by the database
    if (ticket.id === "(New)") {
      const result = await db
        .insert(tickets)
        .values({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          tech: ticket.tech,
        })
        .returning({ insertedId: tickets.id });

      return { message: `Ticket ID #${result[0].insertedId} created successfully` };
    }

    // Updating ticket
    // updatedAt is set by the database
    const result = await db
      .update(tickets)
      .set({
        customerId: ticket.customerId,
        title: ticket.title,
        description: ticket.description,
        completed: ticket.completed,
        tech: ticket.tech,
      })
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      .where(eq(tickets.id, ticket.id!))
      .returning({ updatedId: tickets.id });

    return { message: `Ticket ID #${result[0].updatedId} updated successfully` };
  });
