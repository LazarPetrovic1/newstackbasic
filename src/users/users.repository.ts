import { Repository } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { User } from "../entities/User";

@Repository(User)
export class UsersRepository extends EntityRepository<User> {}