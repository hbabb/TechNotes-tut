'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { InputWithLabel } from '@/components/form/InputWithLabel'
import { SelectWithLabel } from '@/components/form/SelectWithLabel'
import { TextAreaWithLabel } from '@/components/form/TextAreaWithLabel'

import { StatesArray } from '@/constants/StatesArray'

import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from '@/lib/schema/customers'

type Props = {
  customer?: selectCustomerSchemaType
}

export default function CustomerForm({ customer }: Props) {
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    address1: customer?.address1 ?? '',
    address2: customer?.address2 ?? '',
    city: customer?.city ?? '',
    state: customer?.state ?? '',
    zip: customer?.zip ?? '',
    phone: customer?.phone ?? '',
    email: customer?.email ?? '',
    notes: customer?.notes ?? '',
  }

  const form = useForm<insertCustomerSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  })

  async function submitForm(data: insertCustomerSchemaType) {
    console.log(data)
  }

  return (
    <Card className="before:-inset-px after:-inset-px after:-z-10 relative mt-6 rounded-lg border bg-background/95 p-6 shadow-lg backdrop-blur before:absolute before:rounded-lg before:bg-gradient-to-b before:from-primary/20 before:to-primary/0 before:shadow-lg after:absolute after:rounded-lg after:bg-gradient-to-b after:from-primary/20 after:to-primary/0 after:blur-md supports-[backdrop-filter]:bg-background/60 dark:border-primary/20 dark:bg-background/80 dark:shadow-primary/10 dark:after:from-primary/30 dark:before:from-primary/30">
      <CardHeader className="px-0">
        <CardTitle className="font-bold text-2xl text-matrix-dark dark:text-matrix-glow">
          {customer?.id ? 'Edit' : 'New'} Customer Form
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="flex flex-col gap-4 text-matrix-dark md:flex-row md:gap-8 dark:text-matrix"
          >
            <div className="flex w-full max-w-xs flex-col gap-4">
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="First Name"
                nameInSchema="firstName"
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />

              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Last Name"
                nameInSchema="lastName"
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />

              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Address 1"
                nameInSchema="address1"
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />

              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Address 2"
                nameInSchema="address2"
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />

              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="City"
                nameInSchema="city"
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />

              <SelectWithLabel<insertCustomerSchemaType>
                fieldTitle="State"
                nameInSchema="state"
                data={StatesArray}
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />
            </div>

            <div className="flex w-full max-w-xs flex-col gap-4">
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Zip Code"
                nameInSchema="zip"
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />

              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Email"
                nameInSchema="email"
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />

              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Phone"
                nameInSchema="phone"
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />

              <TextAreaWithLabel<insertCustomerSchemaType>
                fieldTitle="Notes"
                nameInSchema="notes"
                className="h-40 border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-3/4 bg-matrix font-bold text-black transition-colors duration-200 hover:bg-matrix/80"
                  variant="default"
                  title="Save"
                >
                  Save
                </Button>

                <Button
                  type="button"
                  className="bg-red-900/80 text-white transition-colors duration-200 hover:bg-red-900"
                  variant="destructive"
                  title="Reset"
                  onClick={() => form.reset(defaultValues)}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
