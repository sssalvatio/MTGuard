var mineflayer = require("mineflayer");
var D = require("discord.js");
var client = new D.Client();
var config = require("./config.json");

const antiAfk = require('mineflayer-antiafk')
const armorManager = require('mineflayer-armor-manager')
const autoEat = require('mineflayer-auto-eat')


var chalk = require("chalk");


let prefix = config.prefix;
let color = "#RANDOM";
let ip = config.ip;
let port = config.port;
let username = config.username;
if (config.password = false){
var bot = mineflayer.createBot({
    host: ip,
    port: port,
    username: username,
})
} else {
let pass = config.password;

    var bot = mineflayer.createBot({
        host: ip,
        port: port,
        username: username,
        password: config.password
    })
}

bot.on('login', async() => {
  bot.chat("Hi! I'm MoneyTreesGuard! please contact @18sx on discord if you have problems on the server or want to give a good feedback!")
})

// ========================
// MINECRAFT BOT ACTIVITY
// ========================

function lookAtNearestPlayer () {
  const playerFilter = (entity) => entity.type === 'player'
  const playerEntity = bot.nearestEntity(playerFilter)
  
  if (!playerEntity) return
  
  const pos = playerEntity.position.offset(0, playerEntity.height, 0)
  bot.lookAt(pos)
}

bot.loadPlugin(armorManager)
bot.loadPlugin(autoEat)
bot.loadPlugin(antiAfk)

bot.on('joined the game', async() => {
  bot.chat("Welcome!")
})

bot.on('spawn', () => {
  bot.afk.setOptions({ fishing: false });
  bot.afk.start();
})

bot.on('spawn', () => {
  bot.afk.setOptions({ jumpWalk: true });
  bot.afk.start();
})

// =========================
// SET ACTIVITY BOT
// =========================
client.on('ready', activity => {
    client.user.setStatus(`idle`)
    client.user.setActivity(
      `${ip} Servers.`, {
        type: "WATCHING"
      }
    )
  });

client.on('ready', async() => {
    console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
    console.log(chalk.magenta(`Client is Online. Loggined as ${client.user.tag}`))
    console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
    console.log()
})

bot.on('login', async() => {
    console.log(chalk.blue('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
    console.log(chalk.magenta(`Bot is Online on ${ip}`))
    console.log(chalk.red('=-()-=-=()=--=()=--=()=--=()=--=()=-()-=-=()=--=()=--=()=--=()=--=()'))
    console.log()
})

function lookAtNearestPlayer () {
  const playerFilter = (entity) => entity.type === 'player'
  const playerEntity = bot.nearestEntity(playerFilter)
  
  if (!playerEntity) return
  
  const pos = playerEntity.position.offset(0, playerEntity.height, 0)
  bot.lookAt(pos)
}

client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return
    let args = msg.content.split(" ").slice(1)
    args = msg.content.slice(prefix.length).split(/ +/);
    let command = msg.content.split(" ")[0];
    command = command.slice(prefix.length);
    command = args.shift().toLowerCase();
      
    if (command == "say") {
      const chat = args.join(" ")
      bot.chat(chat)
      const success = new D.MessageEmbed()
        .setDescription(`:white_check_mark: ${msg.author.tag} sent \`${chat}\``)
        .setColor(color)
      msg.channel.send(success)
    }
    
    if (command == "forward") {
      bot.setControlState('forward', true)
      const MoForw = new D.MessageEmbed()
          .setDescription(`:white_check_mark: Im Moving forward To Stop Do m!stop`)
          .setColor(color)
      msg.channel.send(MoForw)
    }else if (command  == "backward") {
      bot.setControlState('back', true)
      const MoBackw = new D.MessageEmbed()
          .setDescription(`:white_check_mark: Im Moving backward To Stop Do m!stop`)
          .setColor(color)
      msg.channel.send(MoBackw)
    }else if (command  == "stop") {
      bot.clearControlStates()
      const MoStop = new D.MessageEmbed()
          .setDescription(`:white_check_mark: Stopped!`)
          .setColor(color)
      msg.channel.send(MoStop)
    }else if (command  == "right") {
      bot.setControlState('rightt', true)
      const MoLeft = new D.MessageEmbed()
          .setDescription(`:white_check_mark: Im Moving left To Stop Do m!stop`)
          .setColor(color)
      msg.channel.send(MoLeft)
    }else if (command  == "left") {
      bot.setControlState('left', true)
      const MoRight = new D.MessageEmbed()
          .setDescription(`:white_check_mark: Im Moving Right To Stop Do m!stop`)
          .setColor(color)
      msg.channel.send(MoRight)
    } else if (command == "help") {
        const help = new D.MessageEmbed()
          .setTitle(`Help`)
          .addField(` ${prefix}say (Chat) `, 'To Get The bot say what you want')
          .addField(` ${prefix}movement `, 'Look At Movement command')
          .setColor(color)
        msg.channel.send(help)
    } else if (command == "") {
        const movement = new D.MessageEmbed()
        .setTitle(`Movement Command List`)
        .addField(` ${prefix}forward `, 'To make the bot Move Forward')
        .addField(` ${prefix}backward `, 'To make the bot Move Backward')
        .addField(` ${prefix}Left `, 'To make the bot Move Left')
        .addField(` ${prefix}right `, 'To make the bot Move Right')
        .setColor(color)
    msg.channel.send(movement)
    }
})

bot.on('kicked', async() => {
  console.log(chalk.red(`Bot has been KICKED`))
})

bot.on('error', async() => {
  console.log(chalk.red(`There's an error, check the minecraft server or the ip and port again.`))
})

bot.on("message", message => {
    let channel = client.channels.cache.get('913685864624832512')
    if (!channel) return;
    channel.send(`From server chat > ${message}`, {disableMentions: 'all'})
})

client.login(config.Dtoken)
.catch(error => {
    console.log()
    console.log(chalk.red ('Discord Bot Cannot Login'));
    console.log()
})