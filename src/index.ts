import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";

import dotenv from "dotenv";

const app = express();

// CONFIGURAÇÕES
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

// MIDDLEWARES
app.use(express.json());

// ROTAS
app.get("/", (req: Request, res: Response) => {
  res.send({
    mensagem: "Bem vindo a API!",
    rotas: [{ produtos: "/api/produtos" }, { vendas: "/api/vendas" }],
  });
});

// SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
