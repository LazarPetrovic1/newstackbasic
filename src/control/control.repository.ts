import { Repository, EntityRepository } from "@mikro-orm/core";
import { Control } from "../entities/Control";

@Repository(Control)
export class ControlsRepository extends EntityRepository<Control> {}