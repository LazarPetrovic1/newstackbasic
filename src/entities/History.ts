import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "history" })
export class History {
  @PrimaryKey() id!: number;
  @Property() log: string;
  @Property() type: "user" | "control" | "item" | "comment" | "message";
  @Property({ type: 'date' }) createdAt = new Date();
  @Property({ type: 'date', onUpdate: () => new Date() }) updatedAt = new Date();
  @Property() verb: "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD";
}