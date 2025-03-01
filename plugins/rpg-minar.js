let cooldowns = {}

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) return;

    // Lista de waifus con sus bonos, nombres y URLs separadas
    const waifus = [
        { name: 'Saber', bonus: 50, img: 'https://example.com/saber.jpg', price: 1000 },
        { name: 'Asuna', bonus: 40, img: 'https://example.com/asuna.jpg', price: 800 },
        { name: 'Miku', bonus: 30, img: 'https://example.com/miku.jpg', price: 600 },
        { name: 'Hinata', bonus: 60, img: 'https://example.com/hinata.jpg', price: 1200 },
        { name: 'Rem', bonus: 70, img: 'https://example.com/rem.jpg', price: 1500 }
    ];

    // Comando para ver la tienda de waifus
    if (m.text.toLowerCase().includes('tienda waifus')) {
        let storeInfo = '🛒 *Tienda de Waifus*\n\n';
        waifus.forEach((waifu, i) => {
            storeInfo += `${i + 1}. ${waifu.name} - 💸 ${waifu.price} yenes\n`;
        });
        storeInfo += `\n💬 *Para comprar una waifu, usa el comando:* \`comprar waifu <número>\``;

        return conn.reply(m.chat, storeInfo, m);
    }

    // Comando para comprar una waifu
    if (m.text.toLowerCase().startsWith('comprar waifu')) {
        let args = m.text.split(' ');
        let waifuIndex = parseInt(args[2]) - 1;

        if (isNaN(waifuIndex) || waifuIndex < 0 || waifuIndex >= waifus.length) {
            return conn.reply(m.chat, '❌ *Selecciona un número válido de la tienda.*', m);
        }

        let selectedWaifu = waifus[waifuIndex];

        if (user.coin < selectedWaifu.price) {
            return conn.reply(m.chat, `❌ *No tienes suficientes yenes para comprar a ${selectedWaifu.name}.*`, m);
        }

        // Realizar la compra
        user.coin -= selectedWaifu.price;
        user.waifu = selectedWaifu.name;
        user.waifuBonus = selectedWaifu.bonus;

        return conn.reply(m.chat, `✅ *Has comprado a ${selectedWaifu.name} por ${selectedWaifu.price} yenes.*\n` +
            `✨ *Bono de waifu*: ${selectedWaifu.bonus} yenes.\n` +
            `💖 *Ahora tienes a tu waifu*: ${selectedWaifu.name}\n` +
            `📸 *Imagen de waifu*: ${selectedWaifu.img}`, m);
    }

    // Proceso de minería con waifu
    let coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300]);
    let materialValue = pickRandom([5, 10, 15, 20, 25]);  // Valor de materiales convertidos a yenes

    let totalYen = coin + materialValue + (user.waifuBonus || 0); // Agregar bono de waifu si se tiene

    let img = 'https://qu.ax/JguPr.jpg';
    let time = user.lastmiming + 600000;

    if (new Date() - user.lastmiming < 600000) {
        return conn.reply(m.chat, `${emoji3} Debes esperar ${msToTime(time - new Date())} para volver a minar.`, m);
    }

    let hasil = Math.floor(Math.random() * 1000);
    let info = `⛏️ *Te has adentrando en lo profundo de las cuevas*\n\n` +
        `> *🍬 Obtuviste estos recursos*\n\n` +
        `✨ *Exp*: ${hasil}\n` +
        `💸 *Yenes*: ${totalYen}\n`;

    await conn.sendFile(m.chat, img, 'yuki.jpg', info, fkontak);
    await m.react('⛏️');

    user.health -= 50;
    user.pickaxedurability -= 30;
    user.coin += totalYen; // Solo yenes sumados
    user.lastmiming = new Date() * 1;
}

handler.help = ['minar', 'tienda waifus', 'comprar waifu'];
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
