"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CheckboxWithLabel } from "@/components/form/CheckboxWithLabel";
import { InputWithLabel } from "@/components/form/InputWithLabel";
import { SelectWithLabel } from "@/components/form/SelectWithLabel";
import { TextAreaWithLabel } from "@/components/form/TextAreaWithLabel";

import { StatesArray } from "@/constants/StatesArray";

import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/lib/schema/customers";

import { saveCustomerAction } from "@/app/actions/saveCustomerAction";
import { DisplayServerActionResponse } from "@/components/actions/DisplayServerActionResponse";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Props = {
  customer?: selectCustomerSchemaType;
  isManager?: boolean | undefined;
};

export default function CustomerForm({ customer, isManager = false }: Props) {
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const hasCustomerId = searchParams.has("customerId");

  const emptyValues: insertCustomerSchemaType = {
    id: 0,
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
    active: true,
  };

  const defaultValues: insertCustomerSchemaType = hasCustomerId
    ? {
        id: customer?.id ?? 0,
        firstName: customer?.firstName ?? "",
        lastName: customer?.lastName ?? "",
        address1: customer?.address1 ?? "",
        address2: customer?.address2 ?? "",
        city: customer?.city ?? "",
        state: customer?.state ?? "",
        zip: customer?.zip ?? "",
        phone: customer?.phone ?? "",
        email: customer?.email ?? "",
        notes: customer?.notes ?? "",
        active: customer?.active ?? true,
      }
    : emptyValues;

  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    form.reset(hasCustomerId ? defaultValues : emptyValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("customerId")]);

  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast({
          variant: "default",
          title: "Success! 🎉",
          description: data.message,
        });
      }
    },

    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    onError() {
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: "Save Failed",
      });
    },
  });

  async function submitForm(data: insertCustomerSchemaType) {
    // console.log(data);
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer {customer?.id ? `#${customer.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col gap-4 md:flex-row md:gap-8"
        >
          <div className="flex w-full max-w-xs flex-col gap-4">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />

            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />

            <InputWithLabel<insertCustomerSchemaType> fieldTitle="City" nameInSchema="city" />

            <SelectWithLabel<insertCustomerSchemaType>
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
          </div>

          <div className="flex w-full max-w-xs flex-col gap-4">
            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Zip Code" nameInSchema="zip" />

            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Email" nameInSchema="email" />

            <InputWithLabel<insertCustomerSchemaType> fieldTitle="Phone" nameInSchema="phone" />

            <TextAreaWithLabel<insertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />

            {isManager && customer?.id ? (
              <CheckboxWithLabel<insertCustomerSchemaType>
                fieldTitle="Active"
                nameInSchema="active"
                message="Yes"
              />
            ) : null}

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4 text-white"
                variant="default"
                title="Save"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="animate-spin text-white" /> Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>

              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
