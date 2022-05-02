import CreateRmaDTO from "./CreateRmaDTO";
import IRmaRepository from "./IRmaRepository";
import { Rma } from "./Rma";
import { RmaQueue } from "./RmaQueue";

export default class RmaRepositoryMemory implements IRmaRepository {
  
  
  rmas: Rma[] = [];
  queues: RmaQueue[] = [];

  async create({ order, product, customer }: CreateRmaDTO): Promise<Rma> {
    const rma = new Rma();
    Object.assign(rma, { order, product, customer });
    this.rmas.push(rma)
    return rma;
  }

  async insertInQueue(rma_id: string, attendant: string): Promise<RmaQueue> {
    const queue = new RmaQueue();
    Object.assign(queue, { rma_id, attendant });
    this.queues.push(queue);
    return queue;
  }

  async getQueue(): Promise<RmaQueue[]> {
    return this.queues;
  }

}