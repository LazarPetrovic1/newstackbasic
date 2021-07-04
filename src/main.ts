import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mikroConfig from "./mikro-orm.config"
// import { User } from './entities/User';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const orm = await MikroORM.init(mikroConfig)
  await orm.getMigrator().up()
  // const user = orm.em.create(User, { email: "bob@bob.bob", name: "Bob", password: "15577800" })
  // await orm.em.persistAndFlush(user)
  // const users = await orm.em.find(User, {})
  // console.log(users);
  await app.listen(3000);
}
bootstrap();
