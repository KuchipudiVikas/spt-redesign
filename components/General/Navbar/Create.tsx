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
      <div className={`w-full grid grid-cols-${gridCols} gap-2`}>
        {options.map((option, index) => (
          <a
            style={{
              minHeight: "55px",
            }}
            key={index}
            href={option.link}
            target="__blank"
            className="flex items-center border h-full p-3  rounded-lg py-0 text-sm text-gray-700 hover:bg-gray-100 px-3 "
            role="menuitem"
            onClick={(e) => e.stopPropagation()}
          >
            <option.Icon
              className="mr-3 text-primary"
              style={{ width: "20px", height: "20px" }}
            />
            <div>
              <h6 className="font-semibold text-black">{option.name}</h6>
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
        <div className="p-5 pt-0 w-full">
          <div style={{ background: "white" }}>
            <div
              className="py-1 p-3"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="grid grid-cols-1 w-full w-[500px]">
                <ToolSection
                  title="Research"
                  options={ResearchOptions}
                  gridCols={5}
                  withTags
                />
                <hr className="mt-6" />

                <ToolSection
                  title="Create"
                  options={CreateOptions}
                  gridCols={5}
                />
                <hr className="mt-6" />
                <ToolSection
                  title="Book Listing"
                  options={BookListingTools}
                  gridCols={5}
                />
                <hr className="mt-6" />

                <ToolSection
                  title="General"
                  options={GeneralTools}
                  gridCols={5}
                />
              </div>

              <hr className="mt-6" />
              <ToolSection
                title="Education"
                options={LearningTools}
                gridCols={5}
              />
            </div>
          </div>
        </div>
      </div>
    </NavigationMenuContent>
  );
};

export default Create;
