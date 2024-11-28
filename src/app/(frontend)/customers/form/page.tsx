import { BackButton } from '@/components/layout/BackButton'
import { getCustomer } from '@/lib/queries/getCustomers'
import * as Sentry from '@sentry/nextjs'

export const metadata = {
  title: 'Customers Form',
}

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { customerId } = await searchParams

    // Edit customer form
    if (customerId) {
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      const customer = await getCustomer(parseInt(customerId))

      if (!customer) {
        return (
          <>
            <h2 className="mb-2 text-2xl">Customer ID #{customerId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e)
      throw e
    }
  }
}
