/* Código hecho por @Fabri115 y mejorado por BrunoSobrino */

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix }) => {

if (global.conn.user.jid !== conn.user.jid) {
return conn.reply(m.chat, '🌸 U-unyuu~ solo puedes usar este comando desde el numerito principal del bot... gomenasai~! (╥﹏╥)', m, rcanal)
}
await conn.reply(m.chat, '✨ Uwaa~! Estoy limpiando los archivos de sesión... ¡pero no borraré el creds.json, nyan~! (≧◡≦) ♡', m, rcanal)
m.react(rwait)

let sessionPath = `./${sessions}/`

try {

if (!existsSync(sessionPath)) {
return await conn.reply(m.chat, '💖 U-uhm... la carpetita está vacía... nyan~ (⁄ ⁄>⁄ω⁄<⁄ ⁄)', m, rcanal)
}
let files = await fs.readdir(sessionPath)
let filesDeleted = 0
for (const file of files) {
if (file !== 'creds.json') {
await fs.unlink(path.join(sessionPath, file))
filesDeleted++;
}
}
if (filesDeleted === 0) {
await conn.reply(m.chat, '🌸 Nyaa~ la carpetita ya estaba vacía... ehehe~ (๑•́‧̫•̀๑)', m, rcanal)
} else {
m.react(done)
await conn.reply(m.chat, `💞 U-unyuu~ eliminé ${filesDeleted} archivos de sesión... ¡pero creds.json está a salvo! (๑˃̵ᴗ˂̵)و`, m, rcanal)
conn.reply(m.chat, '🙈 H-hello~? ¿Todavía puedes verme? UwU 💕', m, rcanal)

}
} catch (err) {
console.error('Error al leer la carpeta o los archivos de sesión:', err);
await conn.reply(m.chat, '😿 Nyuuu~ algo salió mal... lo siento mucho... ¡por favor no te enojes conmigo! (╥﹏╥)', m, rcanal)
}

}
handler.help = ['dsowner']
handler.tags = ['fix', 'owner']
handler.command = ['delai', 'delyaemori', 'dsowner', 'clearallsession']

handler.rowner = true

export default handler
