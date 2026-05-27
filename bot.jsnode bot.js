const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('8847952898:AAEp27-MOgmaL1eFMBZSIzgQ3lUdl_mSbX4');

bot.start((ctx) => {
    const username = ctx.from.username || ctx.from.first_name;

    ctx.reply(
        `@${username} Welcome to the OwlEscrow group: Are you a buyer or a seller?`,
        Markup.inlineKeyboard([
            [
                Markup.button.callback('Buyer', 'buyer'),
                Markup.button.callback('Seller', 'seller')
            ]
        ])
    );
});

bot.action('buyer', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('You selected: Buyer');
});

bot.action('seller', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('You selected: Seller');
});

bot.launch();

console.log('Bot Online');
