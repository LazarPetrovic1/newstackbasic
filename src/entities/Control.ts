import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";
import { Item } from "./Item";

@Entity({ tableName: "control" })
export class Control {
  @PrimaryKey() id!: number;
  @Property() value!: number;
  @Property({ type: 'date' }) createdAt = new Date();
  @Property({ type: 'date', onUpdate: () => new Date() }) updatedAt = new Date();
  @ManyToOne({ entity: () => User, onDelete: "CASCADE" }) user: User;
  @ManyToOne({ entity: () => Item, onDelete: "CASCADE" }) item: Item;

  // constructor(author: User, content: string, title: string, meta: string[]) {
  //   this.author = author;
  //   this.content = content;
  //   this.title = title;
  //   this.meta = meta
  // }
};