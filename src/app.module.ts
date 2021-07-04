import { Options } from '@mikro-orm/core';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/User';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
// import { UsersService } from './users/users.service';

const defaultOptions : Options = {
  type: 'postgresql',
  port: 5432,
  password: '15577800',
  dbName: "backend",
  clientUrl: "postgres://postgres:15577800@localhost:5432/backend",
}

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...defaultOptions,
      host: 'localhost',
      entities: [User]
    } as Options),
    UsersModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
