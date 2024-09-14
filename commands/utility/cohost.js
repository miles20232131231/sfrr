const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('co-host')
    .setDescription('Announces that the user is now co-hosting the session.'),
  async execute(interaction) {
    const staffRoleId = '1277475295372513385'; // Replace with your actual staff role ID

    if (!interaction.member.roles.cache.has(staffRoleId)) {
      await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
      return;
    }

    const embed = new EmbedBuilder()
      .setDescription(`${interaction.user} is now co-hosting this session!`)
      .setFooter({
        text: 'Southwest Florida Roleplay Realm ',
        iconURL: 'https://cdn.discordapp.com/attachments/1264762831153266689/1264788578056142939/Screenshot_2024-07-21_203740.png'
      })
      .setTimestamp();

    // Acknowledge the interaction and respond with an ephemeral message
    await interaction.reply({ content: 'Co-host Message Released!', ephemeral: true });

    // Send the embed publicly
    await interaction.channel.send({ embeds: [embed] });
  }
};