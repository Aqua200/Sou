import { tmpdir } from 'os'
import path, { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync
} from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

let handler = async (m, { conn }) => { 
  conn.reply(m.chat, `✅ Realizado, ya se han eliminado los archivos de la carpeta tmp`, m)

  const tmp = [tmpdir(), join(__dirname, '../tmp')]
  const filename = []

  tmp.forEach(dirname => {
    if (existsSync(dirname)) {
      readdirSync(dirname).forEach(file => filename.push(join(dirname, file)))
    }
  })

  filename.forEach(file => {
    try {
      const stats = statSync(file)
      if (stats.isFile()) unlinkSync(file)
    } catch (e) {
      console.error(`Error al eliminar ${file}:`, e)
    }
  })
}

handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = ['cleartmp', 'borrartmp', 'borrarcarpetatmp', 'vaciartmp']
handler.rowner = true

export default handler
