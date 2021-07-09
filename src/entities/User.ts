import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
// import { UsersRepository } from "../users/users.repository";
import { Item } from "./Item";

@Entity({ tableName: "user"/*, customRepository: () => UsersRepository*/ })
export class User {
  @PrimaryKey() id!: number;
  @Property({ unique: true }) email!: string;
  @Property() name!: string;
  @Property() password!: string;
  @Property({ type: 'date' }) createdAt = new Date();
  @Property({ type: 'date', onUpdate: () => new Date() }) updatedAt = new Date();
  @OneToMany({ entity: () => Item, mappedBy: 'author' }) items: Item["id"] | number[];
};