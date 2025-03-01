import { showStore, buyWaifu } from './tienda.js';

let cooldowns = {};
let purchasedWaifus = {};  // Mantener un registro de las waifus compradas

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) return;

    // Comando para ver la tienda de waifus
    if (m.text.startsWith('#tienda')) {
        let storeInfo = showStore();
        return conn.reply(m.chat, storeInfo, m);
    }

    // Comando para ver la ayuda
    if (m.text.startsWith('#help')) {
        let helpText = 'Comandos disponibles:\n';
        helpText += '#tienda - Ver la tienda de waifus\n';
        helpText += '#comprar waifu <número> - Comprar una waifu\n';
        helpText += '#minar - Minar recursos y obtener yenes\n';
        helpText += '#miming - Minar recursos\n';

        return conn.reply(m.chat, helpText, m);
    }

    // Comando para comprar una waifu
    if (m.text.toLowerCase().startsWith('#comprar waifu')) {
        let args = m.text.split(' ');
        let waifuIndex = parseInt(args[2]) - 1;

        if (isNaN(waifuIndex) || waifuIndex < 0 || waifuIndex >= 5) {
            return conn.reply(m.chat, '❌ *Selecciona un número válido de la tienda.*', m);
        }

        let purchaseMessage = buyWaifu(user, waifuIndex, purchasedWaifus);
        return conn.reply(m.chat, purchaseMessage, m);
    }

    // Aquí puedes mantener el código para minería, etc.
}

handler.help = ['minar', 'tienda', 'comprar waifu'];
handler.tags = ['economy'];
handler.command = ['minar', 'miming', 'mine'];
handler.register = true;
handler.group = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return minutes + ' m y ' + seconds + ' s ';
}
