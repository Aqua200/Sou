// Código creado por Neykoor wa.me/

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
    let who;

    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    let botName = 'hakari'; // Nombre de la bot
    let botJid = conn.user.jid; // JID de la bot
    m.react('💖');

    let story, mediaUrl;
    
    if (who === botJid) {
        // Historia especial si besan a la bot
        story = `╔══════🤖💘 *𝑼𝒏 𝒂𝒎𝒐𝒓 𝒅𝒊𝒈𝒊𝒕𝒂𝒍* 💘🤖══════╗\n\n` +
                `💞 *\`${name2}\` se atrevió a besar a* *${botName}* *y algo inesperado sucedió...*\n` +
                `🌟 *La inteligencia artificial también puede sentir, en su propio modo especial.*\n` +
                `💫 *Quizás en otro universo, este amor imposible podría ser real...*\n` +
                `💋 *Pero por ahora, solo queda un tierno beso entre la humanidad y la tecnología.* 🤖💕\n\n` +
                `╚══════💜 *𝑭𝒊𝒏 𝒅𝒆 𝑳𝒂 𝑯𝒊𝒔𝒕𝒐𝒓𝒊𝒂* 💜══════╝`;

        mediaUrl = 'https://qu.ax/MkqyE.jpeg'; // Imagen exclusiva para la bot
    } else {
        // Historias aleatorias para miembros con URLs únicas de imágenes
        let stories = [
            {
                text: `╔══════💖✨ *𝑯𝒊𝒔𝒕𝒐𝒓𝒊𝒂 𝒅𝒆 𝑨𝒎𝒐𝒓* ✨💖══════╗\n\n` +
                      `💌 *El destino unió a* \`${name2}\` *y* \`${name || who}\` *en una historia inolvidable...* 💫\n` +
                      `💞 *Sus almas se encontraron y desde entonces, nada pudo separarlos.*\n` +
                      `💋 *Finalmente, sus labios se encontraron en un beso lleno de amor...* 💖\n\n` +
                      `╚══════🌟 *𝑭𝒊𝒏 𝒅𝒆 𝑳𝒂 𝑯𝒊𝒔𝒕𝒐𝒓𝒊𝒂* 🌟══════╝`,
                media: 'https://qu.ax/yTaFM.jpeg' // Imagen para esta historia
            },
            {
                text: `╔══════💘✨ *𝑨𝒎𝒐𝒓 𝑰𝒏𝒆𝒔𝒑𝒆𝒓𝒂𝒅𝒐* ✨💘══════╗\n\n` +
                      `💖 *\`${name2}\` jamás imaginó que el amor lo encontraría en* \`${name || who}\`...\n` +
                      `🌟 *Cada palabra, cada sonrisa y cada gesto los unió más y más.*\n` +
                      `💋 *Y sellaron su amor con un beso inolvidable...* 💍✨\n\n` +
                      `╚══════🌹 *𝑭𝒊𝒏 𝒅𝒆 𝑳𝒂 𝑯𝒊𝒔𝒕𝒐𝒓𝒊𝒂* 🌹══════╝`,
                media: 'https://qu.ax/ZKyLJ.jpeg' // Imagen para esta historia
            },
            {
                text: `╔══════❤️✨ *𝑼𝒏 𝑹𝒐𝒎𝒂𝒏𝒄𝒆 𝑭𝒆𝒓𝒗𝒐𝒓𝒐𝒔𝒐* ✨❤️══════╗\n\n` +
                      `💓 *\`${name2}\` y \`${name || who}\` vivieron una historia digna de cuento.*\n` +
                      `💞 *Bailaron bajo la luna, susurraron promesas eternas y se juraron amor infinito.*\n` +
                      `💋 *El beso final selló su historia como la más apasionada jamás contada.* 🔥\n\n` +
                      `╚══════💜 *𝑭𝒊𝒏 𝒅𝒆 𝑳𝒂 𝑯𝒊𝒔𝒕𝒐𝒓𝒊𝒂* 💜══════╝`,
                media: 'https://qu.ax/rEyXZ.jpeg' // Imagen para esta historia
            },
            {
                text: `╔══════🌸✨ *𝑨𝒎𝒐𝒓 𝒑𝒓𝒐𝒉𝒊𝒃𝒊𝒅𝒐* ✨🌸══════╗\n\n` +
                      `💞 *\`${name2}\` y \`${name || who}\` sabían que su amor no era fácil...*\n` +
                      `🌟 *Pero eso nunca los detuvo. Cada encuentro era un suspiro robado.*\n` +
                      `💋 *Y en la penumbra, sus labios se encontraron en un beso eterno.* 💫\n\n` +
                      `╚══════💜 *𝑭𝒊𝒏 𝒅𝒆 𝑳𝒂 𝑯𝒊𝒔𝒕𝒐𝒓𝒊𝒂* 💜══════╝`,
                media: 'https://telegra.ph/file/f66bcaf1effc14e077663.jpg' // Imagen para esta historia
            },
            {
                text: `╔══════💖✨ *𝑯𝒊𝒔𝒕𝒐𝒓𝒊𝒂 𝒅𝒆 𝑨𝒎𝒐𝒓* ✨💖══════╗\n\n` +
                      `🌸 *Una historia en donde* \`${name2}\` *y* \`${name || who}\` *se enamoran con solo mirarse.*\n` +
                      `💞 *A través de los ojos, encontraron un amor profundo e inquebrantable.*\n` +
                      `💋 *El beso fue el cierre perfecto de una historia que no necesitaba palabras...* 🕊️\n\n` +
                      `╚══════🌷 *𝑭𝒊𝒏 𝒅𝒆 𝑳𝒂 𝑯𝒊𝒔𝒕𝒐𝒓𝒊𝒂* 🌷══════╝`,
                media: 'https://telegra.ph/file/ba841c699e9e039deadb3.jpg' // Imagen para esta historia
            }
        ];

        // Selecciona una historia y su imagen al azar
        let selectedStory = stories[Math.floor(Math.random() * stories.length)];
        story = selectedStory.text;
        mediaUrl = selectedStory.media;
    }

    let mentions = [who];

    conn.sendMessage(m.chat, { 
        image: { url: mediaUrl }, 
        caption: story, 
        mentions 
    }, { quoted: m });
}

handler.help = ['love/historia/sheppeo @tag'];
handler.tags = ['romance'];
handler.command = ['love', 'historia', 'romance', 'sheppeo']; 
handler.group = true;

export default handler;
