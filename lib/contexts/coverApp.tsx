import React, { createContext, useContext, useState, ReactNode } from "react";
export type TImage = {
  link: string;
  access: string;
  download: string;
  preview?: string;
  id: number;
};

export type TypesImages = {
  category: string;
  images: TImage[];
  hasMore: boolean;
};

interface CoverAppProps {
  coverImageCategories: any[];
  setCoverImageCategories: React.Dispatch<React.SetStateAction<any[]>>;
  elementsCategories: any[];
  setElementsCategories: React.Dispatch<React.SetStateAction<TypesImages[]>>;
  coverFeed: any[];
  setCoverFeed: React.Dispatch<React.SetStateAction<any[]>>;
}

const CoverApp = createContext<CoverAppProps | undefined>(undefined);

export const CoverAppProvider = ({ children }: { children: ReactNode }) => {
  const [coverImageCategories, setCoverImageCategories] = useState<any[]>([]);
  const [elementsCategories, setElementsCategories] = useState<any[]>([]);
  const [coverFeed, setCoverFeed] = useState<any[]>([]);

  return (
    <CoverApp.Provider
      value={{
        coverImageCategories,
        setCoverImageCategories,
        elementsCategories,
        setElementsCategories,
        coverFeed,
        setCoverFeed
      }}>
      {children}
    </CoverApp.Provider>
  );
};

export const useCoverApp = () => {
  const context = useContext(CoverApp);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
