import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, `${emoji} El usuario no se encuentra en mi base de Datos.`, m);
    }
    
    let img = 'https://qu.ax/fRMNm.jpg';
    let user = global.db.data.users[who];
    let name = conn.getName(who);

    // Inicialización de los datos si no existen
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

    let premium = user.premium ? '✅' : '❌';

    let text = `╭━〔 Inventario de ${name} 〕⬣\n` +
               `┋ 💸 *${moneda} en Cartera:* ${user.coin}\n` +  
               `┋ 🏦 *${moneda} en Banco:* ${user.bank}\n` + 
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

    // Si 'fkontak' no está definido, define un objeto vacío
    let fkontak = {};

    await conn.sendFile(m.chat, img, 'yuki.jpg', text, fkontak);
}

handler.help = ['inventario', 'inv'];
handler.tags = ['rpg'];
handler.command = ['inventario', 'inv']; 
handler.group = true;
handler.register = true;

export default handler;
