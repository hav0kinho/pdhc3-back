import { Router } from "express";
import routerProduto from "./produtoRoutes";
import routerVenda from "./vendaRoutes";

const router = Router();

router.use("/produtos", routerProduto);
router.use("/vendas", routerVenda);

export default router;
