// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const colores = ['#fff2', '#fff4', '#fff7', '#fffc'];
const generateSpaceLayer = (selector, size, totalStars, duration) => {
    const layer = [];
    for (let i = 0; i < totalStars; i++) {
        const color = colores[Math.floor(Math.random() * colores.length)];
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        layer.push(`${x}vw ${y}vh 0 ${color},
    ${x}vw ${y + 100}vh 0 ${color}`);
    }
    const container = document.querySelector(selector);
    container.style.setProperty('--space-layer', layer.join(','));
    container.style.setProperty('--size', size);
    container.style.setProperty('--duration', duration);
}
/*clase del div, tamanio de las estrellas, cantidad de estrellas, duracion*/
generateSpaceLayer('.space-1', '1px', 200, '25s');
generateSpaceLayer('.space-2', '2px', 100, '20s');
generateSpaceLayer('.space-3', '4px', 50, '15s');
