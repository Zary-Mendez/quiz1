const registrosForm = document.forms["registroForm"];
const codigoErrorMsg = document.getElementById("codigoErrorMsg");
const notaErrorMsg = document.getElementById("notaErrorMsg");
const codigoInp = registrosForm["codigoInp"];
const listaRegistros = document.getElementById('listaRegistros');

const validarCodigo = (codigo) => {
    codigoErrorMsg.textContent = "";
    if (codigo === codigoInp){
        codigoErrorMsg.textContent = "El codigo ya existe";
}};

const validarNota = (nota1) => {
    notaErrorMsg.textContent = "";
    if (nota1>0 && nota1<5){
    notaErrorMsg.textContent = "la nota debe estar entre 0.0 y 5.0";
}};

const cargarRegistro = (registro) => {
    const row = document.createElement('tr');

    const codigoCeld = document.createElement('td');
    codigoCeld.textContent = registro.codigo;

    const nombreCeld = document.createElement('td');
    nombreCeld.textContent = registro.nombre;

    const nota1Celd = document.createElement('td');
    nota1Celd.textContent = registro.nota1;

    const nota2Celd = document.createElement('td');
    nota1Celd.textContent = registro.nota2;

    const nota3Celd = document.createElement('td');
    nota1Celd.textContent = registro.nota3;

    const nota4Celd = document.createElement('td');
    nota1Celd.textContent = registro.nota4;

    const btnCeld = document.createElement('td');
    const eleminiarBtn = document.createElement('button');
    eleminiarBtn.textContent = 'Borrar';
    eleminiarBtn.addEventListener('click',()=>{
        row.remove();
    });
    btnCeld.appendChild(eleminiarBtn);


    row.appendChild(codigoCeld);
    row.appendChild(nombreCeld);
    row.appendChild(nota1Celd);
    row.appendChild(nota2Celd);
    row.appendChild(nota3Celd);
    row.appendChild(nota4Celd);

    const tbody = listaRegistros.getElementsByTagName('tbody')[0];
    tbody.appendChild(row);
}
registrosForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nombre = codigoInp.value;
    if (validarNombre(nombre)) {
      const registro = {
          codigo: codigoInp.value,
          nombre: registrosForm['nombreInp'].value,
          nota1: registrosForm['nota1Inp'].value,
          nota2: registrosForm['nota2Inp'].value,
          nota3: registrosForm['nota3Inp'].value,
          nota4: registrosForm['nota4Inp'].value,
      };
      cargarContacto(registro);
      registrosForm.reset();
    }
  });
  
  codigoInp.addEventListener("keyup", () => validarCodigo(codigoInp.value));