let cooldowns = {}

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let tiempo = 5 * 60 // Tiempo de espera entre acciones (en segundos)
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
    const tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `Debes esperar *${tiempo2}* para cazar otro duende.`, m)
    return
  }

  // Lógica para cazar un duende y ganar yenes
  let rsl = Math.floor(Math.random() * 500) // Yenes ganados
  cooldowns[m.sender] = Date.now()
  await conn.reply(m.chat, `¡Has cazado un duende y ganado *${toNum(rsl)}* yenes! 💸`, m)

  user.coin += rsl // Aumenta los yenes del usuario
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

function segundosAHMS(segundos) {
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
