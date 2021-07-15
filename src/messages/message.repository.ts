import { Repository } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Message } from "../entities/Message";

@Repository(Message)
export class MessagesRepository extends EntityRepository<Message> {}