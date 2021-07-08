export class CreateItemDTO {
  readonly id: number;
  readonly content: string;
  readonly title: string;
  readonly meta: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}