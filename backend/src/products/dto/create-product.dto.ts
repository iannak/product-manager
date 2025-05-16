import { IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nome: string;

  @IsString()
  categoria: string;

  @IsString()
  descricao: string;

  @IsNumber()
  preco: number;

  @IsNumber()
  @Min(0)
  quantidade_estoque: number;

  @IsUrl()
  imagem_url: string;
}
