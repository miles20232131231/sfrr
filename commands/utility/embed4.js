const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed4')
        .setDescription('Send partnership requirements embed'),
    async execute(interaction) {
        const staffRoleId = '1237979199747129396'; // Replace with your actual staff role ID

        // Check if the user has the staff role
        if (!interaction.member.roles.cache.has(staffRoleId)) {
            await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            return;
        }

        // Define the embed
        const embed = new EmbedBuilder()
            .setTitle('Southwest Florida Roleplay Realm | Partnership Requirements')
            .setDescription(`> Welcome to our partnership channel where you can view our partnership requirements with our server! To partner with us, your server must meet the following criteria:\n\n- Must have 500+ members.\n
- Must be a professional server.\n
- Must have an active community.\n
- Must not have any negative history, such as raiding or NSFW content.\n\n
If your server meets these requirements, you can open a ticket to request a partnership. For servers with over 500 members:\n
- 600-700 members: We will ping @here.\n
- 1000+ members: We will ping @everyone.\n
- Exactly 500 members: We will not ping.`)
            .setColor('#3498db')
            .setFooter({
                text: 'Southwest Florida Roleplay Realm',
                iconURL: 'https://cdn.discordapp.com/attachments/1264010988244434965/1266156128278941839/SF_1.png?ex=66a41f49&is=66a2cdc9&hm=5b78c80187762d0579a0ef6b497a12dbfca3fc24ce8bfaba4ba839ea736fd498&'
            })
            .setTimestamp();

        // Acknowledge the interaction and respond with an ephemeral message
        await interaction.reply({ content: 'Partnership requirements sent!', ephemeral: true });

        // Send the embed to the channel
        await interaction.channel.send({ embeds: [embed] });
    }
};
