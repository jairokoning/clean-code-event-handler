import CreateRmaDTO from "./CreateRmaDTO";
import { Rma } from "./Rma";
import { RmaQueue } from "./RmaQueue";

export default interface IRmaRepository {
  create({ order, product, customer }: CreateRmaDTO): Promise<Rma>;
  insertInQueue(rma_id: string, attendant: string): Promise<RmaQueue>;
  getQueue(): Promise<RmaQueue[]>
}