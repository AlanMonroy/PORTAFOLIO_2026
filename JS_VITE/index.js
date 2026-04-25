import { createAnimatable, utils, createTimeline, stagger, splitText } from 'animejs';

window.mostrarImagen = function () {
    document.getElementById("modal1").style.display = "flex";
}

const modal1 = document.getElementById("modal1");
if (modal1) {
    modal1.onclick = function () {
        this.style.display = "none";
    };
}

window.mostrarModal = function (url) {
    const modal = document.getElementById("modal");
    if (modal) {
        const img = document.getElementById("modal-img");
        const pdf = document.getElementById("modal-pdf");

        if (url.endsWith(".pdf")) {
            img.style.display = "none";
            pdf.style.display = "block";
            pdf.src = url;
        } else {
            pdf.style.display = "none";
            img.style.display = "block";
            img.src = url;
        }

        modal.style.display = "flex";
    }
}

/*document.getElementById("modal").onclick = function () {
    this.style.display = "none";
}*/

const modal = document.getElementById("modal");
if (modal) {
    modal.onclick = function () {
        this.style.display = "none";
    };
}

/* Mostar ocultar segun el size*/
/*const texto = document.getElementById("texto_largo");
function activarSlide() {
    if (window.innerWidth <= 1024) {
        texto.onclick = () => {
            texto.classList.toggle("expandido");
        };
    } else {
        texto.onclick = null;
        texto.classList.remove("expandido");
    }
}

window.addEventListener("resize", activarSlide);
activarSlide();*/

const contenedor = document.querySelector(".div2");
const texto = document.getElementById("texto_largo");
const hint = document.querySelector(".hint");

contenedor.addEventListener("click", (e) => {
    // Evita activar slide si se da click en links o botones
    if (e.target.closest("a, button")) return;

    texto.classList.toggle("expandido");

    hint.textContent = texto.classList.contains("expandido")
        ? "Click para ver menos ↑"
        : "Click para ver más ↓";
    hint.style.color = texto.classList.contains("expandido")
        ? "#f87171" 
        : "#38bdf8";
});

