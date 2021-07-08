import { Migration } from '@mikro-orm/migrations';

export class Migration20210708111117 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "item" ("id" serial primary key, "content" varchar(255) not null, "title" varchar(255) not null, "meta" text[] null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "item" add constraint "item_title_unique" unique ("title");');

    this.addSql('create table "user" ("id" serial primary key, "email" varchar(255) not null, "name" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
