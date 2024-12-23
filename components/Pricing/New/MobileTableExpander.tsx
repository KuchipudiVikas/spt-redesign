import { Fragment, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { ChevronDown } from "lucide-react";

function MobileTableExpander({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Fragment>
      <tr
        className={`lg:hidden ${isExpanded ? "bg-[#f9f7ff]" : "bg-white"}   `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <th
          scope="row"
          colSpan={3}
          className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="flex flex-row justify-between">
            <h6>{title} </h6>
            <div className="text-gray-900 dark:text-gray-400">
              <ChevronDown className="w-4" size={24} />
            </div>
          </div>
        </th>
      </tr>
      {isExpanded && <Fragment>{children}</Fragment>}
    </Fragment>
  );
}

export default MobileTableExpander;
