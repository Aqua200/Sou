const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let chat = global.db.data.chats[m.chat];

  // Generar la lista de configuraciones
  let configMessage = `
✨ CONFIGURACIÓN DEL GRUPO

◈ Welcome: ${chat.welcome ? 'Activado' : 'Desactivado'}
◈ Autolevelup: ${chat.autolevelup ? 'Activado' : 'Desactivado'}
◈ Antibot: ${chat.antiBot ? 'Activado' : 'Desactivado'}
◈ Antisubbots: ${chat.antiSubBots ? 'Activado' : 'Desactivado'}
◈ Autoaceptar: ${chat.autoAceptar ? 'Activado' : 'Desactivado'}
◈ Autorechazar: ${chat.autoRechazar ? 'Activado' : 'Desactivado'}
◈ Autoresponder: ${chat.autoresponder ? 'Activado' : 'Desactivado'}
◈ Modoadmin: ${chat.modoadmin ? 'Activado' : 'Desactivado'}
◈ Reaction: ${chat.reaction ? 'Activado' : 'Desactivado'}
◈ Nsfw: ${chat.nsfw ? 'Activado' : 'Desactivado'}
◈ Detect: ${chat.detect ? 'Activado' : 'Desactivado'}
◈ Antilink: ${chat.antiLink ? 'Activado' : 'Desactivado'}
◈ Antitoxic: ${chat.antitoxic ? 'Activado' : 'Desactivado'}
◈ Antitraba: ${chat.antiTraba ? 'Activado' : 'Desactivado'}
◈ Antifake: ${chat.antifake ? 'Activado' : 'Desactivado'}

> Nota: Puedes activar una de estas opciones de esta manera. Ejemplo: *#antilink*
`;

  // Enviar la imagen y el mensaje de configuración
  const imageUrl = "https://qu.ax/uztyt.jpeg";
  await conn.reply(m.chat, { image: { url: imageUrl }, caption: configMessage }, m);
};

handler.command = ['configuracion', 'config']; // Se puede usar para mostrar la configuración

export default handler;
