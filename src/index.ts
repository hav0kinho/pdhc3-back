import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";

import dotenv from "dotenv";

const app = express();

// CONFIGURAÇÕES
dotenv.config(); // Uso do .env
const PORT = process.env.PORT || 3000;

app.use(cors()); // Permite requisições de outros domínios
app.use(bodyParser.json()); // Permite o uso de JSON nas requisições

app.use("/api", router); // Adiciona as rotas configuradas no routes/index.ts

// MIDDLEWARES
app.use(express.json()); // Permite o uso de JSON nas requisições

// ROTAS
// Rota Inicial da API
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
