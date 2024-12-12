import { UUID } from "crypto";

export type Produto = {
  id: UUID;
  nome: string;
  imagemUrl: string;
  precoUnidade: number;
  quantidade: number;
};
