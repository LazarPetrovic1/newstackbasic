import { Item } from "src/entities/Item";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  items: Item[]
}