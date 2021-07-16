import { Repository, EntityRepository } from "@mikro-orm/core";
import { History } from "../entities/History";

@Repository(History)
export class HistorysRepository extends EntityRepository<History> {}