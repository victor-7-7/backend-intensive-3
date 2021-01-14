// https://www.npmjs.com/package/express-rate-limit
import rateLimit from 'express-rate-limit';

export const limiter = (numRequests, resetIn) => rateLimit({
    /** Timeframe for which requests are checked/remembered. Defaults to 60000
     * (через сколько миллисекунд сбросить счетчик) */
    windowMs: resetIn,
    max:      numRequests, // Limit each IP to max requests per windowMs
    headers:  false, // Отправлять ли клиенту хедеры, показывающие сколько осталось
});
