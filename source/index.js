// Instruments
import { app } from './server.js';
import { getPort } from './utils/index.js';

const PORT = getPort();

app.listen(PORT, () => {
    console.log(`Server API is up on port ${PORT}`);
});
