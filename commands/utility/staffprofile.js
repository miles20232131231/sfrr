const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Mock database to store session logs (Replace with actual database logic in production)
const sessionLogs = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('staff-profile')
    .setDescription('View your staff profile with session logs.'),

  async execute(interaction) {
    const userId = interaction.user.id;

    // Retrieve the logs for the user
    const logs = sessionLogs.get(userId) || [];

    // Count the number of session-host logs and co-host logs
    const sessionHostLogs = logs.filter(log => log.sessionType === 'session_host');
    const coHostLogs = logs.filter(log => log.sessionType === 'session_co_host');

    // Create the main staff profile embed
    const profileEmbed = new EmbedBuilder()
      .setTitle('**Staff Profile**')
      .addFields(
        { name: 'User:', value: `<@${interaction.user.id}>` }, // Display user mention
        { name: 'Sessions Hosted:', value: sessionHostLogs.length.toString() },
        { name: 'Co-Hosts:', value: coHostLogs.length.toString() }
      )
      .setColor('#3498db');

    // Create buttons for sessions hosted and co-hosts
    const buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('sessions_hosted')
          .setLabel('Sessions Hosted')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('co_hosts')
          .setLabel('Co-Hosts')
          .setStyle(ButtonStyle.Secondary)
      );

    // Send the staff profile embed with buttons
    await interaction.reply({ embeds: [profileEmbed], components: [buttons] });

    // Create a collector to handle button interactions
    const filter = i => i.user.id === interaction.user.id; // Only allow the command user to interact
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 24 * 60 * 60 * 1000 }); // 24 hours

    collector.on('collect', async i => {
      if (i.isButton()) {
        try {
          // Ensure that the interaction is deferred if not already replied
          if (!i.replied) {
            await i.deferUpdate(); // Defer the interaction to acknowledge receipt
          }

          let embeds = [];

          if (i.customId === 'sessions_hosted') {
            if (sessionHostLogs.length === 0) {
              embeds.push(new EmbedBuilder()
                .setTitle('No Sessions Hosted Logs Found')
                .setColor('#e74c3c'));
            } else {
              for (const [index, log] of sessionHostLogs.entries()) {
                const responseEmbed = new EmbedBuilder()
                  .setTitle(`Session Hosted #${index + 1}`)
                  .addFields(
                    { name: 'Date of Log', value: log.date.toString() },
                    { name: 'Session Start Time', value: log.sessionStart.toString() },
                    { name: 'Session End Time', value: log.sessionEnd.toString() },
                    { name: 'Session Rating', value: log.sessionRating.toString() }
                  )
                  .setColor('#3498db');
                embeds.push(responseEmbed);
              }
            }
          } else if (i.customId === 'co_hosts') {
            if (coHostLogs.length === 0) {
              embeds.push(new EmbedBuilder()
                .setTitle('No Co-Hosts Logs Found')
                .setColor('#e74c3c'));
            } else {
              for (const [index, log] of coHostLogs.entries()) {
                const responseEmbed = new EmbedBuilder()
                  .setTitle(`Co-Host #${index + 1}`)
                  .addFields(
                    { name: 'Date of Log', value: log.date.toString() },
                    { name: 'Session Start Time', value: log.sessionStart.toString() },
                    { name: 'Session End Time', value: log.sessionEnd.toString() },
                    { name: 'Session Rating', value: log.sessionRating.toString() }
                  )
                  .setColor('#3498db');
                embeds.push(responseEmbed);
              }
            }
          }

          // Send the embeds together with a little space
          await i.editReply({
            embeds: embeds,
            components: [] // Remove buttons to prevent further interactions
          });
        } catch (error) {
          if (error.code === 10062) {
            console.warn('Interaction expired or unknown:', error);
          } else {
            console.error('Error handling interaction:', error);
          }
        }
      }
    });

    collector.on('end', async collected => {
      if (collected.size === 0) {
        try {
          await interaction.followUp({ content: 'No interactions were received.', ephemeral: true });
        } catch (error) {
          console.error('Error handling interaction end:', error);
        }
      }
    });
  },
};

// Export sessionLogs to be used by the session-log command
module.exports.sessionLogs = sessionLogs;
