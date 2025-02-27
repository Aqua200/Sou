import { canLevelUp, xpRange } from '../lib/levelling.js';
import db from '../lib/database.js';

let handler = async (m, { conn }) => {
    try {
        let mentionedUser = m.mentionedJid?.[0];
        let citedMessage = m.quoted ? m.quoted.sender : null;
        let who = mentionedUser || citedMessage || m.sender; 
        let name = conn.getName(who) || 'Usuario';
        let user = global.db.data.users[who];

        if (!user) {
            await conn.sendMessage(m.chat, { text: "No se encontraron datos del usuario." }, { quoted: m });
            return;
        }

        let { min, xp } = xpRange(user.level, global.multiplier);
        let before = user.level;
        
        while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;

        if (before !== user.level) {
            let txt = `🎉 ¡Felicidades ${name}! Has subido de nivel ❀\n\n`; 
            txt += `*${before}* ➔ *${user.level}* [ ${user.role} ]\n\n`;
            txt += `📅 *Fecha* : ${new Date().toLocaleString('es-ES')}\n\n`;
            txt += `✨ Cuanto más interactúes, más rápido subirás de nivel.`;

            await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
        } else {
            let users = Object.entries(global.db.data.users)
                .map(([key, value]) => ({ ...value, jid: key }))
                .sort((a, b) => (b.level || 0) - (a.level || 0));

            let rank = users.findIndex(u => u.jid === who) + 1;

            let progress = Math.floor(((user.exp - min) / xp) * 10);
            let bar = '█'.repeat(progress) + '▁'.repeat(10 - progress);

            let txt = `🌸 *Usuario:* ${name}\n\n`;
            txt += `✦ Nivel » *${user.level}*\n`;
            txt += `✰ Experiencia » *${user.exp}*\n`;
            txt += `❖ Rango » ${user.role}\n`;
            txt += `➨ Progreso » *${bar}* _(${Math.floor(((user.exp - min) / xp) * 100)}%)_\n`;
            txt += `🏆 Puesto » *${rank}* de *${users.length}*\n`;
            txt += `🔹 Comandos usados » *${user.commands || 0}*`;

            await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
        }
    } catch (e) {
        console.error(e);
        await conn.sendMessage(m.chat, { text: "⚠️ Error al procesar el comando." }, { quoted: m });
    }
};

handler.help = ['levelup', 'lvl @user'];
handler.tags = ['rpg'];
handler.command = ['nivel', 'lvl', 'level', 'levelup'];
handler.register = true;
handler.group = true;

export default handler;
