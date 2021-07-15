import { User } from "src/entities/User";

export interface Message {
  id?: number;
  text: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  toUser: User;
  fromUser: User;
  status: "received" | "unread" | "read" | "responded" | "closed";
}