import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  categoria: string;

  @Column()
  descricao: string;

  @Column('decimal')
  preco: number;

  @Column('int')
  quantidade_estoque: number;

  @Column()
  imagem_url: string;

  @ManyToMany(() => Order, (order) => order.produtos)
  @JoinTable({
    name: 'order_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
  })
  orders: Order[];
}
