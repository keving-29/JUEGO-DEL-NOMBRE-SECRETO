// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Lista donde se guardarán los nombres ingresados
let listaAmigos = [];

function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre === '') {
        alert('Por favor, escribe un nombre válido.');
        return;
    }

    if (listaAmigos.includes(nombre)) {
        alert('Este nombre ya fue ingresado.');
        input.value = '';
        return;
    }

    listaAmigos.push(nombre);
    mostrarListaAmigos();
    input.value = '';
}

function mostrarListaAmigos() {
    const ul = document.getElementById('listaAmigos');
    ul.innerHTML = '';

    // Ordenar alfabéticamente
    const listaOrdenada = [...listaAmigos].sort();

    listaOrdenada.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${index + 1}.</strong> ${amigo}`;

        // Botón eliminar
        const btn = document.createElement('button');
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.classList.add('btn-delete');
        btn.onclick = () => eliminarAmigo(listaAmigos.indexOf(amigo));
        li.appendChild(btn);

        li.classList.add('cuadro'); // Añadir clase de estilo
        ul.appendChild(li);
    });
}

function eliminarAmigo(index) {
    listaAmigos.splice(index, 1);
    mostrarListaAmigos();
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert('Se necesitan al menos 2 amigos para sortear.');
        return;
    }

    let amigosOriginal = [...listaAmigos];
    let amigosAsignados = [...listaAmigos];

    // Intentar generar una asignación válida
    let resultado = {};
    let intentos = 0;
    let valido = false;

    while (!valido && intentos < 100) {
        valido = true;
        shuffleArray(amigosAsignados);

        for (let i = 0; i < amigosOriginal.length; i++) {
            if (amigosOriginal[i] === amigosAsignados[i]) {
                valido = false;
                break;
            }
        }

        intentos++;
    }

    if (!valido) {
        alert('No fue posible realizar el sorteo sin asignaciones duplicadas. Intenta nuevamente.');
        return;
    }

    // Mostrar resultados
    // Mostrar resultados en cuadros enumerados
    const ulResultado = document.getElementById('resultado');
    ulResultado.innerHTML = '';
     for (let i = 0; i < amigosOriginal.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${i + 1}.</strong> ${amigosOriginal[i]} → 🎁 ${amigosAsignados[i]}`;
    li.classList.add('cuadro');
    ulResultado.appendChild(li);
}


}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
