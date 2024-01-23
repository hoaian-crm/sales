import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class GetOrderParams {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
