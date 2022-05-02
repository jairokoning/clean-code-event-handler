import { Rma } from "./Rma";
import DomainEvent from "./DomainEvent";

export default class RmaCreatedEvent implements DomainEvent {
	name = "RmaCreatedEvent";

	constructor (readonly rma: Rma) {
	}
}