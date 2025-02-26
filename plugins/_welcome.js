import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

// Cache para imágenes por defecto y mensajes
const DEFAULT_IMAGE = 'https://files.catbox.moe/xr2m6u.jpg';
const WELCOME_MSG = '❀ *Bienvenido* a {{groupName}}\n ✰ {{taguser}}\n{{welcomeText}}\n •(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ✐ Puedes usar *#help* para ver la lista de comandos.';
const BYE_MSG = '❀ *Adiós* de {{groupName}}\n ✰ {{taguser}}\n{{byeText}}\n •(=^●ω●^=)• Te esperamos pronto!\n> ✐ Puedes usar *#help* para ver la lista de comandos.';

export async function before(m, { conn, participants, groupMetadata }) {
  // Verificación rápida para salir si no es necesario procesar
  if (!m.messageStubType || !m.isGroup) return true;

  const who = m.messageStubParameters[0];
  const taguser = `@${who.split('@')[0]}`;
  const chat = global.db.data.chats[m.chat];

  // Si no hay bienvenida activada, salir
  if (!chat.welcome) return true;

  // Obtener imagen de perfil o usar la predeterminada
  let img;
  try {
    const pp = await conn.profilePictureUrl(who, 'image');
    img = await (await fetch(pp, { timeout: 5000 })).buffer(); // Timeout para evitar bloqueos
  } catch {
    img = await (await fetch(DEFAULT_IMAGE, { timeout: 5000 })).buffer();
  }

  // Preparar mensaje según el evento
  const groupName = groupMetadata.subject;
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const message = WELCOME_MSG
      .replace('{{groupName}}', groupName)
      .replace('{{taguser}}', taguser)
      .replace('{{welcomeText}}', global.welcom1 || '');
    await conn.sendMessage(m.chat, { image: img, caption: message, mentions: [who] });
  } else if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
  ) {
    const message = BYE_MSG
      .replace('{{groupName}}', groupName)
      .replace('{{taguser}}', taguser)
      .replace('{{byeText}}', global.welcom2 || '');
    await conn.sendMessage(m.chat, { image: img, caption: message, mentions: [who] });
  }

  return true;
}
