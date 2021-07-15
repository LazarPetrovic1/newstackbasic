import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";

@Entity({ tableName: "message" })
export class Message {
  @PrimaryKey() id!: number;
  @Property() text!: string;
  @Property() note: string;
  @Property({ type: 'date' }) createdAt = new Date();
  @Property({ type: 'date', onUpdate: () => new Date() }) updatedAt = new Date();
  @ManyToOne({ entity: () => User }) toUser: User;
  @ManyToOne({ entity: () => User }) fromUser: User;
  @Property() status: "received" | "unread" | "read" | "responded" | "closed";
};