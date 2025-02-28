const handler = async (m, {conn}) => {
  const user = global.db.data.users[m.sender];
  
  // Definimos el duende común
  const duendeComun = {
    name: 'Duende Común',
    yen: 10,
    rarity: 'Común',
    image: 'https://qu.ax/atpzr.jpeg',  // Aquí pones la URL de la imagen
    vida: 100  // Vida inicial del jugador
  };

  // Comando para curar vida
  if (m.text.startsWith('.heal')) {
    // Recuperamos vida aleatoria entre 10 y 30 puntos
    const vidaRecuperada = Math.floor(Math.random() * 21) + 10;
    user.vida += vidaRecuperada;  // Sumamos vida al jugador

    // Aseguramos que la vida no supere el máximo (100 en este caso)
    if (user.vida > 100) user.vida = 100;

    return conn.reply(m.chat, `*¡Recuperaste ${vidaRecuperada} puntos de vida!*\nTu vida actual es: ${user.vida} ❤️`, m);
  }

  // Probabilidad de que se le baje vida (20% de probabilidad)
  const probabilidadBajarVida = Math.random();
  let perdidaDeVida = 0;

  if (probabilidadBajarVida < 0.2) {  // 20% de chance de que pierda vida
    perdidaDeVida = Math.floor(Math.random() * 20) + 1;  // Pierde entre 1 y 20 puntos de vida
    user.vida -= perdidaDeVida;  // Restamos vida al jugador
  }

  // Si la vida del jugador baja de 0, ponemos un mínimo de 0
  if (user.vida < 0) user.vida = 0;

  // Mostramos el resultado de la caza
  const resultado = `
  *✧ Resultado de la caza de duendes ✧*
  Has cazado un ${duendeComun.name} (${duendeComun.rarity}) y obtuviste ${duendeComun.yen} yenes!
  `;

  // Si se ha perdido vida, mostramos el mensaje correspondiente
  const mensajeVida = perdidaDeVida > 0 ? `¡Perdiste ${perdidaDeVida} puntos de vida! 😱 Tu vida actual es: ${user.vida}` : '';

  // Enviamos el resultado junto con la imagen del duende
  conn.sendMessage(m.chat, {image: {url: duendeComun.image}, caption: `${resultado}\n${mensajeVida}`}, {mentions: [m.sender]});

  // Sumamos los yenes ganados a la cuenta del usuario
  global.db.data.users[m.sender].yenes += duendeComun.yen;

  // Tiempo de descanso entre caza
  const tiempoRestante = global.db.data.users[m.sender].lastCaza + 2700000; // 45 minutos
  
  if (new Date - global.db.data.users[m.sender].lastCaza < 2700000) {
    return conn.reply(m.chat, `Por favor descansa un momento para continuar cazando.⫹⫺ Tiempo restante: ${clockString(tiempoRestante - new Date())}`, m);
  }

  setTimeout(() => {
    conn.reply(m.chat, resultado, m);
  }, 2000);
  
  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Duende detectado! 🧚‍♂️*`, null, {mentions: [m.sender]});
  }, 1800);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Preparación para la caza! 🗡️*`, null, {mentions: [m.sender]});
  }, 1500);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Objetivo en radar! 🧚‍♂️🎯*`, m, m.mentionedJid ? {mentions: [m.sender]} : {});
  }, 0);
  
  user.lastCaza = new Date * 1; // Actualizamos el tiempo de la última caza
};

// Función para convertir el tiempo en formato HH:MM:SS
function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0) ).join(':');
}

handler.help = ['cazar', 'heal'];
handler.tags = ['rpg'];
handler.command = ['cazar', 'hunt', 'heal'];
handler.group = true;
handler.register = true;

export default handler;
