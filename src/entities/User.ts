import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Control } from "./Control";
import { Item } from "./Item";

@Entity({ tableName: "user" })
export class User {
  @PrimaryKey() id!: number;
  @Property({ unique: true }) email!: string;
  @Property() name!: string;
  @Property() password!: string;
  @Property({ type: 'date' }) createdAt = new Date();
  @Property({ type: 'date', onUpdate: () => new Date() }) updatedAt = new Date();
  // @OneToMany(() => Item, item => item, { eager: true, orphanRemoval: true, mappedBy: 'id' }) items = new Collection<number[]>(this)
  @OneToMany({ entity: () => Item, mappedBy: item => item.author }) items = new Collection<Item>(this);
  @OneToMany({ entity: () => Control, mappedBy: control => control.user }) votes = new Collection<Control>(this)
  // constructor(email: string, name: string, password: string) {
  //   this.email = email;
  //   this.name = name;
  //   this.password = password;
  // }
};