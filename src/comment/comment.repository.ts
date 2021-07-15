import { Repository, EntityRepository } from "@mikro-orm/core";
import { Comment } from "../entities/Comment";

@Repository(Comment)
export class CommentsRepository extends EntityRepository<Comment> {}