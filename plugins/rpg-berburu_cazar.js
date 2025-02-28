const handler = async (m, {conn}) => {
  const user = global.db.data.users[m.sender];

  // Inicializar el campo de yenes si no existe
  if (typeof user.yenes === 'undefined') {
    user.yenes = 0;  // Si no existe, inicializamos los yenes a 0
  }

  // Definimos el duende común
  const duendeComun = {
    name: 'Duende Común',
    yen: 10,
    rarity: 'Común',
    image: 'https://qu.ax/atpzr.jpeg',  // Aquí pones la URL de la imagen
  };

  // Mostramos el resultado de la caza
  const resultado = `
  *✧ Resultado de la caza de duendes ✧*
  Has cazado un ${duendeComun.name} (${duendeComun.rarity}) y obtuviste ${duendeComun.yen} yenes!
  `;

  // Enviamos el resultado junto con la imagen del duende
  conn.sendMessage(m.chat, {image: {url: duendeComun.image}, caption: resultado}, {mentions: [m.sender]});

  // Sumamos los yenes ganados a la cuenta del usuario
  user.yenes += duendeComun.yen;

  // Verificamos que los yenes se sumen correctamente
  console.log(`Yenes actuales de ${m.sender}: ${user.yenes}`);

  // Actualizamos el tiempo de la última caza
  user.lastCaza = new Date * 1;

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Duende detectado! 🧚‍♂️*`, null, {mentions: [m.sender]});
  }, 1800);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Preparación para la caza! 🗡️*`, null, {mentions: [m.sender]});
  }, 1500);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Objetivo en radar! 🧚‍♂️🎯*`, m, m.mentionedJid ? {mentions: [m.sender]} : {});
  }, 0);
};

// Función para convertir el tiempo en formato HH:MM:SS
function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0) ).join(':');
}

handler.help = ['cazar'];
handler.tags = ['rpg'];
handler.command = ['cazar', 'hunt'];
handler.group = true;
handler.register = true;

export default handler;