document.addEventListener("DOMContentLoaded", () => {
    /*Move cursor */
    /*const $demos = document.querySelector('#docs-demos');
    const $demo = document.querySelector('.docs-demo.is-active');

    let bounds = $demo.getBoundingClientRect();
    const refreshBounds = () => bounds = $demo.getBoundingClientRect();

    const animatableSquare = createAnimatable('.square', {
        x: 500, // Define the x duration to be 500ms
        y: 500, // Define the y duration to be 500ms
        ease: 'out(3)',
    });

    const onMouseMove = e => {
        const { width, height, left, top } = bounds;
        const hw = width / 2;
        const hh = height / 2;
        const x = utils.clamp(e.clientX - left - hw, -hw, hw);
        const y = utils.clamp(e.clientY - top - hh, -hh, hh);
        animatableSquare.x(x); // Animate the x value in 500ms
        animatableSquare.y(y); // Animate the y value in 500ms
    }

    window.addEventListener('mousemove', onMouseMove);
    $demos.addEventListener('scroll', refreshBounds);*/

    /*=-=-=-=-=-=-= ANIMACION =-=-=-=-=-=-=*/
    const { words, chars } = splitText('p', {
        words: { wrap: 'clip' },
        chars: true,
    });

    createTimeline({
        loop: true,
        defaults: { ease: 'inOut(5)', duration: 650 }
    })

        .add(words, {
            y: el => +el.dataset.line % 2 ? '100%' : '-100%',
        }, stagger(125))
        .add(chars, {
            y: el => +el.dataset.line % 2 ? '100%' : '-100%',
        }, stagger(10, { from: 'random' }))
        .init();

    /*LINEA DEL TIEMPO*/
    function show_time_line(elemento) {
        fetch('./experiencia.json')
            .then(res => res.json())
            .then(data => {
                var contenidoHTML = ``;
                var contenidoHTML_FINAL = ``;
                var miDiv = document.getElementById(`${elemento}`); //OBTENER CONTENEDOR
                //console.log(miDiv);

                contenidoHTML = `
                                    <section class="relative max-w-4xl mx-auto">
                                        <div class="timeline-line absolute left-8 md:left-10 top-0 w-1 h-full rounded-full"></div>
                                        <div id="timeline" class="space-y-10 md:space-y-12">`;

                data.forEach(function (item) {
                    //console.log(item.posicion);
                    //console.log(item.tecnologias.join(', '));

                    /*contenidoHTML += `
                                        <article class="timeline-item relative flex items-center" data-tags="">
                                            <div class="timeline-dot absolute left-4 md:left-6 w-8 h-8 bg-blue-500 rounded-full border-4 border-white/90 shadow-lg z-10"></div>
                                            <div class="timeline-content ml-20 bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-blue-300 font-semibold text-sm">${item.empresa}, ${item.periodo}</span>
                                                    <span class="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-xs">Tecnologias</span>
                                                </div>
                                                <h3 class="text-xl font-bold mb-1 text-white">${item.posicion}</h3>
                                                <p class="text-slate-200/90">${item.descripcion}</p>
                                            </div>
                                        </article>`;*/

                    contenidoHTML += `
                                        <article class="timeline-item relative flex items-center" data-tags="">
                                            <div class="timeline-dot absolute left-4 md:left-6 w-8 h-8 bg-blue-500 rounded-full border-4 border-white/90 shadow-lg z-10"></div>
                                            <div class="timeline-content ml-20 bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-blue-300 font-semibold text-sm">${item.empresa}, ${item.periodo}</span>
                                                </div>
                                                <h3 class="text-xl font-bold mb-1 text-white">${item.posicion}</h3>
                                                <p class="text-slate-200/90">${item.descripcion}</p>
                                            </div>
                                        </article>`;
                });
                contenidoHTML += `</div></section>`;
                //console.log(contenidoHTML);
                miDiv.innerHTML = contenidoHTML;
            });
    };

    show_time_line('linea_tiempo1'); //MANDA LLAMAR LA CREACION

    // Animate timeline items on scroll
    function animateOnScroll() {
        const items = document.querySelectorAll(".timeline-item");
        items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const visible = rect.top < window.innerHeight - 40 && rect.bottom > 0;
            if (visible) item.classList.add("animate");
        });
    }

    window.addEventListener("scroll", animateOnScroll);
    window.addEventListener("load", animateOnScroll);
    setTimeout(animateOnScroll, 400);

    /*PROYECTOS*/
    function show_proyectos(elemento) {
        fetch('./proyectos.json')
            .then(res => res.json())
            .then(data => {
                var contenidoHTML = ``;
                var contenidoHTML_FINAL = ``;
                var miDiv = document.getElementById(`${elemento}`); //OBTENER CONTENEDOR
                //console.log(miDiv);

                let filas = Math.ceil(data.length / 2); //calcular cantidad de filas segun cantidad proyectos

                /*contenidoHTML = `
                                    <div style="display: grid; grid-template-columns: repeat(${2}, 1fr); grid-template-rows: repeat(${filas}, 1fr); gap: 8px; margin:1% 5%;padding:20px;">
                                    
                    `;*/
                contenidoHTML = `
                    <div style="
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                        gap: 16px;
                        margin:1% 5%;
                        padding:20px;
                    ">
                `;

                data.forEach(function (item) {
                    const tecnologias = item.tecnologias.join(", ");
                    contenidoHTML += `
                                        <a href="${urlProyectos}?nombre=${item.nombre}">
                                            <div class="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-blue-300 font-semibold text-sm"></span>
                                                    <span class="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-xs">${tecnologias}</span>
                                                </div>
                                                <h3 class="text-xl font-bold mb-1 text-white">${item.nombre}</h3>
                                                <p class="text-slate-200/90">${item.descripcion}</p>
                                            </div>
                                        </a>`;
                });
                contenidoHTML += `</div>`;
                //console.log(contenidoHTML);
                miDiv.innerHTML = contenidoHTML;
            });
    };

    show_proyectos('proyectos1'); //MANDA LLAMAR LA CREACION

    /*HABILIDADES */
    function show_habilidades(elemento) {
        fetch('./conocimiento.json')
            .then(res => res.json())
            .then(data => {
                var contenidoHTML = ``;
                var contenidoHTML_FINAL = ``;
                var miDiv = document.getElementById(`${elemento}`); //OBTENER CONTENEDOR
                //console.log(miDiv);

                let filas = Math.ceil(data.length / 2); //calcular cantidad de filas segun cantidad proyectos


                contenidoHTML = `
                                    <div style="display: grid; grid-template-columns: repeat(${2}, 1fr); grid-template-rows: repeat(${filas}, 1fr); gap: 8px;margin:1% 5%;padding:20px;">
                                    
                    `;

                data.forEach(function (item) {
                    contenidoHTML += `
                        <div class="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                            <h3 class="text-xl font-bold mb-1 text-white">${item.ambito}</h3>
                            <ul>
                    `;
                    item.lista.forEach(function (itemList) {
                        contenidoHTML += `<li class="text1">${itemList.nombre}</li>`;
                    });
                    contenidoHTML += `</ul></div>`;
                });
                contenidoHTML += `</div>`;
                //console.log(contenidoHTML);
                miDiv.innerHTML = contenidoHTML;
            });
    };

    show_habilidades('habilidades1'); //MANDA LLAMAR LA CREACION

    /*CERTIFICADOS */
    function show_certificaciones(elemento) {
        fetch('./certificados.json')
            .then(res => res.json())
            .then(data => {
                var contenidoHTML = ``;
                var contenidoHTML_FINAL = ``;
                var miDiv = document.getElementById(`${elemento}`); //OBTENER CONTENEDOR
                //console.log(miDiv);

                let elementos_por_fila = 1;
                let filas = Math.ceil(data.length / elementos_por_fila); //calcular cantidad

                contenidoHTML = `
                                    <div style="display: grid; grid-template-columns: repeat(${elementos_por_fila}, 1fr); grid-template-rows: repeat(${filas}, 1fr); gap: 8px;">
                                    
                    `;

                data.forEach(function (item) {

                    contenidoHTML += `
                        <div style="
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            align-items: center;
                            background: rgba(255,255,255,0.1);
                            padding: 10px;
                            border-radius: 10px;">
                            <span class="text1" style="text-align: center;">
                                ${item.certificado}
                            </span>

                            <div style="text-align: center;">
                                <button class="boton_estilo" onclick="mostrarModal('${item.imagen}')">
                                    Ver
                                </button>
                            </div>
                        </div>`;
                });

                //console.log(contenidoHTML);
                miDiv.innerHTML = contenidoHTML;
            });
    };

    show_certificaciones('certificaciones1'); //MANDA LLAMAR LA CREACION


});


