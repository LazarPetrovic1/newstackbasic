import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "user" })
export class User {
  @PrimaryKey() id!: number;
  @Property({ unique: true }) email!: string;
  @Property() name!: string;
  @Property() password!: string;
  @Property({ type: 'date' }) createdAt = new Date()
  @Property({ type: 'date', onUpdate: () => new Date() }) updatedAt = new Date()
};