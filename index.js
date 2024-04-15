const tmi = require('tmi.js');

const opts = {
  identity: {
    username: 'TWITCH-NICKNAME-HERE',
    password: 'OAUTH-HERE'
  },
  channels: ['zhynks', 'laaawer', 'cellbit']
};

const client = new tmi.Client(opts);

client.connect();

let startTime;

// Seu nome de usuário na Twitch
const yourUsername = 'SEU.NICKNAME';

client.on('connected', (address, port) => {
  console.log(`Bot da Twitch conectado em ${address}:${port}`);
  startTime = new Date();
});

client.on('message', handleMessage);

// Função para lidar com as mensagens recebidas
function handleMessage(channel, tags, message, self) {
  if (self) return;
  
  handleCommands(channel, tags, message);
}

// Fazer comandos para o bot
function handleCommands(channel, tags, message) {
  var isLawer = tags.username.toLowerCase() === yourUsername.toLowerCase()
  
  if (message.toLowerCase() === '>uptime') {
    const uptime = getUptime();
    client.say(channel, `/me que eu estou ativo há ${uptime}`);
  } 
  if (message.toLowerCase() === '>felps') {
    client.say(channel, `/me que o Felps é um bobão`);
  } 
  if (message.toLowerCase() === '>verdades') {
    client.say(channel, `/me que Roberto Carlos foi trocado`);
  } 
  if (message.toLowerCase() === '!foda') {
    client.say(channel, `@${tags.username}, kkkkkkkkkkkkkkkkkkkk`);
  } 
  if (message.toLowerCase() === '>clima') {
    client.say(channel, `/me que é só olhar pela janela porra kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk`);
  } 

  // COMANDOS SÓ PRO DONO
  if (message.toLowerCase() === '>teste' && isLawer) {
    client.say(channel, `/me que só o dono pode mandar esse comando bem foda e bem épico`);
  } 
  if (message.toLowerCase().startsWith(">msg") && isLawer) {
    client.say(channel, `/me ${message.slice(5)}`);
  }

  // COMANDOS DE MODS
  if (message.toLowerCase().startsWith(">mod") && tags.mod == true) {
    client.say(channel, `/me que esse usuário é um mod safado`);
  }

  //COMANDOS EXTRAS
  if (message.toLowerCase() === '>tags') {
    console.log(tags)
  }
  if (tags['message-type'] === 'chat' && tags['user-type'] !== 'mod' && !tags['subscriber'] && !tags['turbo']) {
    console.log(`${tags.username} é um returning-chatter!`);
  } 
}

// Função para obter o tempo de atividade do bot
function getUptime() {
  const currentTime = new Date();
  const uptime = currentTime - startTime;
  return formatTime(uptime);
}

// Função para formatar o tempo em horas, minutos e segundos em português
function formatTime(time) {
  const segundos = Math.floor((time / 1000) % 60);
  const minutos = Math.floor((time / (1000 * 60)) % 60);
  const horas = Math.floor((time / (1000 * 60 * 60)) % 24);
  const dias = Math.floor(time / (1000 * 60 * 60 * 24));

  let formattedTime = '';
  if (dias > 0) {
    formattedTime += `${dias} dia${dias > 1 ? 's' : ''}, `;
  }
  if (horas > 0) {
    formattedTime += `${horas} hora${horas > 1 ? 's' : ''}, `;
  }
  if (minutos > 0) {
    formattedTime += `${minutos} minuto${minutos > 1 ? 's' : ''}, `;
  }
  formattedTime += `${segundos} segundo${segundos > 1 ? 's' : ''}`;	

  return formattedTime;
}
