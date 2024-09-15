const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverperk')
        .setDescription('Displays server perks with a dropdown menu'),

    async execute(interaction) {
        const staffRoleId = '1279933324298817608'; // Replace with your actual staff role ID
        const member = interaction.member;

        // Check if the user has the staff role
        if (!member.roles.cache.has(staffRoleId)) {
            await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            return;
        }

        // Notify the user that server perks are being displayed
        await interaction.reply({ content: 'Displaying server perks...', ephemeral: true });

        const mainEmbed = new EmbedBuilder()
            .setTitle('SFRR | Server Perk')
            .setDescription('In this channel, you will be able to see what you have once you boost the server or buy it with Robux. Once you have boosted this server or bought it with Robux, make sure to open a ticket in the support channel to get the role and perks.')
            .setColor('#3498db');

        const menu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('server_perk_menu')
                    .setPlaceholder('Server Perk')
                    .addOptions([
                        {
                            label: 'Boost Perks',
                            description: 'View perks for boosting the server',
                            value: 'boost_perks',
                        },
                        {
                            label: 'Robux Perks',
                            description: 'View perks for purchasing with Robux',
                            value: 'robux_perks',
                        },
                    ]),
            );

        // Send the embed and dropdown menu to the channel
        await interaction.channel.send({ 
            embeds: [mainEmbed], 
            components: [menu]
        });

        const filter = i => i.customId === 'server_perk_menu'; // Allow everyone to interact

        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, time: 24 * 60 * 60 * 1000 }); // 24 hours

        collector.on('collect', async i => {
            if (i.values[0] === 'boost_perks') {
                const boostPerksEmbeds = [
                    new EmbedBuilder()
                        .setTitle('**__1-3 Perks__**')
                        .setDescription('If you boost this server 1-3 times, you will get the Server Boost role, Image Permission, Banned Vehicle Exempt, Early Access role, and 100k eco.')
                        .setColor('#3498db'),
                    new EmbedBuilder()
                        .setTitle('**__4+ Boost Perks__**')
                        .setDescription('If you boost 4+ times, you will get 1-3 benefits and the Ultra Banned Vehicle List role. You will also get 250k eco, and you will be able to register 7 cars.')
                        .setColor('#3498db')
                        .setFooter({
                            text: 'Southwest Florida Roleplay Realm',
                            iconURL: 'https://cdn.discordapp.com/attachments/1277470399952850998/1280234584994353175/Screenshot_2024-08-26_001821.png?ex=66d756de&is=66d6055e&hm=99f8a47df2df7792c7ebc6977d58f12c6aa4962c91b7517db084e30de7d6b1b4&'
                        }),
                ];
                await i.reply({ embeds: boostPerksEmbeds, ephemeral: true });
            } else if (i.values[0] === 'robux_perks') {
                await i.reply({ content: 'Coming Soon.', ephemeral: true });
            }
        });
    }
};
