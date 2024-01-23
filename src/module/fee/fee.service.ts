import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Fee } from "./fee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFeeBody } from "./dto/create.dto";

@Injectable()
export class FeeService {
  constructor(
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
  ) { }

  async create(body: CreateFeeBody) {
    return this.feeRepository.save(this.feeRepository.create(body));
  }

  async createBulk(body: Array<CreateFeeBody>) {
    return this.feeRepository.save(body.map(fee => this.feeRepository.create(fee)));
  }
}
