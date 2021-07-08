import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "item" })
export class Item {
  @PrimaryKey() id!: number;
  @Property() content!: string;
  @Property({ unique: true }) title!: string;
  @Property({ nullable: true }) meta: string[];
  @Property({ type: 'date' }) createdAt = new Date()
  @Property({ type: 'date', onUpdate: () => new Date() }) updatedAt = new Date()
};