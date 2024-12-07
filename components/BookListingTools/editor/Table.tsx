import {
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import parse from "html-react-parser";

const removeHtmlAttributes = (html) => {
  return html.replace(/<(\w+)[^>]*>/g, "<$1>");
};

const TableComp = ({ data, handleCopy, copiedIndex }) => {
  return (
    <div className="">
      {data.length > 0 && (
        <h6 className="font-bold text-center mt-10">
          Top 5 Competitors Descriptions
        </h6>
      )}
      <div>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Description</TableCell>
              {/* <TableCell align="right">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              const description = parse(
                removeHtmlAttributes(item.description_html)
              );
              return (
                <TableRow key={index}>
                  <TableCell align="left">
                    {/*<div*/}
                    {/*    dangerouslySetInnerHTML={{ __html: item.description_html }}*/}
                    {/*    className="text-sm"*/}
                    {/*/>*/}
                    <div className="text-sm px-4 py-2">{description}</div>
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
