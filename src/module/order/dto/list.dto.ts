import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { OffsetWithoutLimitNotSupportedError } from "typeorm";

export class ListOrderQuery {

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  customerId?: number;
}
