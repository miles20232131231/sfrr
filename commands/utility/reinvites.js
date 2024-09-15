const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('re-invites')
    .setDescription('Re-invite session link')
    .addStringOption(option => 
      option.setName('link')
        .setDescription('Re-invites link')
        .setRequired(true)),

  async execute(interaction) {
    const staffRoleId = '1279933324298817608';
    const logChannelId = '1279642823951646760'; // Channel ID for logging

    if (!interaction.member.roles.cache.has(staffRoleId)) {
      await interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
      return;
    }

    const link = interaction.options.getString('link');

    const embed = new EmbedBuilder()
      .setTitle('Southwest Florida Roleplay Realm | Session Re-invites')
      .setDescription(`${interaction.user} has now just released session re-invites so the civilians can join the session. To join the session click on the button below called "Reinvites Link". Once you have loaded in the server park up and listen to what the host says.`)
      .setColor('#3498db')
      .setImage('https://cdn.discordapp.com/attachments/893617400321290311/1265143046337593455/image.png?ex=66a06fc7&is=669f1e47&hm=a7d8454194dfb25a75c452e7d60a70fd39d3d7c98bfcec6157f0a90862ee4671&')
      .setFooter({
        text: 'Southwest Florida Roleplay Realm ',
        iconURL: 'https://cdn.discordapp.com/attachments/1264762831153266689/1264788578056142939/Screenshot_2024-07-21_203740.png'
      });
      
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('reinvites_link')
          .setLabel('Re-invites Link')
          .setStyle(ButtonStyle.Primary)
      );

    // Acknowledge the interaction and respond with an ephemeral message
    await interaction.reply({ content: 'Re-invites Released!', ephemeral: true });

    // Send the embed publicly
    const message = await interaction.channel.send({
      content: '@here',
      embeds: [embed],
      components: [row],
      allowedMentions: { parse: ['everyone'] }
    });

    const filter = i => i.customId === 'reinvites_link';

    // Create a persistent interaction collector with no timeout
    const collector = interaction.channel.createMessageComponentCollector({ filter });

    collector.on('collect', async i => {
      if (i.customId === 'reinvites_link') {
        try {
          await i.reply({ content: `**Re-invites Link:** ${link}`, ephemeral: true });
        } catch (error) {
          console.error('Failed to send re-invites link:', error);
        }
      }
    });

    // Log the command execution
    const logEmbed = new EmbedBuilder()
      .setTitle('Command Execution Log')
      .setDescription(`**Command:** /re-invites\n**Executed By:** ${interaction.user.tag} (${interaction.user.id})\n**Link:** ${link}`)
      .setColor('#3498db')
      .setTimestamp();

    // Send the log to the specified channel
    const logChannel = await interaction.client.channels.fetch(logChannelId);
    if (logChannel) {
      await logChannel.send({ embeds: [logEmbed] });
    } else {
      console.error(`Log channel with ID ${logChannelId} not found.`);
    }
  }
};
