const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('This will display our help information.'),

    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setTitle('Server Help')
            .setDescription('Welcome to our Server Help command! Use the dropdown below to view FAQs.\n\nIf your question is not answered, feel free to create a ticket for further assistance.')
            .setColor('#3498db');

        const menu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('help_options')
                    .setPlaceholder('Click here for options.')
                    .addOptions([
                        {
                            label: 'How can I Register my Vehicle?',
                            description: 'This will show how you can register your vehicle.',
                            value: 'register_vehicle',
                        },
                        {
                            label: 'How do I join SWFL Session?',
                            description: 'This will show how you can join a Southwest Florida Session.',
                            value: 'join_swfl_session',
                        },
                        {
                            label: 'How can I be a Staff or P/S Member?',
                            description: 'This will show how you can become a Staff or a P/S member.',
                            value: 'become_staff_ps_member',
                        },
                    ]),
            );

        await interaction.reply({
            embeds: [helpEmbed],
            components: [menu],
            ephemeral: true
        });
    }
};
