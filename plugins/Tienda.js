// tienda.js

const waifus = [
    { name: 'Saber', bonus: 50, img: 'https://example.com/saber.jpg', price: 1000 },
    { name: 'Asuna', bonus: 40, img: 'https://example.com/asuna.jpg', price: 800 },
    { name: 'Miku', bonus: 30, img: 'https://example.com/miku.jpg', price: 600 },
    { name: 'Hinata', bonus: 60, img: 'https://example.com/hinata.jpg', price: 1200 },
    { name: 'Rem', bonus: 70, img: 'https://example.com/rem.jpg', price: 1500 }
];

// Función para mostrar la tienda
export function showStore() {
    let storeInfo = '🛒 *Tienda de Waifus*\n\n';
    waifus.forEach((waifu, i) => {
        storeInfo += `${i + 1}. ${waifu.name} - 💸 ${waifu.price} yenes\n`;
    });
    storeInfo += `\n💬 *Para comprar una waifu, usa el comando:* \`#comprar waifu <número>\``;
    return storeInfo;
}

// Función para comprar una waifu
export function buyWaifu(user, waifuIndex, purchasedWaifus) {
    let selectedWaifu = waifus[waifuIndex];

    // Verificar si la waifu ya ha sido comprada
    if (purchasedWaifus[selectedWaifu.name]) {
        return `❌ *La waifu ${selectedWaifu.name} ya ha sido comprada por otro usuario.*`;
    }

    if (user.coin < selectedWaifu.price) {
        return `❌ *No tienes suficientes yenes para comprar a ${selectedWaifu.name}.*`;
    }

    // Realizar la compra
    user.coin -= selectedWaifu.price;
    user.waifu = selectedWaifu.name;
    user.waifuBonus = selectedWaifu.bonus;

    // Registrar que la waifu ha sido comprada
    purchasedWaifus[selectedWaifu.name] = user;

    return `✅ *Has comprado a ${selectedWaifu.name} por ${selectedWaifu.price} yenes.*\n` +
        `✨ *Bono de waifu*: ${selectedWaifu.bonus} yenes.\n` +
        `💖 *Ahora tienes a tu waifu*: ${selectedWaifu.name}\n` +
        `📸 *Imagen de waifu*: ${selectedWaifu.img}`;
}
