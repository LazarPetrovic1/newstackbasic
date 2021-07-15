import { User } from "src/entities/User";

export class CreateMessageDTO {
  readonly text: string;
  readonly note: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly toUser: User;
  readonly fromUser: User;
  readonly status: "received" | "unread" | "read" | "responded" | "closed";
}