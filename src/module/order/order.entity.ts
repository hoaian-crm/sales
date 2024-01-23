import { AfterLoad, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Fee } from '../fee/fee.entity';
import { Product } from 'crm-prototypes';

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Fee, (fee) => fee.order)
  fees: Array<Fee>;

  @OneToMany(() => ProductOrder, (product) => product.order)
  products: Array<ProductOrder>;

  @Column()
  customerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: string;

  // View fields
  subTotal: number = 0;
  total: number = 0;

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

  @ManyToOne(() => Order)
  order: Order;

  @Column()
  productId: number;

  @AfterLoad()
  addPrefixImage() {
    this.image = process.env.PRODUCT_IMAGE_PREFIX + this.image;
  }
}
