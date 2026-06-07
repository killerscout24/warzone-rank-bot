const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot Online");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Web server started");
});

const rankCommand = require("./commands/rank");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const rankEmblems = {
  Bronze: "🥉",
  Silver: "🥈",
  Gold: "🥇",
  Platinum: "💎",
  Diamond: "🔷",
  Crimson: "🔥",
  Iridescent: "👑",
  Top250: "🏆"
};

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "!rank") {
    return message.reply({
      content: "Select your Warzone rank:",
      components: [rankCommand.dropdownMenu()]
    });
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === "rank_select") {
    const rank = interaction.values[0];

    try {
      await interaction.member.setNickname(
        `${interaction.member.user.username} ${rankEmblems[rank]}`
      );

      await interaction.reply({
        content: `Rank updated to ${rank}`,
        ephemeral: true
      });
    } catch {
      await interaction.reply({
        content: "I couldn't change your nickname.",
        ephemeral: true
      });
    }
  }
});

client.login(process.env.TOKEN);
