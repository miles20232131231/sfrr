const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('over')
    .setDescription('End a session')
    .addStringOption(option => 
      option.setName('start')
        .setDescription('This will tell when you started your session')
        .setRequired(true))
    .addStringOption(option => 
      option.setName('end')
        .setDescription('This will tell when you ended your session')
        .setRequired(true))
    .addStringOption(option => 
      option.setName('notes')
        .setDescription('You are able to add notes')
        .setRequired(false)),
  async execute(interaction) {
    await interaction.deferReply();
    
    const start = interaction.options.getString('start');
    const end = interaction.options.getString('end');
    const notes = interaction.options.getString('notes') || 'None';
    const logChannelId = '1279642823951646760'; // Channel ID for logging

    const embed = new EmbedBuilder()
      .setTitle('Session Concluded')
      .setDescription(`<@${interaction.user.id}> has ended the session. Thank you all for attending the session; we appreciate everyone that joined.\n\nStart Time: ${start}\nEnd Time: ${end}\nNotes: ${notes}`)
      .setColor('#3498db')
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });

    // Log the command execution
    const logEmbed = new EmbedBuilder()
      .setTitle('Command Execution Log')
      .setDescription(`**Command:** /over\n**Executed By:** ${interaction.user.tag} (${interaction.user.id})\n**Start Time:** ${start}\n**End Time:** ${end}\n**Notes:** ${notes}`)
      .setColor('#3498db')
      .setTimestamp();

    // Send the log to the specified channel
    const logChannel = await interaction.client.channels.fetch(logChannelId);
    if (logChannel) {
      await logChannel.send({ embeds: [logEmbed] });
    } else {
      console.error(`Log channel with ID ${logChannelId} not found.`);
    }
  },
};
