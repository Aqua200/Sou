import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, groupMetadata }) { 
  try { 
    if (!m.isGroup || !m.messageStubParameters) return;

    let chat = global.db?.data?.chats?.[m.chat];
    if (!chat?.welcome) return;

    let who = m.messageStubParameters[0] || m.key.participant;
    if (!who || !who.includes('@')) return;

    let taguser = `@${who.split('@')[0]}`;

    // Mensajes de bienvenida y despedida
    let welcomeMsg = global.welcom1 || "¡Bienvenido!";
    let byeMsg = global.welcom2 || "¡Nos vemos pronto!";

    let messages = {
      welcome: [
        `✿･ﾟ *¡Bienvenido!* ﾟ･✿\n✧ ${taguser} ha llegado a ${groupMetadata.subject}\n✧ ${welcomeMsg}\n✧ •(=^◡^=)• Disfruta tu estadía!\n✧ ✐ Usa *#help* para más info.`,
        `❀ こんにちは (Hola) ❀\n✧ ${taguser}, bienvenido a ${groupMetadata.subject}\n✧ ${welcomeMsg}\n✧ ⊹꒰｡• ﻌ •｡꒱⊹ ¡Pásala genial aquí!\n✧ ✐ Usa *#help* si necesitas ayuda.`,
        `🌸 *Yokoso!* 🌸\n✧ ${taguser}, ¡has sido recibido en ${groupMetadata.subject}!\n✧ ${welcomeMsg}\n✧ (๑>◡<๑) ¡Que te diviertas!\n✧ ✐ Usa *#help* para más información.`
      ],
      bye: [
        `✿･ﾟ *Adiós* ﾟ･✿\n✧ ${taguser} ha salido de ${groupMetadata.subject}\n✧ ${byeMsg}\n✧ •(=;ω;=)• ¡Esperamos verte de nuevo!\n✧ ✐ Usa *#help* para volver cuando quieras.`,
        `❀ さようなら (Sayonara) ❀\n✧ ${taguser} se ha ido de ${groupMetadata.subject}\n✧ ${byeMsg}\n✧ ⊹(╥﹏╥)⊹ ¡Nos vemos pronto!\n✧ ✐ Usa *#help* si regresas.`,
        `🌸 *Nos vemos* 🌸\n✧ ${taguser} dejó ${groupMetadata.subject}\n✧ ${byeMsg}\n✧ (╥_╥) ¡Esperamos tu regreso!\n✧ ✐ Usa *#help* si necesitas ayuda.`
      ]
    };

    let images = [
      'https://qu.ax/RSrBo.jpg',
      'https://qu.ax/YkCtt.jpg',
      'https://qu.ax/sjymW.jpg',
      'https://qu.ax/YQdTW.jpg',
      'https://qu.ax/LDdfg.jpg',
    ];

    // Determinar si es bienvenida o despedida
    let messageType = 
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD ? 'welcome' :
      (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) ? 'bye' : null;

    if (!messageType) return;

    let selectedMessage = messages[messageType][Math.floor(Math.random() * messages[messageType].length)];
    let imageUrl = images[Math.floor(Math.random() * images.length)];

    // Intentar obtener la foto de perfil
    let img;
    try {
      let url = await conn.profilePictureUrl(who, 'image');
      img = url ? await (await fetch(url)).buffer() : null;
    } catch (err) {
      img = null;
    }

    // Si no hay foto de perfil, usa una imagen de respaldo
    if (!img) img = await (await fetch(imageUrl)).buffer();

    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: selectedMessage, 
      mentions: [who] 
    });

  } catch (error) { 
    console.error('Error en bienvenida/despedida:', error); 
  } 
}
