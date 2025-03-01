import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, `${emoji} El usuario no se encuentra en mi base de Datos.`, m);
    }
    
    let img = 'https://qu.ax/fRMNm.jpg';  // Imagen de ejemplo
    let user = global.db.data.users[who];
    let name = conn.getName(who);

    // Sección de waifus
    let waifus = user.waifus && user.waifus.length > 0 ? user.waifus.join(', ') : 'No tienes waifus.';

    let text = `╭━〔 Inventario de Waifus de ${name} 〕⬣\n` +
               `┋ 💸 *${moneda} en Cartera:* ${user.coin || 0}\n` +  
               `┋ 💖 *Waifus:* ${waifus}\n` +  // Solo se muestra waifus
               `┋ ⚜️ *Premium:* ${user.premium ? '✅' : '❌'}\n` + 
               `┋ 📅 *Fecha:* ${new Date().toLocaleString('id-ID')}\n` +
               `╰━━━━━━━━━━━━⬣`;

    await conn.sendFile(m.chat, img, 'waifu.jpg', text, fkontak);
}

handler.help = ['inventario', 'inv'];
handler.tags = ['rpg'];
handler.command = ['inventario', 'inv']; 
handler.group = true;
handler.register = true;

export default handler;
