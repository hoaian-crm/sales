import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Fee } from '../fee/fee.entity';

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Fee, (fee) => fee.orderId)
  fees: Array<Fee>;

  @OneToMany(() => ProductOrder, (product) => product.orderId)
  products: Array<ProductOrder>;

  @Column()
  customerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: string;
}

@Entity('product_order')
export class ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  qty: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  @Column()
  orderId: number;
}
