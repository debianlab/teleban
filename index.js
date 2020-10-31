const TelegramBot = require("node-telegram-bot-api");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");
const readline = require("readline");

const TOKEN = require("./config.json").token;

const bot = new TelegramBot(TOKEN, { polling: true });
let file = "./ids.txt";


bot.onText(/\/start/, msg => {
    console.log(msg.chat.type);
    if (msg.chat.type === "private") {
        bot.sendMessage(msg.chat.id, `Здравствуй дорогой ${msg.chat.first_name}!\nДобавь меня в группу и я помогу тебе с ее администрированием!\nЯ - самый лучший бот на рынке🎨`)
    } else {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.telegram.org/bot${TOKEN}/getChatAdministrators?chat_id=${msg.chat.id}`, true);
        xhr.send();
        bot.getChatAdministrators(msg.chat.id).then(res => {
            console.log(res);
            let admins = res;
            let areBotAdmin = false;
            for (let admin of admins) {
                if (admin.user.is_bot === true && admin.can_restrict_members === true && admin.can_promote_members === true) {
                    areBotAdmin = true;
                    break;
                };
            };
            if (areBotAdmin === false) {
                bot.sendMessage(msg.chat.id, `Сделайте меня администратором и выдайте права на:\n1. Удаление участников\n2. Назначение администраторов\n3. Удаление собщений\nИначе я не смогу Вам помогать =(`)
            } else {
                let rl = readline.createInterface({
                    input: fs.createReadStream(file),
                    output: process.stdout,
                    terminal: false
                });
                rl.on('line', function (member) {
                    try {
                        bot.kickChatMember(msg.chat.id, member) // print the content of the line on each linebreak
                    } catch {

                    }
                });
            };

        }).catch(err => {
            console.log("err");

        })
    }

})

bot.on("polling_error", err => {
    console.error("Поменяйте Токен для лучшего отрабатывания!")
})