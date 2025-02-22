import { readdir, unlink, existsSync } from 'fs/promises'; import path from 'path';

const handler = async (m, { conn }) => { if (global.conn.user.jid !== conn.user.jid) { return conn.reply(m.chat, ⚠️ Utiliza este comando directamente en el número principal del Bot., m); }

await conn.reply(m.chat, `⏳ Iniciando eliminación de archivos de sesión, excepto creds.json...`, m);
m.react('⏳');

const sessionPath = './sessions/';

try {
    if (!existsSync(sessionPath)) {
        return await conn.reply(m.chat, `📂 La carpeta de sesiones no existe o está vacía.`, m);
    }

    const files = await readdir(sessionPath);
    let filesDeleted = 0;

    for (const file of files) {
        if (file !== 'creds.json') {
            await unlink(path.join(sessionPath, file));
            filesDeleted++;
        }
    }

    if (filesDeleted === 0) {
        await conn.reply(m.chat, `📂 No hay archivos adicionales que eliminar.`, m);
    } else {
        m.react('✅');
        await conn.reply(m.chat, `🗑️ Se eliminaron ${filesDeleted} archivos de sesión, excepto creds.json.`, m);
        conn.reply(m.chat, `👋 *¡Hola! ¿logras verme?*`, m);
    }
} catch (err) {
    console.error('Error al eliminar archivos de sesión:', err);
    await conn.reply(m.chat, `❌ Ocurrió un error al limpiar la sesión.`, m);
}

};

handler.help = ['dsowner']; handler.tags = ['owner']; handler.command = ['delai', 'dsowner', 'clearallsession']; handler.rowner = true;

export default handler;
