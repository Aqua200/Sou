import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
    // Verifica si 'm.mentionedJid' está vacío
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    // Verifica si el usuario existe en la base de datos
    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, 'El usuario no se encuentra en mi base de datos.', m);
    }

    // Verifica si la propiedad 'coin' y otras existen en el usuario
    let user = global.db.data.users[who];
    user.coin = user.coin || 0;
    user.bank = user.bank || 0;
    user.emerald = user.emerald || 0;
    user.iron = user.iron || 0;
    user.gold = user.gold || 0;
    user.coal = user.coal || 0;
    user.stone = user.stone || 0;
    user.exp = user.exp || 0;
    user.health = user.health || 100;
    user.diamond = user.diamond || 0;
    user.candies = user.candies || 0;
    user.gifts = user.gifts || 0;
    user.joincount = user.joincount || 0;
    user.premium = user.premium || false;
    user.lastAdventure = user.lastAdventure || null;

    // Prepara los datos
    let name = conn.getName(who);
    let premium = user.premium ? '✅' : '❌';
    let text = `╭━〔 Inventario de ${name} 〕⬣\n` +
               `┋ 💸 *Moneda en Cartera:* ${user.coin}\n` +  
               `┋ 🏦 *Moneda en Banco:* ${user.bank}\n` + 
               `┋ ♦️ *Esmeraldas:* ${user.emerald}\n` + 
               `┋ 🔩 *Hierro:* ${user.iron}\n` +  
               `┋ 🏅 *Oro:* ${user.gold}\n` + 
               `┋ 🕋 *Carbón:* ${user.coal}\n` +  
               `┋ 🪨 *Piedra:* ${user.stone}\n` +  
               `┋ ✨ *Experiencia:* ${user.exp}\n` + 
               `┋ ❤️ *Salud:* ${user.health}\n` + 
               `┋ 💎 *Diamantes:* ${user.diamond}\n` +   
               `┋ 🍬 *Dulces:* ${user.candies}\n` + 
               `┋ 🎁 *Regalos:* ${user.gifts}\n` + 
               `┋ 🎟️ *Tokens:* ${user.joincount}\n` +  
               `┋ ⚜️ *Premium:* ${premium}\n` + 
               `┋ ⏳ *Última Aventura:* ${user.lastAdventure ? moment(user.lastAdventure).fromNow() : 'Nunca'}\n` + 
               `┋ 📅 *Fecha:* ${new Date().toLocaleString('id-ID')}\n` +
               `╰━━━━━━━━━━━━⬣`;

    // Imagen que se enviará
    let img = 'https://qu.ax/fRMNm.jpg';

    // Envía el mensaje con la imagen
    try {
        await conn.sendFile(m.chat, img, 'yuki.jpg', text, m);
    } catch (error) {
        console.error("Error al enviar el archivo:", error);
        conn.reply(m.chat, 'Hubo un error al intentar mostrar el inventario.', m);
    }
}

handler.help = ['inventario', 'inv'];
handler.tags = ['rpg'];
handler.command = ['inventario', 'inv']; 
handler.group = true;

export default handler;
