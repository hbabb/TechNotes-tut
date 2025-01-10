/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import TicketForm from "@/app/(frontend)/tickets/form/TicketForm";
import { BackButton } from "@/components/layout/BackButton";
import { getCustomer } from "@/lib/queries/getCustomers";
import { getTicket } from "@/lib/queries/getTickets";
import * as Sentry from "@sentry/nextjs";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Users, init as kindeInit } from "@kinde/management-api-js";

/**
 * Generates the metadata for the TicketFormPage.
 *
 * @param searchParams The search parameters.
 * @returns The metadata.
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId, ticketId } = await searchParams;

  // If neither the customer ID or ticket ID is provided, return an error
  // message.
  if (!customerId && !ticketId) {
    return {
      title: "Missing Ticket ID or Customer ID",
    };
  }

  // If the customer ID is provided, return a title with the customer ID.
  if (customerId) {
    return {
      title: `New Ticket for Customer #${customerId}`,
    };
  }

  // If the ticket ID is provided, return a title with the ticket ID.
  if (ticketId) {
    return {
      title: `Edit Ticket #${ticketId}`,
    };
  }
}

/**
 * The TicketFormPage component.
 *
 * This component renders a form for creating or editing tickets. It handles
 * the logic to determine if the form should be for a new ticket or editing
 * an existing ticket.
 *
 * @param searchParams The search parameters containing customerId or ticketId.
 * @returns The JSX representation of the ticket form or an error message.
 */
export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    // If neither customerId nor ticketId is provided, display an error message.
    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="mb-2 text-2xl">Ticket ID or Customer ID required to load ticket form</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([getPermission("manager"), getUser()]);
    const isManager = managerPermission?.isGranted;

    // Handle new ticket form if customerId is provided.
    if (customerId) {
      const customer = await getCustomer(Number.parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="mb-2 text-2xl">Customer ID #{customerId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="mb-2 text-2xl">Customer ID #{customerId} is not active.</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      // Initialize and fetch techs if the user is a manager.
      if (isManager) {
        kindeInit(); // Initializes the Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users
              .filter((user): user is { email: string } => user.email === "string")
              .map((user) => ({ id: user.email, description: user.email }))
          : [];

        return <TicketForm customer={customer} techs={techs} isManager={isManager} />;
      } else {
        return <TicketForm customer={customer} />;
      }
    }

    // Handle edit ticket form if ticketId is provided.
    if (ticketId) {
      const ticket = await getTicket(Number.parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="mb-2 text-2xl">Ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      if (isManager) {
        kindeInit(); // Initializes the Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({
              id: user.email?.toLowerCase()!,

              description: user.email?.toLowerCase()!,
            }))
          : [];

        return (
          <TicketForm customer={customer} ticket={ticket} techs={techs} isManager={isManager} />
        );
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        const isEditable = user.email?.toLowerCase() === ticket.tech.toLowerCase();
        return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} />;
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
