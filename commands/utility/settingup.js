const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('settingup')
    .setDescription('Notifies that staff, boosters, emergency services, and content creators can join.'),
  
  async execute(interaction) {
    const staffRoleId = '1279933324298817608'; // Replace with your actual staff role ID
    const logChannelId = '1279642823951646760'; // Replace with your log channel ID

    if (!interaction.member.roles.cache.has(staffRoleId)) {
      await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
      return;
    }

    const embed = new EmbedBuilder()
      .setDescription('Setting up. Staff, Boosters, Emergency Services & Content Creators may now join!')
      .setFooter({
        text: 'Southwest Florida Roleplay Realm ',
        iconURL: 'https://cdn.discordapp.com/attachments/1264762831153266689/1264788578056142939/Screenshot_2024-07-21_203740.png'
      })
      .setTimestamp();

    // Acknowledge the interaction and respond with an ephemeral message
    await interaction.reply({ content: 'Setting Message Released!', ephemeral: true });

    // Send the embed publicly
    await interaction.channel.send({ embeds: [embed] });

    // Log the command execution as an embed
    const logChannel = interaction.guild.channels.cache.get(logChannelId);
    if (logChannel) {
      const logEmbed = new EmbedBuilder()
        .setTitle('Command Executed')
        .setDescription(`The \`/settingup\` command was executed.`)
        .addFields(
          { name: 'Executed by', value: `${interaction.user.tag}`, inline: true },
          { name: 'User ID', value: `${interaction.user.id}`, inline: true },
          { name: 'Channel', value: `${interaction.channel.name}`, inline: true }
        )
        .setColor('#f1c40f')
        .setTimestamp();

      logChannel.send({ embeds: [logEmbed] });
    }
  }
};
