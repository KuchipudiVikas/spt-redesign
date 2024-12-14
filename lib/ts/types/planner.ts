export type Board = {
  _id: string;
  name: string;
  dateCreated: number;
  createdBy: string;
  backgroundImage: string;
  users: string[];
};

export type Column = {
  _id: string;
  boardId: string;
  boardName: string | null;
  columnName: string;
  dateCreated: string;
  userId: string;
  sequence: number;
};

export type TFile = {
  fileData: string;
  fileName: string;
  fileType: string;
  __v?: number;
  _id: string;
};

export type TCard = {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
  type: string;
  dateCreated: string;
  userId: string | null;
  sequence: number;
  description: string;
  files: TFile[];
};
