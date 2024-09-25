const registrosForm = document.forms["registroForm"];
const codigoErrorMsg = document.getElementById("codigoErrorMsg");
const notaErrorMsg = document.getElementById("notaErrorMsg");
const codigoInp = registrosForm["codigoInp"];
const listaRegistros = document.getElementById('listaRegistros');

// Verificar si el código ya existe
const codigoYaExiste = (codigo) => {
    const filas = listaRegistros.getElementsByTagName('tr');
    for (let fila of filas) {
        if (fila.cells[0].textContent === codigo) {
            return true;
        }
    }
    return false;
};

const validarCodigo = (codigo) => {
    codigoErrorMsg.textContent = "";
    if (codigoYaExiste(codigo)) {
        codigoErrorMsg.textContent = "El código ya existe";
    }
};

const validarNota = (nota) => {
    notaErrorMsg.textContent = "";
    if (nota < 0 || nota > 5) {
        notaErrorMsg.textContent = "La nota debe estar entre 0.0 y 5.0";
        return false;
    }
    return true;
};

const cargarRegistro = (registro) => {
    const row = document.createElement('tr');

    const codigoCeld = document.createElement('td');
    codigoCeld.textContent = registro.codigo;

    const nombreCeld = document.createElement('td');
    nombreCeld.textContent = registro.nombre;

    const nota1Celd = document.createElement('td');
    nota1Celd.textContent = registro.nota1;

    const nota2Celd = document.createElement('td');
    nota2Celd.textContent = registro.nota2;

    const nota3Celd = document.createElement('td');
    nota3Celd.textContent = registro.nota3;

    const nota4Celd = document.createElement('td');
    nota4Celd.textContent = registro.nota4;

    const btnCeld = document.createElement('td');
    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Borrar';
    eliminarBtn.addEventListener('click', () => {
        row.remove();
    });
    btnCeld.appendChild(eliminarBtn);

    row.appendChild(codigoCeld);
    row.appendChild(nombreCeld);
    row.appendChild(nota1Celd);
    row.appendChild(nota2Celd);
    row.appendChild(nota3Celd);
    row.appendChild(nota4Celd);
    row.appendChild(btnCeld);

    const tbody = listaRegistros.getElementsByTagName('tbody')[0];
    tbody.appendChild(row);
}

// Evento para el envío del formulario
registrosForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const codigo = codigoInp.value;
    const nombre = registrosForm['nombreInp'].value;

    // Validar código
    if (!validarCodigo(codigo)) {
        // Validar notas
        const registro = {
            codigo: codigo,
            nombre: nombre,
            nota1: parseFloat(registrosForm['nota1Inp'].value),
            nota2: parseFloat(registrosForm['nota2Inp'].value),
            nota3: parseFloat(registrosForm['nota3Inp'].value),
            nota4: parseFloat(registrosForm['nota4Inp'].value),
        };

        if (
            validarNota(registro.nota1) &&
            validarNota(registro.nota2) &&
            validarNota(registro.nota3) &&
            validarNota(registro.nota4)
        ) {
            cargarRegistro(registro);
            registrosForm.reset();
        }
    }
});

// Validar código en tiempo real
codigoInp.addEventListener("keyup", () => validarCodigo(codigoInp.value));
