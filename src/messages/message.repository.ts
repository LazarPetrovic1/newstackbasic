import { Repository, EntityRepository } from "@mikro-orm/core";
import { Message } from "../entities/Message";

@Repository(Message)
export class MessagesRepository extends EntityRepository<Message> {}