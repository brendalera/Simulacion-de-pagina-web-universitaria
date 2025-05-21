let materias = [];
let misMaterias = [];

fetch('http://localhost:3000/data/materias.json')
    .then(res => res.json())
    .then(data => {
        materias = data;
        mostrarMisMaterias();
    })
    .catch(error => {
        console.error("Error al cargar materias:", error);
    });

function mostrarMisMaterias(){
    misMaterias = materias.filter(materia => materia.estaInscripto);
    const section = document.getElementById("container-mis-materias");
    section.innerHTML = '';
    misMaterias.forEach(materia => {
        const card = document.createElement("article");
        card.id = "materiaInscripta" + materia.id;
        card.innerHTML = `
        <div id="materiaInscripta${materia.id}" class="card" style="width: 18rem;">
            <img src="../recursos/img/fondo.jpg" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${materia.nombre}</h5>
                <p class="card-text">${materia.cuatrimestre}</p>
                <p class="card-text">${materia.descripcion}</p>
                <a href="#" class="btn btn-info" id="materia${materia.id}" >Dar debaja</a>
            </div>
        </div>`
        const boton = card.querySelector(`#materia${materia.id}`);
        boton.addEventListener("click", () => darDeBajaAMateria(materia.id, materia.nombre));
        section.appendChild(card);
    });
}

function darDeBajaAMateria(id, nombre){
    const cardMateria = document.getElementById(`materiaInscripta${id}`);
    if (cardMateria){
        cardMateria.remove()
        alert("Te diste debaja en la materia " + nombre);
        materias.map(materia => {
            if(materia.id == id){
                materia.estaInscripto = false;
                materia.cantidadDeInscriptos -= 1;
                return materia
            }
        })
    }else{
        console.log(`No se encontró la card con ID materiaRecomendada_${id} o materiaDisponible_${id}`);
    }
}
