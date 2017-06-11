const Bot = require(process.env.bot);

new Bot(
  process.env.aoire_host,
  process.env.aoire_room,
  process.env.user_agent
).start();
