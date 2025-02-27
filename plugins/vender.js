import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const haremFilePath = './src/database/harem.json';
const economyFilePath = './src/database/economy.json'; // Archivo para almacenar dinero de usuarios

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('No se pudo cargar el archivo characters.json.');
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo characters.json.');
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveHarem(harem) {
    try {
        await fs.writeFile(haremFilePath, JSON.stringify(harem, null, 2));
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo harem.json.');
    }
}

async function loadEconomy() {
    try {
        const data = await fs.readFile(economyFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return {}; // Si no hay archivo, devolvemos un objeto vacío
    }
}

async function saveEconomy(economy) {
    try {
        await fs.writeFile(economyFilePath, JSON.stringify(economy, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo economy.json.');
    }
}

let handler = async (m, { conn, args }) => {
    const userId = m.sender;

    if (args.length < 3) {
        await conn.reply(m.chat, '《✧》Debes especificar el nombre del personaje, el precio y mencionar a quien quieres vendérselo.', m);
        return;
    }

    const price = parseInt(args[args.length - 2]); // Penúltimo argumento como precio
    const mentionedUser = args[args.length - 1]; // Último argumento como comprador
    const characterName = args.slice(0, -2).join(' ').toLowerCase().trim();

    if (isNaN(price) || price <= 0) {
        await conn.reply(m.chat, '《✧》El precio debe ser un número válido mayor a 0.', m);
        return;
    }

    if (!mentionedUser.startsWith('@')) {
        await conn.reply(m.chat, '《✧》Debes mencionar a un usuario válido.', m);
        return;
    }

    try {
        const characters = await loadCharacters();
        const economy = await loadEconomy();
        const sellerBalance = economy[userId] || 0;
        const buyerId = mentionedUser.replace('@', '');
        const buyerBalance = economy[buyerId] || 0;

        const character = characters.find(c => c.name.toLowerCase() === characterName && c.user === userId);
        if (!character) {
            await conn.reply(m.chat, `《✧》*${characterName}* no está reclamado por ti.`, m);
            return;
        }

        if (buyerBalance < price) {
            await conn.reply(m.chat, `《✧》${mentionedUser} no tiene suficiente dinero para comprar *${characterName}*.`, m);
            return;
        }

        // Transacción
        economy[buyerId] -= price;
        economy[userId] = (economy[userId] || 0) + price;
        character.user = buyerId;

        await saveCharacters(characters);
        await saveEconomy(economy);

        const harem = await loadHarem();
        const userEntry = {
            userId: buyerId,
            characterId: character.id,
            lastClaimTime: Date.now()
        };
        harem.push(userEntry);
        await saveHarem(harem);

        await conn.reply(m.chat, `✰ *${character.name}* ha sido vendido a ${mentionedUser} por *${price} monedas*!`, m);
    } catch (error) {
        await conn.reply(m.chat, `✘ Error al vender el personaje: ${error.message}`, m);
    }
};

handler.help = ['vender <nombre del personaje> <precio> @usuario'];
handler.tags = ['anime'];
handler.command = ['vender', 'sellchar'];
handler.group = true;
handler.register = true;

export default handler;
