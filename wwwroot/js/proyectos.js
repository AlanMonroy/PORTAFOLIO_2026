document.addEventListener("DOMContentLoaded",()=>{i(),d()});function r(e){try{return JSON.parse(e)}catch{return e}}function i(){const e=document.getElementById("imagenes_proyecto");if(!e)return;const n=r(e.dataset.imagenes);if(!(!Array.isArray(n)||n.length===0)){var t="";n.forEach(o=>{t+=`<img src="${o}" />`}),e.innerHTML=t}}function d(){const e=document.getElementById("video_proyecto");if(!e)return;const n=r(e.dataset.video);!n||n.trim()===""||(e.innerHTML=`
        <video controls>
            <source src="${n}" type="video/mp4">
            Tu navegador no soporta video.
        </video>
    `)}
