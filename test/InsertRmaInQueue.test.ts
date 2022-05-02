import CreateRmaUseCase from "../src/CreateRmaUseCase";
import InserRmaInQueueUseCase from "../src/InsertRmaInQueueUseCase";
import Mediator from "../src/Mediator";
import RmaCreatedEvent from "../src/RmaCreatedEvent";
import RmaRepositoryMemory from "../src/RmaRepositoryMemory";

let rmaRepositoryMemory: RmaRepositoryMemory;
let insertRmaInQueueUseCase: InserRmaInQueueUseCase;

beforeEach(() => {
  rmaRepositoryMemory = new RmaRepositoryMemory();
  insertRmaInQueueUseCase = new InserRmaInQueueUseCase(rmaRepositoryMemory);
})

test("should be able to insert rma in queue and link to attendant", async () => {  
  const rma = await rmaRepositoryMemory.create({
    order: "001",
    product: "Jogo de Panelas Tramontina",
    customer: "07622503952"
  })
  const event = new RmaCreatedEvent(rma);
  await insertRmaInQueueUseCase.handle(event);
  const queue = await rmaRepositoryMemory.getQueue();
  expect(queue[0].rma_id).toBe(rma.id);
  expect(queue[0].attendant).not.toBe("");
})