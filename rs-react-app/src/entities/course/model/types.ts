export interface Author {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  duration: number;
  creationDate: string;
  description: string;
  authors: Author[];
}
