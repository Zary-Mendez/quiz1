const registroForm = document.forms["registroForm"]
const codigomsg = document.getElementById("codigomsg")
const validarMsg = document.getElementById('validarMsg')
const codigosRegistrados = []
const modalmsg = document.getElementById("modalmsg")
const codigoInp = registroForm["codigoInp"]
const notasEstudiantes = document.getElementById("notasEstudiantes")
const modal = document.getElementById("model")
const botonConfirmar = document.getElementById("confirmar")
const botonCancelar = document.getElementById("cancelar")
let filaEliminar = null
let codigoAEliminar = null
const mostrarModal = () => {
  modal.style.display = "flex"
}
const ocultarModal = () => {
  modal.style.display = "none"
}



const cargarNotas = (nota) => {
  const row = document.createElement("tr")

  const buttonCeld = document.createElement("td")
  const button = document.createElement("button")
  button.textContent = "Eliminar"
  button.className = "boton"
  buttonCeld.appendChild(button)
  
  button.addEventListener('click', () => {
    filaEliminar = row
    codigoAEliminar = nota.codigo
    mostrarModal()
  })
  
  const codigoCeld = document.createElement("td")
  codigoCeld.textContent = nota.codigo;

  const nombreCeld = document.createElement("td")
  nombreCeld.textContent = nota.nombre;

  const nota1Celd = document.createElement("td")
  nota1Celd.textContent = nota.nota1;

  const nota2Celd = document.createElement("td")
  nota2Celd.textContent = nota.nota2;

  const nota3Celd = document.createElement("td")
  nota3Celd.textContent = nota.nota3;

  const nota4Celd = document.createElement("td")
  nota4Celd.textContent = nota.nota4;

  
  const definitiva = (parseFloat(nota.nota1) * 0.2) + (parseFloat(nota.nota2) * 0.2) + (parseFloat(nota.nota3) * 0.2) + (parseFloat(nota.nota4) * 0.4)
  const definitivaCeld = document.createElement('td')
  definitivaCeld.textContent = definitiva.toFixed(2)

  
  const aprobadoCeld = document.createElement('td')
  aprobadoCeld.textContent = definitiva >= 3.0 ? 'Aprobado' : 'No Aprobado'

  row.appendChild(buttonCeld)
  row.appendChild(buttonCeld)
  row.appendChild(codigoCeld)
  row.appendChild(nombreCeld)
  row.appendChild(nota1Celd)
  row.appendChild(nota2Celd)
  row.appendChild(nota3Celd)
  row.appendChild(nota4Celd)
  row.appendChild(definitivaCeld)
  row.appendChild(aprobadoCeld)

  const tbody = estudiantes.getElementsByTagName("tbody")[0]
  tbody.appendChild(row)

   
    button.addEventListener("click", () => {
      filaEliminar = row
      mostrarModal()
    })
}


registroForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const nuevoCodigo = registroForm["codigoInp"].value

  
  if (codigosRegistrados[nuevoCodigo]) {
      codigomsg.style.display = 'block'
      return
  }
  const notas = [
    parseFloat(registroForm["nota1Inp"].value),
    parseFloat(registroForm["nota2Inp"].value),
    parseFloat(registroForm["nota3Inp"].value),
    parseFloat(registroForm["nota4Inp"].value),
  ];

  for (let nota of notas) {
    if (isNaN(nota) || nota < 0 || nota > 5) {
      validarMsg.style.display='block'
      return
    }
  }
  
  codigosRegistrados[nuevoCodigo] = true

  const nota = {
      codigo: nuevoCodigo,
      nombre: registroForm["nombreInp"].value,
      nota1: registroForm["nota1Inp"].value,
      nota2: registroForm["nota2Inp"].value,
      nota3: registroForm["nota3Inp"].value,
      nota4: registroForm["nota4Inp"].value,
  }

  cargarNotas(nota)
})


document.getElementById("errorCodigo").addEventListener("click", () => {
  codigomsg.style.display = 'none'
})

 
  botonConfirmar.addEventListener("click", () => {
    if (filaEliminar) {
      filaEliminar.remove()
      delete codigosRegistrados[codigoAEliminar]
      filaEliminar = null
      codigoAEliminar = null
    }
    ocultarModal()
  })
  
  
  botonCancelar.addEventListener("click", () => {
    filaEliminar = null
    codigoAEliminar = null
    ocultarModal()
  })
  