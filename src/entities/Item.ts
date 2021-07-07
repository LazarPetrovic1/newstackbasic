import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Item {
  @PrimaryKey()
  id!: string;

  @Property()
  content!: string;

  @Property()
  title!: string;

  @Property({ nullable: true })
  meta: string[];

  @Property({ type: 'date' })
  createdAt = new Date()

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date()
};