const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed1')
        .setDescription('Send startup information embeds')
        .addStringOption(option => 
            option.setName('server_startup')
                .setDescription('Server startup information')
                .setRequired(true)),

    async execute(interaction) {
        const serverStartup = interaction.options.getString('server_startup');

        const embed1 = new EmbedBuilder()
            .setTitle(`Southwest Florida Roleplay Realm | ${serverStartup}`) // Use backticks for template literals
            .setDescription(`> Welcome to our ${serverStartup} channel. Within this channel, our staff team will host sessions you can join and enjoy!\n\n> Please avoid pinging, or asking our staff team to host or do re-invites. If you are caught doing this, you will face a mute/warning. This also goes with re-invites. Our staff team will host sessions and do re-invites when they have time.`)
            .setColor('#3498db')

        const embed2 = new EmbedBuilder()
            .setTitle('__**Startup Information**__')
            .setDescription(`* Leaking links that our hosts release to people who aren't on our server, a ban from this server is highly prohibited.\n\n* Asking for re-invites, pinging, or pinging our staff members is prohibited. Our staff team will host when they have the time.\n\n* Session cooldown is 30 minutes, Meaning if one of our hosts ends a session they would have to wait 30 minutes to host again.\n\n> To view our Banned Vehicle List you can click the button called "information" After that you can scroll down and click on the drop menu. Once you have clicked that you can find something called "Banned Vehicle List" Then you click on that. Once you have clicked on it you will be able to have access to our banned vehicle list.`)
            .setColor('#3498db')
            .setFooter({
                text: 'Southwest Florida Roleplay Realm',
                iconURL: 'https://cdn.discordapp.com/attachments/1264010988244434965/1266156128278941839/SF_1.png?ex=66a41f49&is=66a2cdc9&hm=5b78c80187762d0579a0ef6b497a12dbfca3fc24ce8bfaba4ba839ea736fd498&'
            });

        // Send a reply that only the user can see
        await interaction.reply({ content: 'Sending the startup information embeds...', ephemeral: true });
        
        // Send the actual embeds to the channel
        await interaction.channel.send({ embeds: [embed1, embed2] });
    }
};
