let huntHandler = async (m, { conn }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    // Verifica si el usuario existe en la base de datos
    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, 'El usuario no se encuentra en mi base de datos.', m);
    }

    let user = global.db.data.users[who];

    // Si no tiene armas, avisar
    if (!user.weapon) {
        return conn.reply(m.chat, 'No tienes ninguna arma equipada. Usa el comando .equipa para equipar un arma.', m);
    }

    // Obtener el daño del arma equipada
    let weapon = user.weapon;
    let weaponDamage = user.swordAtk; // Usamos el atributo de daño del arma equipada (ajustar según tu sistema)

    // Realizar la caza (simulando que el duende tiene 100 de salud)
    let goblinHealth = 100;
    let goblinDamage = 20; // Daño del duende

    let battleMessage = `¡Has comenzado una caza!\n`;
    battleMessage += `Duende: *${goblinHealth} HP*\n`;
    battleMessage += `Tu arma: *${weapon}* (Daño: +${weaponDamage})\n`;

    // Calculando el daño
    let totalDamage = weaponDamage + Math.floor(Math.random() * 10);  // Añadimos un pequeño factor aleatorio al daño
    goblinHealth -= totalDamage;

    if (goblinHealth <= 0) {
        // Si el duende es derrotado
        battleMessage += `¡Has derrotado al duende! Has recibido recompensas.\n`;
        user.coin += 10;  // Ejemplo: ganar monedas
        user.experience += 20;  // Ganar experiencia
        user.iron += 5;  // Ejemplo: ganar hierro

        battleMessage += `Recompensas: 10 monedas, 20 de experiencia, 5 de hierro.\n`;
    } else {
        // Si el duende aún tiene vida
        battleMessage += `¡El duende sigue luchando! Queda: *${goblinHealth} HP*.\n`;
        battleMessage += `Haz más daño para derrotarlo.\n`;
    }

    conn.reply(m.chat, battleMessage, m);
}

huntHandler.help = ['cazar'];
huntHandler.tags = ['rpg'];
huntHandler.command = ['cazar'];
huntHandler.group = true;
