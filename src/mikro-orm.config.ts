import { __prod__ } from "./constants";
import { User } from "./entities/User";
import { Item } from "./entities/Item";
import { MikroORM } from "@mikro-orm/core";
import * as path from "path";
import { Control } from "./entities/Control";

export default {
  migrations: {
    path:  path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  dbName: 'backend',
  type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  entities: [User, Item, Control],
  debug: !__prod__,
  clientUrl: "postgres://postgres:15577800@localhost:5432/backend",
} as Parameters<typeof MikroORM.init>[0];
