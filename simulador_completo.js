
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;


//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

//💻 Manipulación de clases con JavaScript
//Forma paso a paso (3 líneas)
// Recupera el componente
// let componente= document.getElementById("parametros");
// Recupera la lista de clases del componente
//let listaClass=componente.classList;
// Agrega o elimina la clase
//listaClass.add("activa");
//listaClass.remove("activa");
//Podemos evitar variables temporales encadenando llamadas:
//Forma simplificada (una sola línea)
//document.getElementById("parametros").classList.add("activa");
//
//️Actividades
//a) Crear función ocultarSecciones()
function ocultarSecciones() {
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
}
//b) Crear función mostrarSeccion(id)
function mostrarSecciones(id) {
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");

}
//PARTE 2: CONFIGURAR TASA

function guardarTasa() {

  tasaInteres = recuperarInt("tasaInteres")
  if (tasaInteres >= 10 && tasaInteres <= 20) {
    mostrarTexto("mensajeTasa", "✅ Tasa configurada correctamente: " + tasaInteres + "%")
  } else {
    mostrarTexto("mensajeTasa", "❌ La tasa debe estar entre 10% y 20%")
  }

}

//PARTE 3: ADMINISTRACIÓN DE CLIENTES
//🧱 PARTE A: CREAR Y LISTAR CLIENTES
//let clientes = []; está creadad arriba como global
//️Función guardarCliente()
function guardarCliente() {
  //ÚLTIMO PASO DEL DOCUMENTO SIMULADOR 2 
  /* ✔ Si NO existe → crear
    ✔ Si existe → actualizar (excepto cédula)*/

  //1. Obtener datos del formulario
  let cedula = recuperaraTexto("txtCedula");


  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
  //2. Convertir valores numéricos
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");
  //✔ Si NO existe → crear
  //Variable del objeto si lo encuntra
  let busquedaCliente = buscarCliente(cedula);
  if (busquedaCliente == null) {
    //3. Crear objeto cliente
    let cliente = {};
    //4. Agregarlo al arreglo
    cliente.cedula = cedula;
    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.ingresos = ingresos;
    cliente.egresos = egresos;
    clientes.push(cliente);
    pintarClientes();
  } else {
    alert("cliente ya existe, Actualizando...");
    //document.getElementById("txtCedula");
    //document.getElementById("txtCedula").readOnly = true;
    //seleccionarCliente(cedula);
    clienteSeleccionado.nombre = nombre;
    clienteSeleccionado.apellido = apellido;
    clienteSeleccionado.ingresos = ingresos;
    clienteSeleccionado.egresos = egresos;
    pintarClientes()
  }
}

//Función pintarClientes()
function pintarClientes() {

  //Recorrer el arreglo
  let idTablitaDinamica = document.getElementById("tablaClientes");
  let tablitaDinamica = "";
  let persona;
  for (let i = 0; i < clientes.length; i++) {
    //Generar filas <tr> dinámicamente
    persona = clientes[i];
    //3.-Insertarlas en: <tbody id="tablaClientes"></tbody>
    tablitaDinamica += "<tr>"
    tablitaDinamica += "<td>" + persona.cedula + "</td>" +
      "<td>" + persona.nombre + "</td>" +
      "<td>" + persona.apellido + "</td>" +
      "<td>" + persona.ingresos + "</td>" +
      "<td>" + persona.egresos + "</td>" +
      "<td>" +
      "<button onclick='seleccionarCliente(\"" + persona.cedula + "\");'>Actualizar</button>" +
      "</td>" +
      "</tr>" +
      "</tbody>"
  }
  idTablitaDinamica.innerHTML = tablitaDinamica;
}

//VALIDAR--Validaciones --VALIDACIONES_CLIENTES.JS
//
//PARTE B: BUSCAR Y ACTUALIZAR
//Función buscarCliente(cedula)
function buscarCliente(cedula) {
  let cedulaEncontrada;
  let clienteExiste = null;
  for (let i = 0; i < clientes.length; i++) {
    cedulaEncontrada = clientes[i];
    if (cedulaEncontrada.cedula == cedula) {
      clienteExiste = cedulaEncontrada;
      console.log("Ya existe");
      return clienteExiste;
    }

  }
  return clienteExiste;
}
//
//Función seleccionarCliente(cedula)
function seleccionarCliente(cedula) {
  let cedulaSeleccionada = cedula
  let buscarCliente;
  for (i = 0; i < clientes.length; i++) {
    buscarCliente = clientes[i]
    if (cedulaSeleccionada == buscarCliente.cedula) {
      clienteSeleccionado = buscarCliente
      alert("Actualizar datos de: " + clienteSeleccionado.cedula);
      //document.getElementById("txtCedula").readOnly = true;
      mostrarTextoEnCaja("txtCedula", clienteSeleccionado.cedula);
      mostrarTextoEnCaja("txtNombre", clienteSeleccionado.nombre);
      mostrarTextoEnCaja("txtApellido", clienteSeleccionado.apellido);
      mostrarTextoEnCaja("txtIngresos", clienteSeleccionado.ingresos);
      mostrarTextoEnCaja("txtEgresos", clienteSeleccionado.egresos);
    }
  }
  return clienteSeleccionado;


}

function limpiar() {
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("txtIngresos", "");
  mostrarTextoEnCaja("txtEgresos", ""); 
}