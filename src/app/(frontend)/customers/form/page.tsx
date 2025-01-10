import CustomerForm from "@/app/(frontend)/customers/form/CustomerForm";
import { BackButton } from "@/components/layout/BackButton";
import { getCustomer } from "@/lib/queries/getCustomers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as Sentry from "@sentry/nextjs";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;

  if (!customerId) return { title: "New Customer" };

  return { title: `Edit Customer #${customerId}` };
}

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { getPermission } = getKindeServerSession();
    const managerPermission = await getPermission("manager");
    const isManager = managerPermission?.isGranted;
    const { customerId } = await searchParams;

    // Edit customer form
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
      // put customer form component
      return <CustomerForm key={customerId} customer={customer} isManager={isManager} />;

      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      // New customer form
      return <CustomerForm key="new" isManager={isManager} />;
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
