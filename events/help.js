const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId === 'help_options') {
            await handleHelpDropdown(interaction);
        }
    },
};

async function handleHelpDropdown(interaction) {
    let embed;

    switch (interaction.values[0]) {
        case 'register_vehicle':
            embed = new EmbedBuilder()
                .setTitle('How can I Register my Vehicle?')
                .setDescription('To register your vehicle, use our Discord Bot and head over to the <#1264026498373783562> channel. You can register up to 8 vehicles if you’re a booster, and up to 3 vehicles as a regular user.')
                .setColor('#3498db');
            break;

        case 'join_swfl_session':
            embed = new EmbedBuilder()
                .setTitle('How do I join SWFL Session?')
                .setDescription('To join our Southwest Florida Roleplay sessions, watch for pings in <#1264026944299728906>. You can also use the reaction roles to set notifications for session pings.')
                .setColor('#3498db');
            break;

        case 'become_staff_ps_member':
            embed = new EmbedBuilder()
                .setTitle('How can I be a Staff or P/S Member?')
                .setDescription('To become a Staff or P/S Member, check out the <#1253579753621950546> channel and look for the applications available via dropdown.')
                .setColor('#3498db');
            break;

        default:
            embed = new EmbedBuilder()
                .setDescription('Unknown option selected.')
                .setColor('#ff0000');
            break;
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
}
