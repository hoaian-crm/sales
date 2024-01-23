import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../order/order.entity";

@Entity("fees")
export class Fee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column()
  name: string;

  @ManyToOne(() => Order)
  order: Order;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
