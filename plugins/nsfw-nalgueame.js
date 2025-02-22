import fs from 'fs';
import path from 'path';
import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, usedPrefix }) => {
    // Verificar si el comando está permitido en el grupo
    if (!db.data.chats[m.chat].nsfw && m.isGroup) return m.reply('💔 *¡Lo siento estos comandos están desactivados! nsfw*');

    // Obtener las menciones del mensaje
    let mentionedUsers = m.mentionedJid;
    if (mentionedUsers.length < 2) throw 'Debes mencionar a dos usuarios: uno que solicita y otro que realiza la acción.';

    // Obtener los nombres de los usuarios mencionados
    let user1 = conn.getName(mentionedUsers[0]);
    let user2 = conn.getName(mentionedUsers[1]);

    await conn.sendMessage(m.chat, { react: { text: '🍑', key: m.key } });

    let str = ``${{user1} quiere ser nalgueado por}$`{user2} 🍑`.trim();

    if (m.isGroup) {
        // Directorio que contiene los videos
        let pp = 'https://telegra.ph/file/d4b85856b2685b5013a8a.mp4';
        let pp2 = 'https://telegra.ph/file/e278ca6dc7d26a2cfda46.mp4';
        let pp3 = 'https://telegra.ph/file/f830f235f844e30d22e8e.mp4';
        let pp4 = 'https://telegra.ph/file/07fe0023525be2b2579f9.mp4';
        let pp5 = 'https://telegra.ph/file/99e036ac43a09e044a223.mp4';
        const videos = [pp, pp2, pp3, pp4, pp5];
        const video = videos[Math.floor(Math.random() * videos.length)];

        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions: mentionedUsers }, { quoted: m });
    }
};

handler.help = ['nalguear'];
handler.tags = ['fun'];
handler.command = ['nalguear'];
handler.register = true;
handler.group = true;

export default handler;
