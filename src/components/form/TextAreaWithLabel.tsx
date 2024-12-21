"use client";

import { useFormContext } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import type { TextareaHTMLAttributes } from "react";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaWithLabel<S>({ fieldTitle, nameInSchema, className, ...props }: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mb-2 ml-4 text-base text-primary" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <FormControl>
            <Textarea id={nameInSchema} className={className} {...props} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
