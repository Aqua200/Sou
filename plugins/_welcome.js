import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let who = m.messageStubParameters[0];
  let taguser = `@${who.split('@')[0]}`;
  let chat = global.db.data.chats[m.chat];

  if (!chat.welcome) return true;

  // Imágenes decorativas
  const images = [
    'https://qu.ax/uVvOx.jpeg',
    'https://qu.ax/RHADB.jpeg',
    'https://qu.ax/Rndis.jpeg',
    'https://qu.ax/pYVdH.jpeg',
    'https://qu.ax/doymM.jpeg',
  ];

  // Mensajes de bienvenida y despedida
  const messages = {
    welcome: [
      `✿･ﾟ *¡Bienvenido!* ﾟ･✿\n✧ ${taguser} ha llegado a ${groupMetadata.subject}\n✧ ${global.welcom1}\n✧ •(=^◡^=)• Disfruta tu estadía en el grupo!\n✧ ✐ Usa *#help* para explorar los comandos.`,
      `❀ こんにちは (Hola) ❀\n✧ ${taguser}, bienvenido a ${groupMetadata.subject}\n✧ ${global.welcom1}\n✧ ⊹꒰｡• ﻌ •｡꒱⊹ ¡Pásala genial aquí!\n✧ ✐ Usa *#help* si necesitas ayuda.`,
      `🌸 *Yokoso!* 🌸\n✧ ${taguser}, ¡has sido recibido en ${groupMetadata.subject}!\n✧ ${global.welcom1}\n✧ (๑>◡<๑) ¡Que te diviertas!\n✧ ✐ Usa *#help* para más información.`,
    ],
    bye: [
      `✿･ﾟ *Adiós* ﾟ･✿\n✧ ${taguser} ha salido de ${groupMetadata.subject}\n✧ ${global.welcom2}\n✧ •(=;ω;=)• ¡Esperamos verte de nuevo!\n✧ ✐ Usa *#help* para volver cuando quieras.`,
      `❀ さようなら (Sayonara) ❀\n✧ ${taguser} se ha ido de ${groupMetadata.subject}\n✧ ${global.welcom2}\n✧ ⊹(╥﹏╥)⊹ ¡Nos vemos pronto!\n✧ ✐ Usa *#help* si regresas.`,
      `🌸 *Nos vemos* 🌸\n✧ ${taguser} dejó ${groupMetadata.subject}\n✧ ${global.welcom2}\n✧ (╥_╥) ¡Esperamos tu regreso!\n✧ ✐ Usa *#help* si necesitas ayuda.`,
    ],
  };

  let messageType =
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD ? 'welcome' :
    (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) ? 'bye' : null;

  if (!messageType) return true;

  let selectedMessage = messages[messageType][Math.floor(Math.random() * messages[messageType].length)];

  // Obtener imagen de perfil o imagen decorativa
  let img;
  try {
    let pp = await conn.profilePictureUrl(who, 'image');
    img = await (await fetch(pp)).buffer();
  } catch {
    let randomImage = images[Math.floor(Math.random() * images.length)];
    img = await (await fetch(randomImage)).buffer();
  }

  await conn.sendMessage(m.chat, { image: img, caption: selectedMessage, mentions: [who] });

  return true;
}
