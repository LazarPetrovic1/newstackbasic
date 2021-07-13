import { Item } from "src/entities/Item";
import { User } from "src/entities/User";

export class CreateControlDTO {
  readonly id: number;
  readonly value: number;
  readonly userId: number;
  readonly user: User;
  readonly item: Item;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly itemId: number;
}