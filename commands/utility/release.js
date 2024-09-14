const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('release')
    .setDescription('This will release your session')
    .addStringOption(option =>
      option.setName('peacetime')
        .setDescription('Peacetime status')
        .setRequired(true)
        .addChoices(
          { name: 'On', value: 'On' },
          { name: 'Strict', value: 'Strict' },
          { name: 'Off', value: 'Off' }
        ))
    .addStringOption(option =>
      option.setName('frp-speeds')
        .setDescription('FRP-Speeds status')
        .setRequired(true)
        .addChoices(
          { name: '75 MPH', value: '75 MPH' },
          { name: '80 MPH', value: '80 MPH' },
          { name: '90 MPH', value: '90 MPH' }
        ))
    .addStringOption(option =>
      option.setName('drifting-status')
        .setDescription('Drifting status')
        .setRequired(true)
        .addChoices(
          { name: 'On', value: 'On' },
          { name: 'Corners Only', value: 'Corners Only' },
          { name: 'Off', value: 'Off' }
        ))
    .addStringOption(option =>
      option.setName('link')
        .setDescription('Session link')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles), // Only staff can execute this command
  async execute(interaction) {
    const peacetime = interaction.options.getString('peacetime');
    const frpSpeeds = interaction.options.getString('frp-speeds');
    const driftingStatus = interaction.options.getString('drifting-status');
    const link = interaction.options.getString('link');
    const staffRoleId = '1277475295372513385';

    const embed = new EmbedBuilder()
      .setTitle('Southwest Florida Roleplay Realm | Session Released')
      .setDescription(`The session has now been released! Ensure to abide by all civilian information rules and stay updated on banned vehicles. All information about the session is listed down below.
                
Make sure to register your vehicles in the ⁠commands channel, to register use the command /register, to unregister use the command /unregister and go over civilian information!
\n\n**__Session Information__**\n\nHost: ${interaction.user}\nPeacetime: ${peacetime}\nFRP-Speeds: ${frpSpeeds}\nDrifting Status: ${driftingStatus}`)
      .setColor('#3498db')
      .setImage('https://cdn.discordapp.com/attachments/893617400321290311/1265142366784716801/image.png?ex=66a06f25&is=669f1da5&hm=f35d5fc632f232c508657e1131a5edb1a82d539cabaa13df20828e81affd0b96&')
      .setFooter({
        text: 'Southwest Florida Roleplay Realm',
        iconURL: 'https://cdn.discordapp.com/attachments/1264762831153266689/1264788578056142939/Screenshot_2024-07-21_203740.png'
      })
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('session_link')
          .setLabel('Session Link')
          .setStyle(ButtonStyle.Primary)
      );

    // Acknowledge the interaction and respond with an ephemeral message
    await interaction.reply({ content: 'Session released!', ephemeral: true });

    // Send the embed publicly
    const message = await interaction.channel.send({
      content: '@everyone', // This line adds the @everyone mention
      embeds: [embed],
      components: [row],
      allowedMentions: { parse: ['everyone'] } // This ensures the mention is allowed
    });

    const filter = i => i.customId === 'session_link' && i.isButton();

    // Create a persistent interaction collector with no timeout
    const collector = message.createMessageComponentCollector({ filter });

    collector.on('collect', async i => {
      if (!i.member.roles.cache.has(staffRoleId)) {
        await i.reply({ content: 'You do not have permission to click on this button!', ephemeral: true });
      } else {
        await i.reply({ content: `**Session Link:** ${link}`, ephemeral: true });
      }
    });

    // The collector will now stay active indefinitely, and the button will remain functional 24/7.
  }
};
