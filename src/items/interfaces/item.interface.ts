import { Control } from "src/entities/Control";
import { User } from "src/entities/User";

export interface Item {
  id: number;
  content: string;
  title: string;
  meta: string[];
  createdAt: Date;
  updatedAt: Date;
  author: User;
  votes: Control[];
}