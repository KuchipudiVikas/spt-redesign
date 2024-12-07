import ItemExpander from "@/components/Common/ItemExpander";

export interface IFaq {
  question: string;
  answer: string;
}

interface FaqItemProps {
  faq: IFaq[];
}

export const FaqSection = ({ faq }: FaqItemProps) => {
  return (
    <section className="mx-auto">
      <h6 className="text-[32px]" textAlign={"center"}>
        Frequently Asked Questions
      </h6>
      <div
        className="flex mx-auto flex-col md:flex-row max-w-[1200px] justify-center items-center
       mb-4  "
      >
        <div className="flex flex-col  p-5 pb-10">
          {faq.map((obj, index) => {
            return (
              <div key={index}>
                <ItemExpander
                  title={
                    <div className="mt-6 flex gap-3 cursor-pointer mr-4">
                      <h6 variant="subtitle1" className={`text-secCol1-700 `}>
                        0{index + 1}
                      </h6>

                      <h6 variant="body1" fontWeight={500}>
                        {obj.question}
                      </h6>
                    </div>
                  }
                >
                  <div>
                    <div className="font-Inter text-left">
                      <div dangerouslySetInnerHTML={{ __html: obj.answer }} />
                    </div>
                  </div>
                </ItemExpander>

                <hr className="bg-[#cccccc] my-1" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
