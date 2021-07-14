import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";
import { Item } from "./Item";

@Entity({ tableName: "comment" })
export class Comment {
  @PrimaryKey() id!: number;
  @Property() text!: string;
  @Property({ type: 'date' }) createdAt = new Date();
  @Property({ type: 'date', onUpdate: () => new Date() }) updatedAt = new Date();
  @ManyToOne({ entity: () => User, onDelete: "CASCADE" }) user: User;
  @ManyToOne({ entity: () => Item, onDelete: "CASCADE" }) item: Item;
};