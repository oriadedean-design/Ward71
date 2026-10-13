import { initBotId } from 'botid/client/core';

// Vercel BotID: an invisible check that the browser submitting these forms is
// a real person's. The matching server check is checkBotId() in each route.
initBotId({
  protect: [{ path: '/api/petition/sign', method: 'POST' }],
});
