import { Migration } from '@mikro-orm/migrations';

export class Migration20210713144234 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "email" varchar(255) not null, "name" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "item" ("id" serial primary key, "content" text not null, "title" varchar(255) not null, "meta" text[] null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "author_id" int4 not null);');
    this.addSql('alter table "item" add constraint "item_title_unique" unique ("title");');

    this.addSql('create table "control" ("id" serial primary key, "value" int4 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" int4 not null, "item_id" int4 not null);');

    this.addSql('alter table "item" add constraint "item_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "control" add constraint "control_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "control" add constraint "control_item_id_foreign" foreign key ("item_id") references "item" ("id") on update cascade on delete CASCADE;');
  }

}
