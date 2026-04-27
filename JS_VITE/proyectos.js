document.addEventListener("DOMContentLoaded", () => {
    renderImagenes();
    renderVideo();
});

/* ---------- HELPERS ---------- */
function parseData(data) {
    try {
        return JSON.parse(data);
    } catch {
        return data;
    }
}

/* ---------- IMÁGENES ---------- */
function renderImagenes() {
    const contenedor = document.getElementById("imagenes_proyecto");
    if (!contenedor) return;

    const imagenes = parseData(contenedor.dataset.imagenes);
    if (!Array.isArray(imagenes) || imagenes.length === 0) return;

    /*const html = imagenes
        .map(img => `<img src="${img}" alt="imagen proyecto"/>`)
        .join("");*/

    var contenido_html = ``;
    imagenes.forEach(img => {
        contenido_html += `<img src="${img}" />`;
    });

    contenedor.innerHTML = contenido_html;
}

/* ---------- VIDEO ---------- */
function renderVideo() {
    const contenedor = document.getElementById("video_proyecto");
    if (!contenedor) return;

    const video = parseData(contenedor.dataset.video);
    if (!video || video.trim() === "") return;

    contenedor.innerHTML = `
        <video controls>
            <source src="${video}" type="video/mp4">
            Tu navegador no soporta video.
        </video>
    `;
}