import CreateRmaDTO from "./CreateRmaDTO";
import IRmaRepository from "./IRmaRepository";
import Mediator from "./Mediator";
import { Rma } from "./Rma";
import RmaCreatedEvent from "./RmaCreatedEvent";


export default class CreateRmaUseCase {
  constructor(
    private rmaRepository: IRmaRepository,
    readonly mediator: Mediator = new Mediator()
  ) {}

  async execute({ order, product, customer }: CreateRmaDTO): Promise<Rma> {
    const rma = await this.rmaRepository.create({
      order,
      product,
      customer,
    })    
    await this.mediator.publish(new RmaCreatedEvent(rma));
    return rma;
  }
}