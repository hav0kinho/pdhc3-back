import { Router } from "express";
import routerProduto from "./produtoRoutes";
import routerVenda from "./vendaRoutes";

const router = Router();
// Rotas
router.use("/produtos", routerProduto); // Configurando Rotas de Produtos
router.use("/vendas", routerVenda); // Configurando Rotas de Vendas

export default router;
