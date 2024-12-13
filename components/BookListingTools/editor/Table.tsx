import {
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import parse from "html-react-parser";

const removeHtmlAttributes = (html) => {
  return html.replace(/<(\w+)[^>]*>/g, "<$1>");
};

const TableComp = ({ data, handleCopy, copiedIndex }) => {
  return (
    <div className="sp-container border p-6 mt-10 rounded-3xl light-border">
      {data.length > 0 && (
        <h6 className="font-bold text-[25px] mb-5 text-center ">
          Top 5 Competitors Descriptions
        </h6>
      )}
      <div>
        <Table aria-label="simple table">
          {/* <TableHeader>
            <TableRow>
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHeader> */}
          <TableBody>
            {data.map((item, index) => {
              const description = parse(
                removeHtmlAttributes(item.description_html)
              );
              return (
                <TableRow key={index}>
                  <TableCell
                    style={{
                      borderBottom: "2px solid #E5E7EB",
                    }}
                    align="left"
                  >
                    {/*<div*/}
                    {/*    dangerouslySetInnerHTML={{ __html: item.description_html }}*/}
                    {/*    className="text-sm"*/}
                    {/*/>*/}
                    <div className="text-sm px-4  leading-9 py-2">
                      {description}
                    </div>
                  </TableCell>
                  {/* <TableCell align="right">
                    <TableCell align="right">
                      <Button
                        onClick={() => handleCopy(item.description_html, index)}
                        variant="contained"
                        className="ml-2 w-fit"
                        color={copiedIndex === index ? "success" : "primary"}
                        size="small"
                      >
                        {copiedIndex === index ? "Copied" : "Copy"}
                      </Button>
                    </TableCell>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableComp;
