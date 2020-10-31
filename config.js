const fs = require("fs");
const os = require("os");
const { exec } = require("child_process");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

banner = `
╔════╦═══╦╗─╔═══╦══╗╔══╦╗─╔╗
╚═╗╔═╣╔══╣║─║╔══╣╔╗║║╔╗║╚═╝║
──║║─║╚══╣║─║╚══╣╚╝╚╣╚╝║╔╗─║
──║║─║╔══╣║─║╔══╣╔═╗║╔╗║║╚╗║
──║║─║╚══╣╚═╣╚══╣╚═╝║║║║║─║║
──╚╝─╚═══╩══╩═══╩═══╩╝╚╩╝─╚╝
created by @mitchel_ed | Channel - @debian_lab

`;

exec("clear", (error, stdout, stderr) => {
    if (error) {
        exec("cls");
    }
    if (stderr) {
        
    }
});
console.log(banner);

rl.question("Введите токен:", function (token) {
    let newObj = {
        "token": token
    };
    fs.writeFileSync("./config.json", JSON.stringify(newObj));
    rl.close();
});

rl.on("close", function () {
    console.log("\nНастройка завершена!");
    process.exit(0);
});