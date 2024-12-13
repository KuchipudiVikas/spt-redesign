import { useState, Fragment } from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

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
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.mark_identification}
        </TableCell>
        <TableCell align="center">
          {data.gs_text && data.gs_text.length > 50
            ? data.gs_text.slice(0, 50) + "..."
            : ""}
        </TableCell>
        <TableCell align="center">{data.status_text}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <h6 variant="h6" gutterBottom>
                Details
              </h6>
              <div container spacing={2}>
                {/* Party Name */}
                <div item xs={12} sm={6}>
                  <h6 variant="subtitle2" color="textSecondary">
                    Party Name
                  </h6>
                  <h6 variant="body1">{data.party_name}</h6>
                </div>
                {/* Filing Date */}
                <div item xs={12} sm={6}>
                  <h6 variant="subtitle2" color="textSecondary">
                    Filing Date
                  </h6>
                  <h6 variant="body1">{data.filing_date}</h6>
                </div>
                {/* Status Code */}
                <div item xs={12} sm={6}>
                  <h6 variant="subtitle2" color="textSecondary">
                    Status Code
                  </h6>
                  <h6 variant="body1">{data.status_code}</h6>
                </div>
                {/* International Code */}
                <div item xs={12} sm={6}>
                  <h6 variant="subtitle2" color="textSecondary">
                    International Code
                  </h6>
                  <h6 variant="body1">{data.international_code}</h6>
                </div>
                {/* Description */}
                <div item xs={12} sm={12}>
                  <h6 variant="subtitle2" color="textSecondary">
                    Description
                  </h6>
                  <h6 variant="body1">{data.gs_text}</h6>
                </div>
                {/* Serial Number */}
                <div item xs={12} sm={6}>
                  <h6 variant="subtitle2" color="textSecondary">
                    Serial Number
                  </h6>
                  <h6 variant="body1">{data.serial_number}</h6>
                </div>
                {/* Transaction Date */}
                <div item xs={12} sm={6}>
                  <h6 variant="subtitle2" color="textSecondary">
                    Transaction Date
                  </h6>
                  <h6 variant="body1">{data.transaction_date}</h6>
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const UsptoTable: React.FC<{ data: TTrademarkData[] }> = ({ data }) => {
  return (
    <div component={Paper}>
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
