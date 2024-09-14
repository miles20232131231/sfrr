const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed2')
        .setDescription('Send server information embeds with a dropdown menu'),

    async execute(interaction) {
        // Check if the user has the 'Staff' role
        const staffRoleId = '1277475295372513385'; // Replace with your actual staff role ID
        const member = interaction.member;

        if (!member.roles.cache.has(staffRoleId)) {
            await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            return;
        }

        // Define the server information embeds
        const embeds = [
            new EmbedBuilder()
                .setTitle('**Server Information**')
                .setDescription('In this channel, you can find all the necessary information for our sessions and server within this channel. Such as peacetime, rules, session information, and more.')
                .setColor('#3498db'),

            new EmbedBuilder()
                .setTitle('Rule 1: Promotion')
                .setDescription('Promoting your server within our general community is highly prohibited. If you are caught doing so you will be banned from this server.')
                .setColor('#3498db'),

            new EmbedBuilder()
                .setTitle('Rule 2: NSFW')
                .setDescription('Sending any NSFW in our general channels is highly prohibited. If you are caught doing this you will be banned from our server permanently.')
                .setColor('#3498db'),

            new EmbedBuilder()
                .setTitle('Rule 3: Drama')
                .setDescription('Starting any sort of drama is prohibited. If you are caught you will face consequences.')
                .setColor('#3498db'),

            new EmbedBuilder()
                .setTitle('Rule 4: Respect')
                .setDescription('Make sure to respect all of the civilians, staff, or anyone who is in this server. If you are caught not respecting a civilian, you will face consequences.')
                .setColor('#3498db'),

            new EmbedBuilder()
                .setTitle('Rule 5: Racism')
                .setDescription('Racism is strictly prohibited and will result in severe consequences.')
                .setColor('#3498db')
                .setFooter({ text: 'Southwest Florida Roleplay Realm', iconURL: 'https://cdn.discordapp.com/attachments/1253579753621950546/1275172575626133515/image.png?ex=66c4ec81&is=66c39b01&hm=d8f361bbe49665e2fbfce417032b81f774bd29def123b7190066e0379149c50c&' }),
        ];

        const embedRoleplay = new EmbedBuilder()
            .setTitle('**Roleplay Information**')
            .setDescription('As a member of SFRR, it\'s important to read and understand this channel before joining any sessions our staff hosts.')
            .setColor('#3498db');

        const embedRules = [
            new EmbedBuilder()
                .setTitle('**Rule 1: Combat Logging**')
                .setDescription('Combat logging is highly prohibited. Such as leaving the game to avoid punishment from staff members or law enforcement. If you are caught doing this you will be facing a high consequence.')
                .setColor('#3498db'),

            new EmbedBuilder()
                .setTitle('**Rule 2: Voiding Scenes**')
                .setDescription('Voiding a scene without staff permission is prohibited. Such as if you are in a crash, then staff shows up and you just start driving away from the scene without the staff\'s permission. If you are caught doing this you will face consequences. (Only staff can void scenes)')
                .setColor('#3498db'),

            new EmbedBuilder()
                .setTitle('**Rule 3: Excessive Honking**')
                .setDescription('You will be kicked if you are caught abusing your car\'s horn. Any honking that is longer than 5 seconds will result in consequences.')
                .setColor('#3498db'),

            new EmbedBuilder()
                .setTitle('**Rule 4: Following the speed limit**')
                .setDescription('You should be following the speed limit at all times. There is no reason for you to be going over the speed limit. If you are caught doing this you will be pulled over by a law enforcement officer.')
                .setColor('#3498db'),

            new EmbedBuilder()
                .setTitle('**Rule 5: Yielding for law enforcement**')
                .setDescription('You must yield to law enforcement if they have their lights and sirens on. There is no reason for you to not yield to law enforcement, If you are caught not doing this you will be kicked from the session.')
                .setColor('#3498db'),

            new EmbedBuilder()
                .setTitle('**Rule 6: Peacetime Information**')
                .setDescription('**Normal Peacetime:**\n> Do not go over 80 MPH.\n> Do not rob any places/be on the criminal team.\n> Do not run any red lights.\n> Do not run from Staff or law enforcement.\n\n**Strict Peacetime:**\n> Do not go over 70 MPH.\n> Do not go off-roading.\n> Do not run any red lights.\n> Do not run from Staff or Law Enforcement\n> Do not drift or do any donuts.\n> Do not rob any places/do not be on the criminal team.\n> Do not drive terribly\n\n**Peacetime Off:**\n> You can go 85+ MPH\n> You can rob stores\n> You can drift\n> You can run from Law Enforcement')
                .setColor('#3498db')
                .setFooter({ text: 'Southwest Florida Roleplay Realm', iconURL: 'https://cdn.discordapp.com/attachments/1253579753621950546/1275172575626133515/image.png?ex=66c4ec81&is=66c39b01&hm=d8f361bbe49665e2fbfce417032b81f774bd29def123b7190066e0379149c50c&' }),
        ];

        // Define the dropdown menu
        const menu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('more_information')
                    .setPlaceholder('More Information:')
                    .addOptions([
                        {
                            label: 'Roleplay Information',
                            description: 'This is our roleplay information that you will need when you join one of our sessions.',
                            value: 'roleplay_information',
                        },
                        {
                            label: 'Banned Vehicle List',
                            description: 'You will be able to see our Banned Vehicle List.',
                            value: 'banned_vehicle_list',
                        },
                    ]),
            );

        // Create the banned vehicle list button
        const bannedVehicleButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('View Banned Vehicle List')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://docs.google.com/document/d/1MaE7Owc7_lodumohkmZI2NrFyqIt9oT8TNGIOarOXuo/edit?usp=sharing')
            );

        // Acknowledge the interaction and respond with an ephemeral message
        await interaction.reply({ content: 'Information Command Executed!', ephemeral: true });

        // Send the main embeds with the dropdown menu
        const message = await interaction.channel.send({ 
            embeds: embeds,
            components: [menu],
        });

        // Interaction collector for the dropdown menu
        const collector = message.createMessageComponentCollector({ componentType: ComponentType.StringSelect });

        collector.on('collect', async i => {
            if (i.customId === 'more_information') {
                if (i.values[0] === 'roleplay_information') {
                    await i.reply({ embeds: embedRules, ephemeral: true });
                } else if (i.values[0] === 'banned_vehicle_list') {
                    await i.reply({ components: [bannedVehicleButton], ephemeral: true });
                }
            }
        });

        // Disable logging for interaction collection end
        collector.on('end', () => {
            // No logging or actions on end
        });
    }
};
