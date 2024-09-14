const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Adds two numbers')
    .addNumberOption(option => 
      option.setName('first-number')
        .setDescription('The first number')
        .setRequired(true))
    .addNumberOption(option => 
      option.setName('second-number')
        .setDescription('The second number')
        .setRequired(true)),
  async execute(interaction) {
    const firstNumber = interaction.options.getNumber('first-number');
    const secondNumber = interaction.options.getNumber('second-number');
    const result = firstNumber + secondNumber;

    await interaction.reply(`The result is: ${result}`);
  },
};