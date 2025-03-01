let handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender];

    // Define las armas disponibles
    const armasDisponibles = {
        espada: {
            name: 'Espada',
            damage: 10
        },
        arco: {
            name: 'Arco',
            damage: 7
        },
        // Puedes agregar más armas aquí
    };

    // Si el comando no tiene texto (nombre del arma), muestra las armas disponibles
    if (!text) {
        let message = 'Elige una de las siguientes armas para equipar:\n';
        for (let arma in armasDisponibles) {
            message += `- ${armasDisponibles[arma].name}: Daño +${armasDisponibles[arma].damage}\n`;
        }
        return conn.reply(m.chat, message, m);
    }

    // Verifica si el arma existe en el inventario
    if (!armasDisponibles[text]) {
        return conn.reply(m.chat, 'Esa arma no está disponible. Usa el comando sin texto para ver las armas disponibles.', m);
    }

    // Equipar el arma
    user.weapon = armasDisponibles[text].name;  // Asigna el nombre del arma al usuario
    user.swordAtk = armasDisponibles[text].damage;  // Asigna el daño del arma al usuario

    conn.reply(m.chat, `¡Has equipado la ${armasDisponibles[text].name}! Ahora tu daño aumenta en ${armasDisponibles[text].damage}.`, m);
};

handler.help = ['equipa', 'equipar'];
handler.tags = ['rpg'];
handler.command = ['equipa', 'equipar'];
handler.group = true;

export default handler;
