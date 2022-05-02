import CreateRmaUseCase from "../src/CreateRmaUseCase";
import InsertRmaInQueueUseCase from "../src/InsertRmaInQueueUseCase";
import Mediator from "../src/Mediator";
import RmaRepositoryMemory from "../src/RmaRepositoryMemory";

let createRmaUseCase: CreateRmaUseCase;
let rmaRepositoryMemory: RmaRepositoryMemory;
let insertRmaInQueueUseCase: InsertRmaInQueueUseCase;

beforeEach(() => {

})

test("should be able to create rma", async () => {
  rmaRepositoryMemory = new RmaRepositoryMemory();
  createRmaUseCase = new CreateRmaUseCase(rmaRepositoryMemory);
  const rma = await createRmaUseCase.execute({
    order: "001",
    product: "Jogo de Panelas Tramontina",
    customer: "07622503952"
  })

  expect(rma.order).toBe("001");
  expect(rma).toHaveProperty("id");
})

test("should be able to have inserted rma into queue", async () => {  
  rmaRepositoryMemory = new RmaRepositoryMemory();
  const mediator = new Mediator();
  mediator.register(new InsertRmaInQueueUseCase(rmaRepositoryMemory));
  createRmaUseCase = new CreateRmaUseCase(rmaRepositoryMemory, mediator);
  const rma1 = await createRmaUseCase.execute({
    order: "001",
    product: "Jogo de Panelas Tramontina",
    customer: "07622503952"
  })

  const rma2 = await createRmaUseCase.execute({
    order: "002",
    product: "Violão Tagima",
    customer: "04670393087"
  })

  const queue = await rmaRepositoryMemory.getQueue();

  expect(queue).toHaveLength(2);
})