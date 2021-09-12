const Discord = require('discord.js');
const dotenv = require('dotenv');
var http = require('http');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {});

setInterval(function () {
  http.get('https://discord-valorant-custom-bot.herokuapp.com/');
}, 300000);

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const prefix = 'vc?';

const maps = [
  'Bind',
  'Haven',
  'Split',
  'Ascent',
  'Icebox',
  'Breeze',
  'Fracture',
];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command == 'map') {
    shuffleArray(maps);
    message.reply('**' + maps[0] + ' 🗺**');
  } else if (command == 'teams') {
    const getPlayers = message.content.split('/').splice(1);

    const players = getPlayers.filter(String);

    if (players.length < 2 || players.length > 10) {
      return message.reply('insufficient players 😭');
    }

    for (let index = 0; index < 100; index++) {
      shuffleArray(players);
    }

    const teamA = [];
    const teamB = [];
    for (let index = 0; index < players.length; index++) {
      if (index % 2 == 0) {
        teamA.push(players[index]);
      } else {
        teamB.push(players[index]);
      }
    }

    const AttackerTeam = [];
    teamA.forEach((player, order) => {
      AttackerTeam.push(`\n \`Player ${order + 1}: ${player}\``);
    });
    const DefendersTeam = [];

    teamB.forEach((player, order) => {
      DefendersTeam.push(`\n \`Player ${order + 1}: ${player}\``);
    });

    let msg = `**Attackers Team ⚔️:**${AttackerTeam}\n\n**Defenders Team 🛡:**${DefendersTeam}`;
    message.reply(msg);
  }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

client.login(process.env.TOKEN);
