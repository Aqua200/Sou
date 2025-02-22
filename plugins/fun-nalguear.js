

import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;
    
    if (!db.data.chats[m.chat].nsfw && m.isGroup) return m.reply('💔 *¡Lo siento estos comandos están desactivados! nsfw*');
    if (!who) throw 'Etiqueta o menciona a alguien';

    let user = global.db.data.users[who];
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);

    await conn.sendMessage(m.chat, { react: { text: '🍑', key: m.key } });

    // Lista de videos
    let videos = [
        'https://telegra.ph/file/d4b85856b2685b5013a8a.mp4',
        'https://telegra.ph/file/e278ca6dc7d26a2cfda46.mp4',
        'https://telegra.ph/file/f830f235f844e30d22e8.mp4',
        'https://telegra.ph/file/07fe0023525be2b2579f9.mp4',
        'https://telegra.ph/file/99e036ac43a09e044a223.mp4'
    ];
    const video = videos[Math.floor(Math.random() * videos.length)];

    // Frases personalizadas y aleatorias
    let frases = [
        `💜 ${name2} *nalgeo a* ${name} 💥`,
        `😏 ${name2} *le dejó las pompis rojas a* ${name} 🍑`,
        `🔥 ${name2} *le dio un buen nalgadón a* ${name} 👏`,
        `🥵 ${name2} *castigó con una nalgada a* ${name} 💢`,
        `💖 ${name2} *le dio una nalgada cariñosa a* ${name} 😘`
    ];
    let str = frases[Math.floor(Math.random() * frases.length)];

    if (m.isGroup) {
        conn.sendMessage(m.chat, { 
            video: { url: video }, 
            gifPlayback: true, 
            caption: str, 
            mentions: [m.sender, who] 
        }, { quoted: m });
    }
};

handler.help = ['nalguear @tag'];
handler.tags = ['fun'];
handler.command = ['nalguear'];
handler.register = true;
handler.group = true;

export default handler;
