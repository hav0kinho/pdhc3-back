import { Router } from "express";
import {
  criarProduto,
  removerProduto,
  resgatarProdutos,
  resgatarProduto,
  atualizarQuantidadeProduto,
} from "../controllers/produtoController";

const router = Router();

// Rotas do Produto
router.get("/", async (req, res) => {
  const produtos = await resgatarProdutos();
  res.status(200).json(produtos);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const produto = await resgatarProduto(id);
  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).send("O produto não foi encontrado");
  }
});

router.post("/", async (req, res) => {
  const produto = req.body;
  const novoProduto = await criarProduto(produto);
  res.status(201).json(novoProduto);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const produto = await removerProduto(id);
  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).send("O produto não foi encontrado");
  }
});

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
