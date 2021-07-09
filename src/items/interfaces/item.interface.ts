import { User } from "src/entities/User";

export interface Item {
  id: number;
  content: Text;
  title: string;
  meta: string[];
  createdAt: Date;
  updatedAt: Date;
  author: User;
}