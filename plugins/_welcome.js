import { WAMessageStubType } from '@whiskeysockets/baileys'; import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) { if (!m.messageStubType || !m.isGroup) return true;

let who = m.messageStubParameters[0]; let taguser = @${who.split('@')[0]}; let chat = global.db.data.chats[m.chat];

 Arreglo de imágenes decorativas const images = [ 'https://qu.ax/uVvOx.jpeg', 'https://qu.ax/RHADB.jpeg', 'https://qu.ax/Rndis.jpeg', 'https://qu.ax/pYVdH.jpeg', 'https://qu.ax/doymM.jpeg', ];

 Mensajes decorativos de bienvenida const welcomeMessages = [ ✿･ﾟ *¡Bienvenido!* ﾟ･✿ ✧ ${taguser} ha llegado a ${groupMetadata.subject} ✧ ${global.welcom1} ✧ •(=^◡^=)• Disfruta tu estadía en el grupo! ✧ ✐ Usa *#help* para explorar los comandos., ❀ こんにちは (Hola) ❀ ✧ ${taguser}, bienvenido a ${groupMetadata.subject} ✧ ${global.welcom1} ✧ ⊹꒰｡• ﻌ •｡꒱⊹ ¡Pásala genial aquí! ✧ ✐ Usa *#help* si necesitas ayuda., 🌸 *Yokoso!* 🌸 ✧ ${taguser}, ¡has sido recibido en ${groupMetadata.subject}! ✧ ${global.welcom1} ✧ (๑>◡<๑) ¡Que te diviertas! ✧ ✐ Usa *#help* para más información., ];

 Mensajes decorativos de despedida const byeMessages = [ ✿･ﾟ *Adiós* ﾟ･✿ ✧ ${taguser} ha salido de ${groupMetadata.subject} ✧ ${global.welcom2} ✧ •(=;ω;=)• ¡Esperamos verte de nuevo! ✧ ✐ Usa *#help* para volver cuando quieras., ❀ さようなら (Sayonara) ❀ ✧ ${taguser} se ha ido de ${groupMetadata.subject} ✧ ${global.welcom2} ✧ ⊹(╥﹏╥)⊹ ¡Nos vemos pronto! ✧ ✐ Usa *#help* si regresas., 🌸 *Nos vemos* 🌸 ✧ ${taguser} dejó ${groupMetadata.subject} ✧ ${global.welcom2} ✧ (╥_╥) ¡Esperamos tu regreso! ✧ ✐ Usa *#help* si necesitas ayuda., ];

if (chat.welcome) { let img; try { let pp = await conn.profilePictureUrl(who, 'image'); img = await (await fetch(pp)).buffer(); } catch { const randomImage = images[Math.floor(Math.random() * images.length)]; img = await (await fetch(randomImage)).buffer(); }

if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
  let bienvenida = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] });
} else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
  let bye = byeMessages[Math.floor(Math.random() * byeMessages.length)];
  await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] });
}

}

return true; }
