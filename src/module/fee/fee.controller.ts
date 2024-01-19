import { Controller, Get, Post } from "@nestjs/common";
import { ControllerMetaData } from "@relationc/permissions";
import { FeeService } from "./fee.service";


@ControllerMetaData('fees', 'Sale')
@Controller('fees')
export class FeeController {
  constructor(private feeService: FeeService) { }

  @Post('')
  async create() { }

  @Get('')
  async list() { }
}
