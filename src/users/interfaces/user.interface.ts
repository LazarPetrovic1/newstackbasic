import { Control } from "src/entities/Control";
import { Item } from "src/entities/Item";
import { Message } from "src/entities/Message";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  items: number[];
  votes: Control[];
  messages: Message[];
}