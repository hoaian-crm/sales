import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("fees")
export class Fee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column()
  name: string;
}
