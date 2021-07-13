import { EntityRepository, Repository } from "@mikro-orm/core";
import { Item } from "../entities/Item";

@Repository(Item)
export class ItemsRepository extends EntityRepository<Item> {}