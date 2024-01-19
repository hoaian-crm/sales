import { Controller } from "@nestjs/common";
import { ApiMetaData, ControllerMetaData } from "@relationc/permissions";
import { PaymentService } from "./payment.service";

@ControllerMetaData('payments', 'Sale')
@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) { }
}
