import { createAnimatable, utils, createTimeline, stagger, splitText } from 'animejs';

document.addEventListener("DOMContentLoaded", () => {

    /*Move cursor */
    const $demos = document.querySelector('#docs-demos');
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
    $demos.addEventListener('scroll', refreshBounds);

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


    /*=-=-=-=-=-=-= FONDO =-=-=-=-=-=-= */
    const colores = ['#fff2', '#fff4', '#fff7', '#fffc'
    ];
    const generateSpaceLayer = (selector, size, totalStars, duration) => {
        const layer = [];
        for (let i = 0; i < totalStars; i++) {
            const color = colores[Math.floor(Math.random() * colores.length)
            ];
            const x = Math.floor(Math.random() * 100);
            const y = Math.floor(Math.random() * 100);
            layer.push(`${x
                }vw ${y
                }vh 0 ${color
                },
    ${x
                }vw ${y + 100
                }vh 0 ${color
                }`);
        }
        const container = document.querySelector(selector);
        container.style.setProperty('--space-layer', layer.join(','));
        container.style.setProperty('--size', size);
        container.style.setProperty('--duration', duration);
    }
    /*clase del div, tamanio de las estrellas, cantidad de estrellas, duracion*/
    generateSpaceLayer('.space-1', '1px',
        200, '25s');
    generateSpaceLayer('.space-2', '2px',
        100, '20s');
    generateSpaceLayer('.space-3', '4px',
        50, '15s');

    /* Crear linea del tiempo*/
    function mostrarDatos(datos, idElemento) {
        // Convertir el objeto JSON a una cadena JSON
        var jsonData = JSON.stringify(datos, null, 2);

        // Obtener el elemento pre donde se mostrará el JSON
        var preElement = document.getElementById(idElemento);

        // Asignar la cadena JSON al contenido del elemento pre
        preElement.textContent = jsonData;
    };

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

                data.forEach(function(item){
                    //console.log(item.posicion);
                    //console.log(item.tecnologias.join(', '));
                   
                    contenidoHTML += `
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
                                        </article>`;
                });
                contenidoHTML += `</div></section>`;
                //console.log(contenidoHTML);
                miDiv.innerHTML = contenidoHTML;
            });
    };

    show_time_line('linea_tiempo1'); //MANDA LLARMA LA CREACION

    // Animate timeline items on scroll
    function animateOnScroll() {
        const items = document.querySelectorAll(".timeline-item");
        items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const visible = rect.top < window.innerHeight - 40 && rect.bottom > 0;
            if (visible) item.classList.add("animate");
        });
    }
    // Simple search filter by text and tags
    function filterTimeline(value) {
        const v = value.trim().toLowerCase();
        const items = document.querySelectorAll("#timeline .timeline-item");
        items.forEach((it) => {
            const text = it.innerText.toLowerCase();
            const tags = (it.getAttribute("data-tags") || "").toLowerCase();
            const match = !v || text.includes(v) || tags.includes(v);
            it.style.display = match ? "" : "none";
        });
    }
    // Toggle References
    /*const refs = document.getElementById("refs");
    const btnRefs = document.getElementById("toggleRefs");
    btnRefs.addEventListener("click", () => {
        const hidden = refs.classList.toggle("hidden");
        btnRefs.textContent = hidden ?
            "Mostrar referencias" :
            "Ocultar referencias";
        if (!hidden)
            refs.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    })
    // Search input behavior
    const input = document.getElementById("search");
    input.addEventListener("input", (e) => filterTimeline(e.target.value));
    // keyboard shortcuts: focus search
    window.addEventListener("keydown", (e) => {
        const combo =
            (e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/";
        if (combo) {
            e.preventDefault();
            input.focus();
        }
    });*/
    // Init
    window.addEventListener("scroll", animateOnScroll);
    window.addEventListener("load", animateOnScroll);
    setTimeout(animateOnScroll, 400);

});


