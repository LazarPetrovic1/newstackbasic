export class CreateItemDTO {
  readonly id: string;
  readonly content: string;
  readonly title: string;
  readonly meta: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}