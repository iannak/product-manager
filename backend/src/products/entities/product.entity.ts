import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
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
  orders: Order[];
}
