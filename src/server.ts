import { App } from "./app";

new App().server.listen(7777, () => console.log('listen on port 7777'))