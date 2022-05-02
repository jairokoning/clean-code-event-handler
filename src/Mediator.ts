import DomainEvent from "./DomainEvent";
import Handler from "./Handler";

export default class Mediator {
	handlers: Handler[];

	constructor () {
		this.handlers = [];
	}

	register (handler: Handler) {
		console.log(handler)
		this.handlers.push(handler);
	}

	async publish (event: DomainEvent) {
		console.log(this.handlers)
		for (const handler of this.handlers) {
			console.log(handler.name, event.name)
			if (handler.name === event.name) {
				await handler.handle(event);
			}
		}
	}
}