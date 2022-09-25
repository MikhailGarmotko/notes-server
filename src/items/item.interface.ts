export interface Note {
  name: string;
  category: string;
  content: string;
  createdAt: string;
  dates: string;
  status: string;
}

export interface Item extends Note {
  id: number;
}

export interface Archive {
  category: string;
  active: number;
  archived: number;
}
export interface Summary extends Array<Archive> {}