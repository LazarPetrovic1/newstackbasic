import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Control } from "./Control";
import { User } from "./User";

@Entity({ tableName: "item" })
export class Item {
  @PrimaryKey() id!: number;
  @Property() content!: string;
  @Property({ unique: true }) title!: string;
  @Property({ nullable: true }) meta: string[];
  @Property({ type: 'date' }) createdAt = new Date();
  @Property({ type: 'date', onUpdate: () => new Date() }) updatedAt = new Date();
  @ManyToOne({ entity: () => User }) author: User;
  // @ManyToOne({ entity: () => User }) author: User;
  @OneToMany({ entity: () => Control, mappedBy: control => control.item }) votes = new Collection<Control>(this)
  // constructor(author: User, content: string, title: string, meta: string[]) {
  //   this.author = author;
  //   this.content = content;
  //   this.title = title;
  //   this.meta = meta
  // }
};