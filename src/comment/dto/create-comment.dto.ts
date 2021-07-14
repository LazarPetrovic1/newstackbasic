import { Item } from "src/entities/Item";
import { User } from "src/entities/User";

export class CreateCommentDTO {
  readonly id: number;
  readonly text: number;
  readonly user: User;
  readonly item: Item;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}