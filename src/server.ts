import { App } from './app';
import { PORT } from './contants/server';

new App().server.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
