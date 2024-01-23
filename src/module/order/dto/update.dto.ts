import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { CreateFeeBody } from "src/module/fee/dto/create.dto";
import { ProductOrderBody } from "./create.dto";

export class UpdateOrderParams {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
export class UpdateOrderBody {

  @IsNumber()
  @Type(() => Number)
  customerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFeeBody)
  fees: Array<CreateFeeBody>;

  @ArrayMinSize(1)
  @IsObject({ each: true })
  @Type(() => ProductOrderBody)
  products: Array<ProductOrderBody>;
}
