import { Item } from "src/entities/Item";
import { User } from "src/entities/User";

export interface Control {
  id?: number;
  value: number;
  userId: number;
  itemId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  item: Item;
}