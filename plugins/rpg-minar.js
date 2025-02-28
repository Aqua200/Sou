let cooldowns = {}

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) return;

    if (user.pickaxedurability <= 0) {
        return conn.reply(m.chat, '⚒️ Tu picota está rota. Repara o compra una nueva antes de seguir minando.', m);
    }

    let coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300]);
    let emerald = pickRandom([1, 5, 7, 8]);
    let iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30]);
    let gold = pickRandom([20, 5, 7, 8, 88, 40, 50]);
    let coal = pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100]);
    let stone = pickRandom([200, 500, 700, 800, 900, 4000, 300]);

    // Probabilidad de encontrar diamante
    let diamond = Math.random() < 0.05 ? pickRandom([1, 2, 3]) : 0; 

    let img = 'https://qu.ax/JguPr.jpg';
    let time = user.lastmiming + 600000;

    if (new Date() - user.lastmiming < 600000) {
        return conn.reply(m.chat, `⏳ Debes esperar ${msToTime(time - new Date())} para volver a minar.`, m);
    }

    let hasil = Math.floor(Math.random() * 1000);

    let info = `⛏️ *Te has adentrado en la cueva y encontraste:*\n\n` +
        `🔹 *Exp*: ${hasil}\n` +
        `💰 *${moneda}*: ${coin}\n` +
        `💎 *Esmeralda*: ${emerald}\n` +
        `🔩 *Hierro*: ${iron}\n` +
        `🏅 *Oro*: ${gold}\n` +
        `🪵 *Carbón*: ${coal}\n` +
        `🪨 *Piedra*: ${stone}\n` +
        `${diamond ? `💎 *Diamante*: ${diamond}\n` : ''}\n` +
        `⚒️ *Durabilidad restante de la picota*: ${user.pickaxedurability - 30}`;

    await conn.sendFile(m.chat, img, 'mineria.jpg', info, fkontak);
    await m.react('⛏️');

    user.health -= 50;
    user.pickaxedurability -= 30;
    user.coin += coin;
    user.iron += iron;
    user.gold += gold;
    user.emerald += emerald;
    user.coal += coal;
    user.stone += stone;
    user.diamond += diamond;
    user.lastmiming = new Date() * 1;

    if (user.pickaxedurability <= 20 && user.pickaxedurability > 0) {
        conn.reply(m.chat, '⚠️ Tu picota está a punto de romperse. Repara o compra una nueva.', m);
        await m.react('⚠️');
    }

    if (user.pickaxedurability <= 0) {
        conn.reply(m.chat, '❌ Tu picota se ha roto. Usa el comando *reparar* para arreglarla.', m);
    }
}

handler.help = ['minar'];
handler.tags = ['economy'];
handler.command = ['minar', 'miming', 'mine'];
handler.register = true;
handler.group = true;

export default handler;

// Función para seleccionar valores aleatorios
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// Función para convertir milisegundos a tiempo legible
function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return minutes + 'm y ' + seconds + 's';
}
