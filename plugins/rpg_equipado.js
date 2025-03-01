let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // Verificar si el usuario tiene un arma equipada
    if (!user.weapon) {
        return conn.reply(m.chat, 'No tienes ninguna arma equipada. Usa el comando .equipa para equipar un arma.', m);
    }

    // Si tiene un arma equipada, muestra la información
    let weaponMessage = `Tienes equipada: *${user.weapon}*\n`;
    weaponMessage += `Daño: +${user.swordAtk}`;

    conn.reply(m.chat, weaponMessage, m);
};

handler.help = ['arma', 'miarma'];
handler.tags = ['rpg'];
handler.command = ['arma', 'miarma'];
handler.group = true;

export default handler;
