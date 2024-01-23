import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class DeleteOrderParams {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
