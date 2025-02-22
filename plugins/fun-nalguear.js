const fs = require('fs');

let handler = async (m, { conn }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        who = m.chat;
    }

    if (!db.data.chats[m.chat].nsfw && m.isGroup) return m.reply('🚩 ¡Estos comandos están desactivados!');
    if (!who) throw 'Etiqueta o menciona a alguien';

    if (who === m.sender) {
        return conn.sendMessage(m.chat, { text: '😂 No puedes nalguearte a ti mismo, pídele a alguien más que lo haga.' }, { quoted: m });
    }

    let user = global.db.data.users[who];
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);

    let reactions = ['🔥', '😏', '🍑', '🥵', '👋'];
    let randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    await conn.sendMessage(m.chat, { react: { text: randomReaction, key: m.key } });

    let frases = [
        `${name2} le dio una tremenda nalgada a ${name} 🍑🔥`,
        `${name2} le dejó la marca de la mano en el 🍑 de ${name} 😏`,
        `¡${name2} le dio un buen golpe a ${name}! Eso tuvo que doler 😳`,
        `¡Pum! ${name2} nalgueó fuerte a ${name} 🖐️🔥`,
        `${name2} le dio una nalgada a ${name} con todo el amor del mundo 😂`
    ];
    let mensaje = frases[Math.floor(Math.random() * frases.length)];

    let multimedia = [
        { type: 'video', url: 'https://telegra.ph/file/d4b85856b2685b5013a8a.mp4' },
        { type: 'video', url: 'https://telegra.ph/file/e278ca6dc7d26a2cfda46.mp4' },
        { type: 'gif', url: 'https://c.tenor.com/1.gif' },
        { type: 'gif', url: 'https://c.tenor.com/2.gif' }
    ];

    let media = multimedia[Math.floor(Math.random() * multimedia.length)];
    if (media.type === 'video') {
        conn.sendMessage(m.chat, { video: { url: media.url }, gifPlayback: true, caption: mensaje, mentions: [m.sender] }, { quoted: m });
    } else {
        conn.sendMessage(m.chat, { image: { url: media.url }, caption: mensaje, mentions: [m.sender] }, { quoted: m });
    }

    conn.sendMessage(m.chat, { audio: { url: 'https://www.myinstants.com/media/sounds/slap.mp3' }, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
};

handler.help = ['nalguear @tag'];
handler.tags = ['fun'];
handler.command = ['nalguear'];
handler.register = true;
handler.group = true;

module.exports = handler;
