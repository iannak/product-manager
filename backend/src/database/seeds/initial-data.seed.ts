import { DataSource } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';
import { Seeder } from 'typeorm-extension';

export class InitialDataSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(Product);
    const orderRepository = dataSource.getRepository(Order);

    const products = await productRepository.save([
      {
        nome: 'Smartphone Samsung Galaxy S24+, Galaxy AI, Selfie de 12MP, Tela de 6.7" 1-120Hz, 256GB, 12GB RAM - Cinza',
        categoria: 'Electronics',
        descricao:
          '256GB de Memória Interna(*) e 12GB RAM, Bateria de 4900mAh, Galaxy AI; Circule para pesquisar; Tradução simultânea de voz e texto por IA; Galeria Inteligente, Câmera Tripla Traseira de 50MP +12MP + 10MP; Selfie de 12MP Dual Pixel AF, Tela Infinita de 6.7"** 1-120Hz; Cadeado Galaxy;',
        preco: 3.734,
        quantidade_estoque: 50,
        imagem_url:
          'https://m.media-amazon.com/images/I/71-YiNPYoCL.__AC_SX300_SY300_QL70_ML2_.jpg',
      },
      {
        nome: 'MacBook Pro M1',
        categoria: 'Electronics',
        descricao: 'Apple laptop with M1 chip, 13-inch display',
        preco: 4.999,
        quantidade_estoque: 30,
        imagem_url:
          'https://http2.mlstatic.com/D_NQ_NP_830417-MLA48708038815_122021-O.webp',
      },
      {
        nome: 'Nike Air Max',
        categoria: 'Footwear',
        descricao: 'Classic running shoes with air cushioning',
        preco: 129.99,
        quantidade_estoque: 100,
        imagem_url: 'https://imgnike-a.akamaihd.net/1920x1920/0289807TA10.jpg',
      },
      {
        nome: 'Coffee Maker',
        categoria: 'Home Appliances',
        descricao: 'Automatic drip coffee maker with timer',
        preco: 2.709,
        quantidade_estoque: 75,
        imagem_url:
          'https://m.media-amazon.com/images/I/51kPwebddML.__AC_SX300_SY300_QL70_ML2_.jpg',
      },
      {
        nome: 'Gaming Mouse',
        categoria: 'Gaming',
        descricao: 'RGB gaming mouse with 16000 DPI sensor',
        preco: 549.99,
        quantidade_estoque: 200,
        imagem_url:
          'https://m.media-amazon.com/images/I/61ni3t1ryQL.__AC_SX300_SY300_QL70_ML2_.jpg',
      },
    ]);

    await orderRepository.save([
      {
        status: 'PENDING',
        produtos: [products[0], products[1]],
        total_pedido: products[0].preco + products[1].preco,
      },
      {
        status: 'APPROVED',
        produtos: [products[2], products[4]],
        total_pedido: products[2].preco + products[4].preco,
      },
      {
        status: 'PENDING',
        produtos: [products[3]],
        total_pedido: products[3].preco,
      },
    ]);
  }
}
