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

const rankData = {
  Bronze: { tag: "BRZ", emoji: "🥉" },
  Silver: { tag: "SLV", emoji: "🥈" },
  Gold: { tag: "GLD", emoji: "🥇" },
  Platinum: { tag: "PLT", emoji: "💎" },
  Diamond: { tag: "DIA", emoji: "🔷" },
  Crimson: { tag: "CRM", emoji: "🔥" },
  Iridescent: { tag: "IRI", emoji: "👑" },
  Top250: { tag: "T250", emoji: "🏆" }
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

// Season reset
if (message.content.toLowerCase() === "!seasonreset confirm") {

  if (!message.member.permissions.has("Administrator")) {
    return message.reply("Admins only.");
  }

  const members = await message.guild.members.fetch();

  let resetCount = 0;

  for (const member of members.values()) {
    try {
      await member.setNickname(null);
      resetCount++;
    } catch (err) {}
  }

  return message.reply(
    `✅ Season reset complete. Reset ${resetCount} nicknames.`
  );
}
    });

client.on("interactionCreate", async interaction => {
  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === "rank_select") {
    const rank = interaction.values[0];

    try {
await interaction.member.setNickname(
  `${interaction.member.user.username} [${rankData[rank].tag}] ${rankData[rank].emoji}`
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
