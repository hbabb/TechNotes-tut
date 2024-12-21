"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CheckboxWithLabel } from "@/components/form/CheckboxWithLabel";
import { InputWithLabel } from "@/components/form/InputWithLabel";
import { SelectWithLabel } from "@/components/form/SelectWithLabel";
import { TextAreaWithLabel } from "@/components/form/TextAreaWithLabel";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { StatesArray } from "@/constants/StatesArray";

import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/lib/schema/customers";

import { saveCustomerAction } from "@/app/actions/saveCustomerAction";
import { DisplayServerActionResponse } from "@/components/actions/DisplayServerActionResponse";
import { MagicButton } from "@/components/layout/MagicButton";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";

type Props = {
  customer?: selectCustomerSchemaType;
};

export default function CustomerForm({ customer }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { getPermission, isLoading } = useKindeBrowserClient();
  const isManager = !isLoading && getPermission("manager")?.isGranted;

  const { toast } = useToast();

  const defaultValues: insertCustomerSchemaType = {
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
  };

  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

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
    onError({ error }) {
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
        <h2 className="font-bold text-2xl">
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

            <div>
              {isMounted && isLoading ? (
                <div className="flex flex-row items-center justify-center">
                  <LoaderCircle className="animate-spin text-slate-50" />
                  Loading...
                </div>
              ) : (
                <div>
                  {isManager && customer?.id ? (
                    <CheckboxWithLabel<insertCustomerSchemaType>
                      fieldTitle="Active"
                      nameInSchema="active"
                      message="Yes"
                    />
                  ) : (
                    <div className="h-[40px]" /> // Placeholder for consistent rendering
                  )}
                </div>
              )}
            </div>

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
          </div>
        </form>
      </Form>
    </div>
  );
}
