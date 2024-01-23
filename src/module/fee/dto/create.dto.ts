import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateFeeBody {

  @IsString()
  name: string;

  @IsNumber()
  @Type(() => Number)
  value: number;

  orderId: number;
}
