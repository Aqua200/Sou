let cooldowns = {}

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]

  // Lógica para iniciar la caza
  let rsl = Math.floor(Math.random() * 500) // Yenes ganados
  cooldowns[m.sender] = Date.now()

  // Obtener el nombre del usuario o su número si no tiene nombre
  let username = m.pushName || m.sender.split('@')[0]

  // Enviar mensajes secuenciales con el nombre o número del usuario
  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Objetivo en radar! 🧚‍♂️🎯*`, null, { mentions: [m.sender] })
  }, 20000);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Preparación para la caza! 🗡️*`, null, { mentions: [m.sender] })
  }, 18000);

  setTimeout(() => {
    conn.reply(m.chat, `@${m.sender.split('@s.whatsapp.net')[0]} *¡Duende detectado! 🧚‍♂️*`, null, { mentions: [m.sender] })
  }, 15000);

  // Enviar la imagen
  const imageUrl = "https://qu.ax/atpzr.jpeg" // Reemplaza con la URL de la imagen que desees mostrar
  setTimeout(() => {
    conn.sendImage(m.chat, imageUrl, `¡Has cazado un duende y ganado *${toNum(rsl)}* yenes! Ahora tienes un total de *${toNum(user.coin + rsl)}* yenes. 💸`, m)
  }, 22000);

  // Actualiza el tiempo de la última caza
  user.lastberburu = new Date * 1;
}

handler.help = ['cazar', 'cazar_duende', 'cazar_duendes']
handler.tags = ['rpg']
handler.command = ['cazar', 'hunt', 'cazar_duende', 'duende']
handler.group = true
handler.register = true

export default handler

function toNum(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else {
    return number.toString()
  }
}
