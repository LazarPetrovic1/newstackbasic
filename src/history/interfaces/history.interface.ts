export interface History {
  id?: number;
  log: string;
  createdAt: Date;
  updatedAt: Date;
  type: "user" | "control" | "item" | "comment" | "message";
  verb: "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD";
}