const {
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require("discord.js");

function dropdownMenu() {
  const menu = new StringSelectMenuBuilder()
    .setCustomId("rank_select")
    .setPlaceholder("Choose your rank")
    .addOptions([
      { label: "Bronze", value: "Bronze" },
      { label: "Silver", value: "Silver" },
      { label: "Gold", value: "Gold" },
      { label: "Platinum", value: "Platinum" },
      { label: "Diamond", value: "Diamond" },
      { label: "Crimson", value: "Crimson" },
      { label: "Iridescent", value: "Iridescent" },
      { label: "Top250", value: "Top250" }
    ]);

  return new ActionRowBuilder().addComponents(menu);
}

module.exports = { dropdownMenu };
