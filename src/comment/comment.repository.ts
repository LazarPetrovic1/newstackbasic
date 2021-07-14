import { Repository, EntityRepository } from "@mikro-orm/core";
import { Comment } from "../entities/Comment";

@Repository(Comment)
export class ControlsRepository extends EntityRepository<Comment> {}