export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  if (m.chat === '120363322713003916@newsletter') return !0;
  
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`${emoji} E-ehm... h-hola @${m.sender.split`@`[0]}... Lo siento mucho, p-pero mi creador ha decidido desactivar los comandos en chats privados... n-no quiero molestarte, p-pero si intentas usarlos aquí, p-podría tener que bloquearte...   
    P-pero no te preocupes... ¡puedes unirte al grupo principal y usarme libremente ahí! E-espero verte por allá... 🥺💞\n\n${gp1}`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
  }
  
  return !1;
}
