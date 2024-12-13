import { Router } from "express";
import {
  criarProduto,
  removerProduto,
  resgatarProdutos,
  resgatarProduto,
  atualizarQuantidadeProduto,
} from "../controllers/produtoController";

const router = Router();

// Rota de resgate da lista de produtos
router.get("/", async (req, res) => {
  const produtos = await resgatarProdutos();
  res.status(200).json(produtos);
});

// Rota de resgate de um produto específico
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const produto = await resgatarProduto(id);
  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).send("O produto não foi encontrado");
  }
});

// Rota de criação de um novo produto
router.post("/", async (req, res) => {
  const produto = req.body;
  const novoProduto = await criarProduto(produto);
  res.status(201).json(novoProduto);
});

// Rota de remoção de um produto específico
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const produto = await removerProduto(id);
  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).send("O produto não foi encontrado");
  }
});

// Rota de atualização da quantidade de um produto específico
router.post("/atualizar-quantidade/:id", async (req, res) => {
  const id = req.params.id;
  const quantidade: number = req.body.quantidade;

  const produtoAtualizado = await atualizarQuantidadeProduto(id, quantidade);

  if (produtoAtualizado) {
    res.status(200).json(produtoAtualizado);
  } else {
    res.status(404).send("O produto não foi encontrado ou algo deu errado");
  }
});

export default router;
