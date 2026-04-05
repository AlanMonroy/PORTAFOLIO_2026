import { createAnimatable, utils, createTimeline, stagger, splitText } from 'animejs';

console.log("JS cargado");

document.addEventListener("DOMContentLoaded", () => {

    /*Move cursor */
    const $demos = document.querySelector('#docs-demos');
    const $demo = document.querySelector('.docs-demo.is-active');
    console.log($demos);
    console.log($demo);

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



});


