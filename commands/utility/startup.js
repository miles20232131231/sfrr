const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup')
        .setDescription('Send session startup information embeds')
        .addStringOption(option =>
            option.setName('reactions')
                .setDescription('Number of reactions needed for the session to start')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles), // Only staff can execute this command

    async execute(interaction) {
        const staffRoleId = '1279933324298817608'; // Staff role ID

        if (!interaction.member.roles.cache.has(staffRoleId)) {
            await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            return;
        }

        const optionReactions = interaction.options.getString('reactions');

        const embed = new EmbedBuilder()
            .setTitle('Southwest Florida Roleplay Realm | Session Startup!')
            .setDescription(`> Please ensure you have read our server information located in the information channel & make sure to register your vehicle in the channel bot commands by using the /register command before joining.\n\n> For this session to commence, the host needs ${optionReactions} reactions.`)
            .setColor('#3498db')
            .setImage('https://cdn.discordapp.com/attachments/893617400321290311/1265137151335731221/image.png')
            .setFooter({
                text: 'Southwest Florida Roleplay Realm',
                iconURL: 'https://cdn.discordapp.com/attachments/1264762831153266689/1264788578056142939/Screenshot_2024-07-21_203740.png'
            })
            
        // Send a reply that only the user can see
        await interaction.reply({ content: 'Startup Command Executed.', ephemeral: true });
        
        // Send the actual embed to the channel with the @everyone mention on top
        await interaction.channel.send({ content: '@everyone', embeds: [embed] });

        // Log the command execution as an embed
        const logChannelId = '1279642823951646760'; // Replace with your log channel ID
        const logChannel = interaction.guild.channels.cache.get(logChannelId);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setTitle('Command Executed')
                .setDescription(`The \`/startup\` command was executed.`)
                .addFields(
                    { name: 'Executed by', value: `${interaction.user.tag}`, inline: true },
                    { name: 'User ID', value: `${interaction.user.id}`, inline: true },
                    { name: 'Channel', value: `${interaction.channel.name}`, inline: true },
                    { name: 'Reactions Required', value: `${optionReactions}`, inline: false },
                )
                .setColor('#f1c40f')
                .setTimestamp();

            logChannel.send({ embeds: [logEmbed] });
        }
    }
};
