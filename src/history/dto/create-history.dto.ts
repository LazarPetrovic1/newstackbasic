import { User } from "src/entities/User";

export class CreateHistoryDTO {
  readonly log: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly type: "user" | "control" | "item" | "comment" | "message";
  readonly verb: "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD";
}