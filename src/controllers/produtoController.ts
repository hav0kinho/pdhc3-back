import { UUID } from "crypto";
import prisma from "../db/db";
import { ProdutoCreateDTO } from "../models/Produto/DTO/ProdutoCreateDTO";

// Função para resgatar todos os produtos
export const resgatarProdutos = async () => {
  try {
    const produtos = await prisma.produto.findMany(); // Resgatando todos os produtos
    console.log("Produtos resgatados com sucesso!");
    return produtos;
  } catch (e) {
    console.error("Erro ao resgatar produtos: ", e);
    return null;
  }
};

// Função para resgatar um produto específico
export const resgatarProduto = async (id: string) => {
  try {
    const produto = await prisma.produto.findFirst({
      where: {
        id: id,
      },
    }); // Resgatando um produto específico
    console.log("Produto resgatado com sucesso!");
    return produto;
  } catch (e) {
    console.error("Erro ao resgatar produto: ", e);
    return null;
  }
};
// Função para criar um produto
export const criarProduto = async (produto: ProdutoCreateDTO) => {
  try {
    const produtoCriado = await prisma.produto.create({
      data: produto,
    }); // Criando um novo produto
    console.log("Produto criado com sucesso!");
    return produtoCriado;
  } catch (e) {
    console.error("Erro ao criar produto: ", e);
    return null;
  }
};

// Função para remover um produto
export const removerProduto = async (uuid: string) => {
  try {
    const produtoRemovido = await prisma.produto.delete({
      where: {
        id: uuid,
      },
    }); // Removendo um produto
    console.log("Produto removido com sucesso!");
    return produtoRemovido;
  } catch (e) {
    console.error("Erro ao remover produto: ", e);
    return null;
  }
};

// Função para atualizar a quantidade de um produto
export const atualizarQuantidadeProduto = async (
  uuid: string,
  quantidade: number
) => {
  try {
    const produtoAtualizado = await prisma.produto.update({
      where: {
        id: uuid,
      },
      data: {
        quantidade: quantidade,
      },
    }); // Atualizando a quantidade de um produto
    console.log("Produto atualizado com sucesso!");
    console.log(produtoAtualizado);
    return produtoAtualizado;
  } catch (e) {
    console.error("Erro ao atualizar quantidade do produto: ", e);
    return null;
  }
};

// Função para reduzir a quantidade de um produto
export const reduzirQuantidadeProduto = async (
  uuid: string,
  quantidade: number
) => {
  try {
    const produto = await resgatarProduto(uuid); // Resgatando o produto pelo ID
    if (!produto || produto.quantidade < quantidade) {
      console.error("Estoque insuficiente ou produto não encontrado.");
      return null;
    } // Verificando se o produto existe e se a quantidade é suficiente

    const produtoAtualizado = await prisma.produto.update({
      where: { id: uuid },
      data: { quantidade: produto.quantidade - quantidade },
    }); // Atualizando a quantidade do produto

    console.log("Estoque do produto reduzido com sucesso!");
    return produtoAtualizado;
  } catch (e) {
    console.error("Erro ao reduzir a quantidade do produto: ", e);
    return null;
  }
};
