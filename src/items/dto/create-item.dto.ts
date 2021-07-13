import { Control } from "src/entities/Control";
import { User } from "src/entities/User";

export class CreateItemDTO {
  readonly id: number;
  readonly content: string;
  readonly title: string;
  readonly meta: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author: User;
  readonly votes: Control[];
}