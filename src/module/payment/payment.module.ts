import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./payment.entity";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  exports: [PaymentService],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {

}
