let materias = [];
let materiasParaInscribirse = [];
let materiasRecomendadas = [];

fetch('http://localhost:3000/data/materias.json')
    .then(res => res.json())
    .then(data => {
        materias = data;
        mostrarMateriasRecomendadas();
        mostrarMateriasParaInscribirse();
    })
    .catch(error => {
        console.error("Error al cargar materias:", error);
    });

function mostrarMateriasRecomendadas(){
    materiasRecomendadas = materias.filter(materia => !materia.estaInscripto && materia.cupo > materia.cantidadDeInscriptos && materia.esRecomendada);
    const section = document.getElementById("container-materias-recomendadas");
    section.innerHTML = '';
    materiasRecomendadas.forEach(materia => {
        const card = document.createElement("article");
        card.id = "materiaRecomendada_" + materia.id;
        card.innerHTML = `
        <div id="materiaRecomendada_${materia.id}" class="card" style="width: 18rem;">
            <img src="../recursos/img/fondo.jpg" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${materia.nombre}</h5>
                <p class="card-text">${materia.cuatrimestre}</p>
                <p class="card-text">${materia.descripcion}</p>
                <a href="#" class="btn btn-info" id="materia${materia.id}" >Inscribirse</a>
            </div>
        </div>`
        const boton = card.querySelector(`#materia${materia.id}`);
        boton.addEventListener("click", () => inscribirseAMateria(materia.id, materia.nombre));
        section.appendChild(card);
    });
}

function mostrarMateriasParaInscribirse(){
    materiasParaInscribirse = materias.filter(materia => !materia.estaInscripto && materia.cantidadDeInscriptos < materia.cupo);
    const section = document.getElementById("container-materias");
    section.innerHTML = '';
    materiasParaInscribirse.forEach(materia => {
        const card = document.createElement("article");
        card.id = "materiaDisponible_" + materia.id;
        card.innerHTML = `
        <div id="materiaRecomendada_${materia.id}" class="card" style="width: 18rem;">
            <img src="../recursos/img/fondo.jpg" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${materia.nombre}</h5>
                <p class="card-text">${materia.cuatrimestre}</p>
                <p class="card-text">${materia.descripcion}</p>
                <a href="#" class="btn btn-info" id="materia${materia.id}" >Inscribirse</a>
            </div>
        </div>`
        const boton = card.querySelector(`#materia${materia.id}`);
        boton.addEventListener("click", () => inscribirseAMateria(materia.id, materia.nombre));
        section.appendChild(card);
    });
}

function inscribirseAMateria(id, nombre){
    const cardRecomendada = document.getElementById(`materiaRecomendada_${id}`);
    const cardDisponible = document.getElementById(`materiaDisponible_${id}`);
    if (cardRecomendada){
        cardRecomendada.remove()
        alert("Te inscribiste en la materia " + nombre);
        materias.map(materia => {
            if(materia.id == id){
                materia.estaInscripto = true;
                materia.cantidadDeInscriptos += 1;
                return materia
            }
        })
    }else if (cardDisponible){
        cardDisponible.remove()
        alert("Te inscribiste en la materia " + nombre);
        materias.map(materia => {
            if(materia.id == id){
                materia.estaInscripto = true;
                materia.cantidadDeInscriptos += 1;
                return materia
            }
        })
    }else{
        console.log(`No se encontró la card con ID materiaRecomendada_${id} o materiaDisponible_${id}`);
    }
}

