export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
  };
}

export interface CreateNoteType {
  title: string;
  content?: string;
  categoryId: string;
}

export type Category = {
  id: string;
  name: string;
};
