import { User } from "src/entities/User";

export class CreateItemDTO {
  readonly id: number;
  readonly content: Text;
  readonly title: string;
  readonly meta: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author: User;
}