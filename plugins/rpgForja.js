let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // Lista de armas disponibles
    const availableWeapons = ['Espada de fuego', 'Arco de hielo', 'Lanza de trueno'];

    // Si el mensaje no contiene un arma para elegir, mostrar las armas disponibles
    if (!m.text || !availableWeapons.some(weapon => m.text.toLowerCase().includes(weapon.toLowerCase()))) {
        let weaponList = 'Armas disponibles para seleccionar:\n';
        availableWeapons.forEach((weapon, index) => {
            weaponList += `${index + 1}. ${weapon}\n`;
        });
        return conn.reply(m.chat, weaponList, m);
    }

    // Si el usuario elige un arma válida, asignarla
    let selectedWeapon = availableWeapons.find(weapon => m.text.toLowerCase().includes(weapon.toLowerCase()));

    // Equipar el arma seleccionada
    user.weapon = selectedWeapon;
    user.swordAtk = selectedWeapon === 'Espada de fuego' ? 20 : (selectedWeapon === 'Arco de hielo' ? 15 : 18);

    conn.reply(m.chat, `¡Has equipado la ${selectedWeapon}! Daño: +${user.swordAtk}`, m);
};

handler.help = ['equipa', 'armas'];
handler.tags = ['rpg'];
handler.command = ['equipa', 'armas'];
handler.group = true;

export default handler;
