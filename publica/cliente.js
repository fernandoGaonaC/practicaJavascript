async function login() {

    const nombre = document.getElementById("nombre").value;
    const clave = document.getElementById("clave").value;

    const respuesta = await fetch("/login", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nombre: nombre,
            clave: clave
        })
    });

    if (respuesta.ok) {

        const token = await respuesta.text();

        localStorage.setItem("token", token);

        document.getElementById("mensaje").textContent =
            "Login correcto. Token obtenido.";

        console.log("TOKEN:", token);

    } else {

        document.getElementById("mensaje").textContent =
            "Usuario o contraseña incorrectos.";
    }
}
async function obtenerNoticias() {

    const token = localStorage.getItem("token");

    const respuesta = await fetch("/noticias", {

        method: "GET",

        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (respuesta.ok) {

        const noticias = await respuesta.json();

        const lista = document.getElementById("listaNoticias");

        lista.innerHTML = "";

        noticias.forEach(function(noticia) {

            const elemento = document.createElement("li");

            elemento.textContent =
                noticia.id + " - " + noticia.titulo;

            lista.appendChild(elemento);
        });

    } else {

        alert("No tienes autorización para acceder a las noticias.");
    }
}

async function cerrarSesion() {
    
    localStorage.removeItem("token");
}