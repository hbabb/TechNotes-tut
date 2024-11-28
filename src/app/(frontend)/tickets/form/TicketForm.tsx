'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { CheckboxWithLabel } from '@/components/form/CheckboxWithLabel'
import { InputWithLabel } from '@/components/form/InputWithLabel'
import { TextAreaWithLabel } from '@/components/form/TextAreaWithLabel'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { selectCustomerSchemaType } from '@/lib/schema/customers'
import {
  insertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from '@/lib/schema/ticket'

type Props = {
  customer: selectCustomerSchemaType
  ticket?: selectTicketSchemaType
}

export default function TicketForm({ customer, ticket }: Props) {
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? '(New)',
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? '',
    description: ticket?.description ?? '',
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? 'new-ticket@example.com',
  }

  const form = useForm<insertTicketSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  })

  async function submitForm(data: insertTicketSchemaType) {
    console.log(data)
  }

  return (
    <Card className="before:-inset-px after:-inset-px after:-z-10 relative mt-6 rounded-lg border bg-background/95 p-6 shadow-lg backdrop-blur before:absolute before:rounded-lg before:bg-gradient-to-b before:from-primary/20 before:to-primary/0 before:shadow-lg after:absolute after:rounded-lg after:bg-gradient-to-b after:from-primary/20 after:to-primary/0 after:blur-md supports-[backdrop-filter]:bg-background/60 dark:border-primary/20 dark:bg-background/80 dark:shadow-primary/10 dark:after:from-primary/30 dark:before:from-primary/30">
      <CardHeader className="px-0">
        <CardTitle className="font-bold text-2xl text-matrix-dark dark:text-matrix-glow">
          {ticket?.id ? `Edit Ticket # ${ticket.id}` : 'New Ticket Form'}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="flex flex-col gap-4 md:flex-row md:gap-8"
          >
            <div className="flex w-full max-w-xs flex-col gap-4">
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Title"
                nameInSchema="title"
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
              />

              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Technician"
                nameInSchema="tech"
                className="border-matrix/30 bg-matrix-dark transition-all duration-200 focus-within:border-matrix focus-within:ring-1 focus-within:ring-matrix"
                disabled={true}
              />

              <CheckboxWithLabel<insertTicketSchemaType>
                fieldTitle="completed"
                nameInSchema="completed"
                message="Yes"
              />

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
