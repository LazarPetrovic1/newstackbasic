import { Control } from "src/entities/Control";
import { Item } from "src/entities/Item";

export class CreateUserDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly items: number[];
  readonly votes: Control[];
}