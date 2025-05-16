import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido' })
  @ApiResponse({
    status: 201,
    description: 'Pedido criado com sucesso.',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou estoque insuficiente.',
  })
  create(@Body() orderData: CreateOrderDto): Promise<Order> {
    return this.orderService.create(orderData);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos retornada com sucesso.',
    type: [Order],
  })
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }
}
