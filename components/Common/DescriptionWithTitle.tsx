import { Check, CheckIcon } from "lucide-react";

function DescriptionWithTitle({ titleImage, title, svg, items }) {
  console.log(items);

  return (
    <div className="flex sp-container lavbg light-border border-2  flex-col items-center justify-start p-6 rounded-3xl">
      <div className="bg-white p-10 rounded-3xl w-full">
        <img
          src={titleImage.src}
          alt=""
          className="w-full h-[400px] object-fit"
        />
      </div>
      <div className="pt-5 w-full">
        <h5 className="text-[30px]">{title}</h5>
        <div className="grid grid-cols-2 gap-x-4">
          {items.map((item, i) => {
            return (
              <div key={i} className="flex items-center gap-2 mt-4 ">
                <Check className="text-primary" />
                <h6 className="">{item}</h6>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DescriptionWithTitle;
