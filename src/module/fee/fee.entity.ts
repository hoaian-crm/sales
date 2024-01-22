import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("fees")
export class Fee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column()
  name: string;

  @Column()
  orderId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
