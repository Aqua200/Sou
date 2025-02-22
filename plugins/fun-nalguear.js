let handler = async (m, { conn, usedPrefix }) => {
    let who = m.isGroup ? (m.mentionedJid[0] || (m.quoted ? m.quoted.sender : false)) : m.chat;
    if (!who) throw 'Etiqueta o menciona a alguien';

    if (!db.data.chats[m.chat].nsfw && m.isGroup) return m.reply('💔 *¡Lo siento, estos comandos están desactivados! NSFW*');

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);

    await conn.sendMessage(m.chat, { react: { text: '🍑', key: m.key } });

    let videos = [
        'https://qu.ax/dAgke.gif',
        'https://qu.ax/MOwKS.gif',
        'https://qu.ax/pYQDb.gif'
    ];
    const video = videos[Math.floor(Math.random() * videos.length)];

    let frases = [
        `💜 ${name2} *nalgueó a* ${name} 💥`,
        `😏 ${name2} *le dejó las pompis rojas a* ${name} 🍑`,
        `🔥 ${name2} *le dio un buen nalgadón a* ${name} 👏`,
        `🥵 ${name2} *castigó con una nalgada a* ${name} 💢`,
        `💖 ${name2} *le dio una nalgada cariñosa a* ${name} 😘`
    ];
    let str = frases[Math.floor(Math.random() * frases.length)];

    try {
        let stickerGif = await sticker(false, video, global.packname, global.author);
        await conn.sendMessage(m.chat, { sticker: stickerGif }, { quoted: m });
    } catch (err) {
        console.error('Error al generar sticker:', err);
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions: [m.sender, who] }, { quoted: m });
    }
};

handler.help = ['nalguear @tag'];
handler.tags = ['fun'];
handler.command = ['nalguear'];
handler.register = true;
handler.group = true;

export default handler;
