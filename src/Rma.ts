import { v4 as uuidV4 } from "uuid";

class Rma {
  id?: string;
  order!: string;
  product!: string;
  customer!: string;

  constructor () {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rma };
