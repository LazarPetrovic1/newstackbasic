import { Item } from "src/entities/Item";
import { User } from "src/entities/User";

export interface Comment {
  id?: number;
  text: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  item: Item;
}
