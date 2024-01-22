import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { CreateFeeBody } from "src/module/fee/dto/create.dto";

export class CreateOrderBody {

  @IsNumber()
  @Type(() => Number)
  customerId: number;

  @IsArray()
  fees: Array<CreateFeeBody> = [];

  @ArrayMinSize(1)
  @IsObject({}, { each: true })
  @Type(() => ProductOrderBody)
  products: Array<ProductOrderBody>;
}

export class ProductOrderBody {

  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsNumber()
  @Type(() => Number)
  qty: number;
}
