// ejercicio 1

function calcularIMC() {
  let peso = document.getElementById("peso").value;
  let altura = document.getElementById("altura").value;

  let imc = peso / (altura * altura);
  imc = imc.toFixed(2);

  document.getElementById("imc").value = imc;
}

// ejercicio 2

function convertir() {
  let valores = parseInt(document.getElementById("valor").value);
  let resultado = 0;
  let dolar = 230.6;

  //dolar a peso

  if (document.getElementById("uno").checked) {
    resultado = valores * dolar;
  }
  // peso a dolar
  else if (document.getElementById("dos").checked) {
    resultado = valores / dolar;
  }
  document.getElementById("cambio").innerHTML =
    "cambio: $" + resultado.toFixed(2);
}

// ejercicio 3

let formularioNotas = document.getElementById("formulario");
let tituloInput = document.getElementById("input-titulo");
let textarea = document.getElementById("textArea");
let btnborrar = document.querySelector('#formulario input[value="borrar"]');
let botonsumbit = document.getElementById("botonsumbit");
let boxNotas = document.getElementById("div-notas");
const inputDeBusqueda = document.getElementById("busqueda");
const checks = document.getElementById("realizadas");
let notas = [
  {
    titulo: "Ir hecer la  compra",
    descripcion: "Comida",
    realizada: false,
    id: 0,
  },
  {
    titulo: "Darle de comer al gato",
    descripcion: "Comida",
    realizada: false,
    id: 1,
  },
  {
    titulo: "Ir a Cocinar",
    descripcion: "Comida",
    realizada: false,
    id: 2,
  },
];
let idNotas = 3;

imprimirNotas(notas, boxNotas);

formularioNotas.addEventListener("submit", (e) => {
  e.preventDefault();
  if (tituloInput.value && textarea.value) {
    let nota = {
      titulo: tituloInput.value,
      descripcion: textarea.value,
      realizada: false,
      id: idNotas,
    };
    idNotas++;
    reiniciarForm(tituloInput, textarea);
    notas.push(nota);
    imprimirNotas(notas, boxNotas);
  } else {
    alert("Todos los campos son obligatorios");
  }
  console.log(notas);
});

btnborrar.addEventListener("click", () => {
  reiniciarForm(tituloInput, textarea);
});

boxNotas.addEventListener("click", (e) => {
  let dataSet = e.target.dataset;
  console.log([e.target]);
  if (dataSet.accion == "borrar") {
    notas = notas.filter((nota) => nota.id != dataSet.id);

    imprimirNotas(notas, boxNotas);
  }
  if (dataSet.accion == "estado") {
    const nota = notas.find((nota) => nota.id == dataSet.id);
    nota.realizada = !nota.realizada;
  }
});

inputDeBusqueda.addEventListener("input", () => {
  const filtrarPorBusqueda = filtrarPorTitulo(notas, inputDeBusqueda.value);
  if (checks.checked) {
    const filtradoPorRealizadas = filtrarPorRealizadas(filtrarPorBusqueda);
    imprimirNotas(filtradoPorRealizadas, boxNotas);
  } else {
    imprimirNotas(filtrarPorBusqueda, boxNotas);
  }
});

checks.addEventListener("change", () => {
  const filtrarPorBusqueda = filtrarPorTitulo(notas, inputDeBusqueda.value);
  if (checks.checked) {
    const filtradoPorRealizadas = filtrarPorRealizadas(filtrarPorBusqueda);
    imprimirNotas(filtradoPorRealizadas, boxNotas);
  } else {
    imprimirNotas(filtrarPorBusqueda, boxNotas);
  }
});

function filtrarPorRealizadas(notas) {
  return notas.filter((nota) => nota.realizada);
}

function filtrarPorTitulo(notas, busqueda) {
  return notas.filter((nota) =>
    nota.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );
}

function reiniciarForm(input, text) {
  input.value = "";
  text.value = "";
}

function imprimirNotas(notas, contenedor) {
  let template = "";
  for (let nota of notas) {
    template += crearArticle(nota);
  }
  contenedor.innerHTML = template;
}

function crearArticle(nota) {
  let estado = "";
  if (nota.realizada) {
    estado = "checked";
  }
  return `<article class="card col-3">
                <header class="card-header">
                    <div class="form-check">
                        <input class="form-check-input" data-accion="estado" data-id="${nota.id}" type="checkbox" ${estado} value="" id="">
                        ${nota.titulo}
                    </div>
                </header>
                <div class="card-body"> <p> ${nota.descripcion} </p> </div>
                <footer class="card-footer d-flex justify-content-center">
                    <button class="btn btn-danger" data-accion="borrar" data-id="${nota.id}">Borrar nota</button>
                </footer>
            </article>
`;
}
