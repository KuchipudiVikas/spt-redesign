import { NavigationMenuContent } from "@/components/ui/navigation-menu";
import {
  CreateOptions,
  BookListingTools,
  LearningTools,
  GeneralTools,
  ResearchOptions,
} from "./CreateData";

interface ToolOption {
  name: string;
  link: string;
  Icon: React.ElementType;
  tag?: string;
}

interface SectionProps {
  title: string;
  options: ToolOption[];
  gridCols?: number;
  withTags?: boolean;
}

const ToolSection: React.FC<SectionProps> = ({
  title,
  options,
  gridCols = 3,
  withTags = false,
}) => {
  return (
    <div>
      <h6 className="text-black mb-3 mt-4 font-bold">{title}</h6>
      <div className={`w-full grid grid-cols-${gridCols} gap-3`}>
        {options.map((option, index) => (
          <a
            style={{
              minHeight: "70px",
            }}
            key={index}
            href={option.link}
            target="__blank"
            className="flex items-center  sp-container h-full p-3 rounded-lg py-1.5 text-sm text-gray-700 hover:bg-[#c3abff] px-3 hover:text-gray-900"
            role="menuitem"
            onClick={(e) => e.stopPropagation()}
          >
            <option.Icon
              className="mr-3"
              style={{ width: "20px", height: "20px" }}
            />
            <div>
              <h6 className="font-medium text-black">{option.name}</h6>
              {withTags && option.tag && (
                <p className="line-clamp-2 text-[12px] leading-snug text-muted-foreground">
                  {option.tag}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const Create: React.FC = () => {
  return (
    <NavigationMenuContent
      style={{ width: "1200px" }}
      className="right-aligned"
    >
      <div className="text-black mr-2 inline-block text-left">
        <div className="p-5 w-full">
          <div style={{ background: "white" }}>
            <div
              className="py-1 p-3"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="grid grid-cols-1 w-full w-[500px]">
                <div className="grid grid-cols-2 gap-5">
                  <ToolSection title="Create" options={CreateOptions} />
                  <ToolSection
                    title="Book Listing"
                    options={BookListingTools}
                  />
                </div>
                <hr className="mt-7" />
                <div className="grid grid-cols-6 gap-5">
                  <ToolSection
                    title="Learn"
                    options={LearningTools}
                    gridCols={1}
                  />
                  <div className="col-span-5">
                    <ToolSection
                      title="General"
                      options={GeneralTools}
                      gridCols={4}
                    />
                  </div>
                </div>
                <hr className="mt-8" />
                <ToolSection
                  title="Research"
                  options={ResearchOptions}
                  gridCols={6}
                  withTags
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationMenuContent>
  );
};

export default Create;
