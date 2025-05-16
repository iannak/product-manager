import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(orderData: CreateOrderDto): Promise<Order> {
    const { produtos: produtosInput, status } = orderData;
    const produtos: Product[] = [];
    let total = 0;
  
    for (const item of produtosInput) {
      const product = await this.productRepository.findOne({
        where: { id: String(item.id) },
      });
  
      if (!product) {
        throw new BadRequestException(
          `Produto com ID ${item.id} não encontrado.`,
        );
      }
  
      if (product.quantidade_estoque < item.quantidade) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto ${product.nome}.`,
        );
      }
  
      product.quantidade_estoque -= item.quantidade;
      await this.productRepository.save(product);
      total += product.preco * item.quantidade;
      produtos.push(product);
    }
  
    const order = this.orderRepository.create({
      produtos,
      total_pedido: total,
      status: status as OrderStatus, // Ensure status is cast to the correct type
    });
  
    return await this.orderRepository.save(order);
  }
  

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['produtos'] });
  }
}
