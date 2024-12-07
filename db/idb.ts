// db.ts
import Dexie, { Table } from "dexie";
const version = 1
export interface BookCreatorBoards {
  id?: number;
  data: any;
  type: number;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  bookCreatorBoards!: Table<BookCreatorBoards>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      bookCreatorBoards: "++id, data, type", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
export interface titansDeepViewLocalData{
  id?:Number,
  searchQuery: string,
  domain: string,
  results: [],
  createdAt: Date
}
export class TitansDeepViewLocalDataClassDB extends Dexie {
  tdvData!: Table<titansDeepViewLocalData>

  constructor(){
    super("titansDeepViewTable")
    this.version(version).stores({
      tdvData: "++id, searchQuery, domain, results, createdAt"
    })
  }
}

export const titansDeepViewLocalDataClassDB = new TitansDeepViewLocalDataClassDB()