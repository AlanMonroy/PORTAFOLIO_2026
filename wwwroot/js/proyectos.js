const e=document.getElementById("imagenes_proyecto"),o=JSON.parse(e.dataset.imagenes);var n="";o.forEach(t=>{n+=`
        <img src="${t}"/>
    `});e.innerHTML=n;
