const imagenes_proyecto = document.getElementById("imagenes_proyecto");
const imagenes = JSON.parse(imagenes_proyecto.dataset.imagenes);

var contenido_html = ``;

imagenes.forEach(img => {
    contenido_html += `
        <img src="${img}"/>
    `;

});
imagenes_proyecto.innerHTML = contenido_html;
