import { Request, Router } from "express";
import { criarVenda, resgatarVendas } from "../controllers/vendaController";
import { VendaCreateDTO } from "../models/Venda/DTO/VendaCreateDTO";
import { Venda } from "../models/Venda/Venda";
import { resgatarProdutosCarrinhoDeUmaVenda } from "../controllers/produtoCarrinhoController";

const router = Router();

router.get("/", async (req, res) => {
  const vendas = await resgatarVendas();

  res.status(200).json(vendas);
});

router.get("/produtos-venda/:id", async (req, res) => {
  const idVenda = req.params.id;
  const produtosVenda = await resgatarProdutosCarrinhoDeUmaVenda(idVenda);

  res.status(200).json(produtosVenda);
});

router.post("/", async (req, res) => {
  const venda: VendaCreateDTO = req.body;
  const novaVenda = await criarVenda(venda);
  res.status(201).json(novaVenda);
});

export default router;
