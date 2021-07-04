import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey()
  id!: string;

  @Property()
  email!: string;

  @Property()
  name!: string;

  @Property()
  password!: string;

  @Property({ type: 'date' })
  createdAt = new Date()

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date()
};