import { v4 as uuidV4 } from "uuid";

class RmaQueue {
  id?: string;
  rma_id!: string;
  attendant!: string;

  constructor () {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { RmaQueue };
