import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
// import { ItemsRepository } from "../items/items.repository";
import { User } from "./User";

@Entity({ tableName: "item"/*, customRepository: () => ItemsRepository*/ })
export class Item {
  @PrimaryKey() id!: number;
  @Property() content!: string;
  @Property({ unique: true }) title!: string;
  @Property({ nullable: true }) meta: string[];
  @Property({ type: 'date' }) createdAt = new Date();
  @Property({ type: 'date', onUpdate: () => new Date() }) updatedAt = new Date();
  @ManyToOne({ entity: () => User }) author: User["id"] | number;
};