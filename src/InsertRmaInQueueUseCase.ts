import IRmaRepository from "./IRmaRepository";
import { Rma } from "./Rma";
import RmaCreatedEvent from "./RmaCreatedEvent";
import { RmaQueue } from "./RmaQueue";


export default class InserRmaInQueueUseCase {
  name = "RmaCreatedEvent";
	// stockEntryRepository: StockEntryRepository;

  constructor(private rmaRepository: IRmaRepository) {}

  async handle(event: RmaCreatedEvent): Promise<void> {
    const queue = await this.rmaRepository.insertInQueue(event.rma.id as string, "112233");
  }
}