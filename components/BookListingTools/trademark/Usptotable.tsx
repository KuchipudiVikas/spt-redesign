import { useState, Fragment } from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface TTrademarkData {
  case_file_id: number;
  serial_number: string;
  registration_number: string;
  transaction_date: string;
  mark_identification: string;
  filing_date: string;
  status_code: string;
  international_code: string;
  us_code1: string;
  us_code2: string;
  party_name: string;
  legal_entity_type_code: string;
  gs_text: string;
  description_text: string;
  event_date: string;
  status_text: string;
}

function Row({ data }: { data: TTrademarkData }) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
              <Button
                aria-label="expand row"
                size="sm"
                variant="ghost"
                onClick={() => setOpen(!open)}
              >
                {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </TableCell>
        <TableCell scope="row">{data.mark_identification}</TableCell>
        <TableCell align="center">
          {data.gs_text && data.gs_text.length > 50
            ? data.gs_text.slice(0, 50) + "..."
            : ""}
        </TableCell>
        <TableCell align="center">{data.status_text}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} style={{ padding: 0 }}>
          <Collapsible open={open}>
            <CollapsibleContent>
              <div className="p-4 bg-gray-50">
                <h6 className="font-medium text-gray-700">Details</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <h6 className="text-sm font-semibold text-gray-500">
                      Party Name
                    </h6>
                    <p className="text-sm text-gray-700">{data.party_name}</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-500">
                      Filing Date
                    </h6>
                    <p className="text-sm text-gray-700">{data.filing_date}</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-500">
                      Status Code
                    </h6>
                    <p className="text-sm text-gray-700">{data.status_code}</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-500">
                      International Code
                    </h6>
                    <p className="text-sm text-gray-700">
                      {data.international_code}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h6 className="text-sm font-semibold text-gray-500">
                      Description
                    </h6>
                    <p className="text-sm text-gray-700">{data.gs_text}</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-500">
                      Serial Number
                    </h6>
                    <p className="text-sm text-gray-700">
                      {data.serial_number}
                    </p>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-500">
                      Transaction Date
                    </h6>
                    <p className="text-sm text-gray-700">
                      {data.transaction_date}
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const UsptoTable: React.FC<{ data: TTrademarkData[] }> = ({ data }) => {
  return (
    <div>
      <Table aria-label="collapsible table">
        <TableHeader>
          <TableRow>
            <TableCell />
            <TableCell>Trademark</TableCell>
            <TableCell align="center">Goods and Services</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <Row key={row.case_file_id} data={row} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsptoTable;
