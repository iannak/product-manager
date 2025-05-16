import { ApiProperty } from '@nestjs/swagger';

class ProdutoPedidoDto {
  @ApiProperty({ description: 'ID do produto' })
  id: number;

  @ApiProperty({ description: 'Quantidade solicitada' })
  quantidade: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Lista de produtos com quantidade',
    type: [ProdutoPedidoDto],
  })
  produtos: ProdutoPedidoDto[];

  @ApiProperty({
    description: 'Status inicial do pedido',
    enum: ['PENDING', 'APPROVED', 'CANCELLED'],
    default: 'PENDING',
  })
  status: string = 'PENDING';
}
