import { WAMessageStubType } from '@whiskeysockets/baileys'; import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) { try { if (!m.isGroup || !m.messageStubType) return;

let chat = global.db.data.chats?.[m.chat];
if (!chat?.welcome) return;

let who = m.messageStubParameters?.[0];
if (!who) return;

let taguser = `@${who.split('@')[0]}`;

const images = [
  'https://qu.ax/RSrBo.jpg',
  'https://qu.ax/YkCtt.jpg',
  'https://qu.ax/sjymW.jpg',
  'https://qu.ax/YQdTW.jpg',
  'https://qu.ax/LDdfg.jpg',
];

const messages = {
  welcome: [
    `✿･ﾟ *¡Bienvenido!* ﾟ･✿\n✧ ${taguser} ha llegado a ${groupMetadata.subject}\n✧ ${global.welcom1}\n✧ •(=^◡^=)• Disfruta tu estadía!\n✧ ✐ Usa *#help* para más info.`,
    `❀ こんにちは (Hola) ❀\n✧ ${taguser}, bienvenido a ${groupMetadata.subject}\n✧ ${global.welcom1}\n✧ ⊹꒰｡• ﻌ •｡꒱⊹ ¡Pásala genial aquí!\n✧ ✐ Usa *#help* si necesitas ayuda.`,
    `🌸 *Yokoso!* 🌸\n✧ ${taguser}, ¡has sido recibido en ${groupMetadata.subject}!\n✧ ${global.welcom1}\n✧ (๑>◡<๑) ¡Que te diviertas!\n✧ ✐ Usa *#help* para más información.`
  ],
  bye: [
    `✿･ﾟ *Adiós* ﾟ･✿\n✧ ${taguser} ha salido de ${groupMetadata.subject}\n✧ ${global.welcom2}\n✧ •(=;ω;=)• ¡Esperamos verte de nuevo!\n✧ ✐ Usa *#help* para volver cuando quieras.`,
    `❀ さようなら (Sayonara) ❀\n✧ ${taguser} se ha ido de ${groupMetadata.subject}\n✧ ${global.welcom2}\n✧ ⊹(╥﹏╥)⊹ ¡Nos vemos pronto!\n✧ ✐ Usa *#help* si regresas.`,
    `🌸 *Nos vemos* 🌸\n✧ ${taguser} dejó ${groupMetadata.subject}\n✧ ${global.welcom2}\n✧ (╥_╥) ¡Esperamos tu regreso!\n✧ ✐ Usa *#help* si necesitas ayuda.`
  ]
};

let messageType =
  m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD ? 'welcome' :
  (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
   m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) ? 'bye' : null;

if (!messageType) return;

let selectedMessage = messages[messageType][Math.floor(Math.random() * messages[messageType].length)];

let img;
try {
  img = await conn.profilePictureUrl(who, 'image').then(async (url) => await (await fetch(url)).buffer());
} catch {
  img = await (await fetch(images[Math.floor(Math.random() * images.length)])).buffer();
}

await conn.sendMessage(m.chat, { image: img, caption: selectedMessage, mentions: [who] });

} catch (error) { console.error('Error en bienvenida/despedida:', error); } }

