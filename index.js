require("dotenv").config();

const { Client, Intents } = require('discord.js');

const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
console.log(`Logged in as ${client.user.tag}`);
  
  try {
    const commands = await client.api.applications(CLIENT_ID).commands.get();
    
    for (const command of commands) {
      await client.api.applications(CLIENT_ID).commands(command.id).delete();
    }
    
    console.log('All global slash commands have been deleted.');
  } catch (error) {
    console.error('Error deleting slash commands:', error);
  }
});

client.login(TOKEN);