let handler = async (m, { conn, args }) => {
    const userId = m.sender;

    // Comando '.waifus' para mostrar ayuda
    if (args[0] === '.waifus') {
        await conn.reply(m.chat, 
            '《✧》Si no sabes cuál es el ID de tu personaje, solo pon .waifus.\n' +
            'Este comando te mostrará los personajes disponibles y sus ID.\n' +
            'Para vender un personaje usa: \n.vender <nombre o ID del personaje> <precio> @usuario', m);
        return;
    }

    if (args.length < 3) {
        await conn.reply(m.chat, '《✧》Debes especificar el nombre o ID del personaje, el precio y mencionar a quien quieres vendérselo.', m);
        return;
    }

    const price = parseInt(args[args.length - 2]); // Penúltimo argumento como precio
    const mentionedUser = args[args.length - 1]; // Último argumento como comprador
    const characterIdentifier = args.slice(0, -2).join(' ').toLowerCase().trim(); // Puede ser nombre o ID

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

        // Buscar personaje por nombre o ID
        const character = characters.find(c => 
            (c.name.toLowerCase() === characterIdentifier || c.id === characterIdentifier) && c.user === userId
        );

        if (!character) {
            await conn.reply(m.chat, `《✧》No se encontró el personaje *${characterIdentifier}* o no te pertenece.`, m);
            return;
        }

        if (buyerBalance < price) {
            await conn.reply(m.chat, `《✧》${mentionedUser} no tiene suficiente dinero para comprar *${character.name}*.`, m);
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

handler.help = ['vender <nombre del personaje o ID> <precio> @usuario', '.waifus'];
handler.tags = ['anime'];
handler.command = ['vender', 'sellchar'];
handler.group = true;
handler.register = true;

export default handler;
