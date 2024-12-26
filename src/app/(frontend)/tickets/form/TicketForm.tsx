"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CheckboxWithLabel } from "@/components/form/CheckboxWithLabel";
import { InputWithLabel } from "@/components/form/InputWithLabel";
import { SelectWithLabel } from "@/components/form/SelectWithLabel";
import { TextAreaWithLabel } from "@/components/form/TextAreaWithLabel";

import type { selectCustomerSchemaType } from "@/lib/schema/customers";
import {
  insertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from "@/lib/schema/ticket";

import { saveTicketAction } from "@/app/actions/saveTicketAction";
import { DisplayServerActionResponse } from "@/components/actions/DisplayServerActionResponse";
import { MagicButton } from "@/components/layout/MagicButton";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

type Props = {
  customer: selectCustomerSchemaType;
  ticket?: selectTicketSchemaType;
  techs?: {
    id: string;
    description: string;
  }[];
  isEditable?: boolean;
  isManager?: boolean | undefined;
};

/**
 * The TicketForm component.
 *
 * This component renders a form for creating or editing tickets. It handles the
 * logic to determine if the form should be for a new ticket or editing an
 * existing ticket.
 *
 * @param customer The customer to associate with the ticket
 * @param ticket The ticket to edit, if any
 * @param techs A list of tech IDs and descriptions, if the user is a manager
 * @param isEditable Whether the ticket is editable
 * @param isManager Whether the user is a manager
 * @returns The JSX representation of the ticket form
 */
export default function TicketForm({
  customer,
  ticket,
  techs,
  isEditable = true,
  isManager = false,
}: Props) {
  const { toast } = useToast();

  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(New)",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech.toLowerCase() ?? "new-ticket@example.com",
  };

  const form = useForm<insertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveTicketAction, {
    /**
     * If the save is successful, display a toast message with the result.
     *
     * @param {Object} result - The result of the save action
     */
    onSuccess({ data }: { data?: { message: string } }) {
      // If the save is successful, display a toast message with the result
      if (data?.message) {
        toast({
          variant: "default",
          title: "Success! 🎉",
          description: data.message,
        });
      }
    },
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    onError({ error }) {
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: "Save Failed",
      });
    },
  });

  /**
   * The function to call when the form is submitted.
   *
   * @param {Object} data - The form data
   */
  async function submitForm(data: insertTicketSchemaType) {
    // Call the save action with the form data
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="font-bold text-2xl">
          {ticket?.id && isEditable
            ? `Edit Ticket # ${ticket.id}`
            : ticket?.id
              ? `View Ticket # ${ticket.id}`
              : "New Ticket Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col gap-4 md:flex-row md:gap-8"
        >
          <div className="flex w-full max-w-xs flex-col gap-4">
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
              disabled={!isEditable}
            />

            {isManager && techs ? (
              <SelectWithLabel<insertTicketSchemaType>
                fieldTitle="Tech ID"
                nameInSchema="tech"
                data={[
                  { id: "new-ticket@example.com", description: "new-ticket@example.com" },
                  ...techs,
                ]}
              />
            ) : (
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                disabled={true}
              />
            )}

            {ticket?.id ? (
              <CheckboxWithLabel<insertTicketSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
                disabled={!isEditable}
              />
            ) : null}

            <div className="mt-4 space-y-2">
              <h3 className="text-lg">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              <p>{customer.address1}</p>
              {customer.address2 ? <p>{customer.address2}</p> : null}
              <p>
                {customer.city}, {customer.state} {customer.zip}
              </p>
              <hr className="w-4/5" />
              <p>{customer.email}</p>
              <p>Phone: {customer.phone}</p>
            </div>
          </div>

          <div className="flex w-full max-w-xs flex-col gap-4">
            <TextAreaWithLabel<insertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
              disabled={!isEditable}
            />

            {isEditable ? (
              <div className="flex gap-2">
                <MagicButton
                  type="submit"
                  className="w-3/4 p-1 text-slate-50"
                  lightBackgroundGradient={{
                    from: "#1e3a8a",
                    to: "#4b0082",
                  }}
                  darkBackgroundGradient={{
                    from: "#3a86ff",
                    to: "#6a5acd",
                  }}
                  lightRingGradient="conic-gradient(from 90deg at 50% 50%, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)"
                  darkRingGradient="conic-gradient(from 90deg at 50% 50%, #8A2BE2 0%, #4B0082 50%, #8A2BE2 100%)"
                  variant="magic"
                  title="Save"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin text-slate-50" /> Saving
                    </>
                  ) : (
                    "Save"
                  )}
                </MagicButton>

                <MagicButton
                  type="button"
                  className="w-1/4 p-1 text-slate-50"
                  lightBackgroundGradient={{
                    from: "#8b0000",
                    to: "#b22222",
                  }}
                  darkBackgroundGradient={{
                    from: "#ff4500",
                    to: "#ff6347",
                  }}
                  lightRingGradient="conic-gradient(from 90deg at 50% 50%, #ffa500 0%, #ffd700 50%, #ffa500 100%)"
                  darkRingGradient="conic-gradient(from 90deg at 50% 50%, #FF6347 0%, #ffa500 50%, #ffd700 100%)"
                  variant="magic"
                  title="Reset"
                  onClick={() => {
                    form.reset(defaultValues);
                    resetSaveAction();
                  }}
                >
                  Reset
                </MagicButton>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
}
