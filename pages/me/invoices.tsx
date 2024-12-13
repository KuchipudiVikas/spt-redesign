import { getSession } from "next-auth/react";
import { getInvoices } from "@/lib/mw/Accounts/Account";
import MainLayout from "@/components/Layout";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import PageTitle from "@/components/Common/PageTitle";

function Invoices({ invoices }) {
  return (
    <MainLayout
      Title={<PageTitle title="Invoices" />}
      meta={{
        title: "Invoices - Self Publishing Titans",
        description: "Invoices for Self Publishing Titans",
        keywords: "invoices self publishing titans",
      }}
      info={null}
      Body={
        <>
          <div className="min-h-[61vh]">
            {/* table with product name, price, date, status, download link */}
            <div className="container  mx-auto flex items-center justify-center">
              <div className="flex-1 text-center py-4 w-full">
                <div>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="px-4 py-2">Product</TableCell>
                        <TableCell className="px-4 py-2">Price</TableCell>
                        <TableCell className="px-4 py-2">Date</TableCell>
                        <TableCell className="px-4 py-2">Status</TableCell>
                        <TableCell className="px-4 py-2">Download</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="border px-4 py-2">
                            {invoice?.lines?.data[0]?.description ||
                              invoice.description}
                          </TableCell>
                          <TableCell className="border px-4 py-2">
                            {(invoice?.amount_paid || invoice?.amount) / 100}
                          </TableCell>
                          <TableCell className="border px-4 py-2">
                            {new Date(
                              invoice.created * 1000
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="border px-4 py-2">
                            {invoice.status}
                          </TableCell>
                          <TableCell className="border px-4 py-2">
                            <Link
                              href={
                                invoice?.hosted_invoice_url ||
                                invoice?.invoice_pdf ||
                                invoice?.receipt_url
                              }
                              className=""
                            >
                              Download
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}

                      {invoices.length == 0 && (
                        <TableRow>
                          <TableCell
                            className="border px-4 py-2 text-center"
                            colSpan={5}
                          >
                            No Invoices
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { resolvedUrl } = context;
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?next=${encodeURIComponent(resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  const invoices = await getInvoices(session.token);

  return {
    props: {
      invoices: invoices?.simple?.invoices || [],
    },
  };
}

export default Invoices;
