// Comando .minar para ganar yenes en lugar de materiales
async function minar(m, { userWaifu, pickByProbability, pickRandomRange, lugares }) {
    // Obtiene la waifu del usuario, si tiene una asignada
    let waifu = userWaifu[m.sender];
    if (!waifu) {
        return m.reply("No tienes una waifu asignada. ¡Ve a conseguir una waifu con el comando .waifu!");
    }

    // Aquí se incluyen los beneficios de la waifu
    let bonus = waifu.bonus || {};
    let lugar = pickByProbability(lugares);

    // Generar yenes de manera aleatoria y con bonificación de waifu
    let yenesBase = pickRandomRange(lugar.minerales.yen); // Aleatorio dentro del rango de yenes del lugar
    let yenes = Math.floor(yenesBase * (bonus.coin || 1)); // Se aplica la bonificación de la waifu a los yenes

    // Agregar los yenes ganados al total del usuario
    userYen[m.sender] = (userYen[m.sender] || 0) + yenes;

    // Crear el mensaje de resultado de la minería
    let resultado = `
    *¡Minería Exitosa!*
    Has ganado: ${yenes} yenes 💰

    *Beneficio de tu waifu ${waifu.nombre}:* 
    - Bonificación de yenes: x${bonus.coin || 1}

    *¡Gracias a tu waifu, obtuviste yenes mejorados!*
    `;

    // Responder al usuario con el resultado
    return m.reply(resultado);
}
