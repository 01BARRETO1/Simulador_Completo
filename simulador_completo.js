
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
  document.getElementById("credito").classList.remove("activa");
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
      "<button onclick='eliminarCliente(\"" + persona.cedula + "\");'>Eliminar</button>"
      "</td>" +
      "</tr>" 
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

//funcion eliminar
function eliminarCliente(cedula) {

    if (!confirm("¿Está seguro de eliminar este cliente?")) {
        return;
    }

    for (let i = 0; i < clientes.length; i++) {

        if (clientes[i].cedula == cedula) {

            clientes.splice(i, 1);

            pintarClientes();
            limpiar();

            clienteSeleccionado = null;

            alert("Cliente eliminado correctamente.");

            return;
        }
    }

    alert("Cliente no encontrado.");
}

function limpiar() {
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("txtIngresos", "");
  mostrarTextoEnCaja("txtEgresos", "");
  clienteSeleccionado = null;

  // Quitar todas las validaciones visuales
  limpiarErroresCliente();
  // Colocar el cursor nuevamente en la cédula
    document.getElementById("txtCedula").focus();
}

/* 🧪 TALLER DE SIMULACIÓN DE
CRÉDITO – PARTE 2 */

//Parte 2: Crear la función clienteValdo
function buscarClienteCredito() {
  // Limpiar la selección anterior
  clienteSeleccionado = null;
  //1. Tomar el valor ingresado en el campo de cédula.
  let txtCedula = recuperaraTexto("buscarCedulaCredito");
  //2. Buscar el cliente dentro del arreglo de clientes.
  let clienteValido = buscarCliente(txtCedula);
  //3. Si el cliente existe, mostrar sus datos en pantalla.
  let mostrarDatos = document.getElementById("datosClienteCredito");
   if (clienteValido != null) {
    //  Guardamos el cliente para usarlo después
    clienteSeleccionado = clienteValido;
    
    let datosCliente = "<h3>Datos del Cliente</h3><br>" +
      "<p><strong>Cédula: </strong>" + clienteValido.cedula + "</p><br>" +
      "<p><strong>Nombre: </strong>" + clienteValido.nombre + "</p><br>" +
      "<p><strong>Apellido: </strong>" + clienteValido.apellido + "</p><br>" +
      "<p><strong>Ingresos: </strong>" + clienteValido.ingresos + "</p><br>" +
      "<p><strong>Egresos: </strong>" + clienteValido.egresos + "</p>";
    mostrarDatos.innerHTML = datosCliente;
  }else{
    // Si no existe, dejamos la variable en null
    clienteSeleccionado = null;
    //4. Si el cliente no existe, mostrar un mensaje indicando que no fue encontrado.
    mostrarDatos.innerHTML = "<h3>🧱Cliente NO encontrado🧱</h3>";
    let resultado = document.getElementById("resultadoCredito");
    let mostrarEnPantalla="";
    resultado.innerHTML=mostrarEnPantalla;
    mostrarTextoEnCaja("montoCredito","");
    mostrarTextoEnCaja("plazoCredito","");
  }
}

//Parte 4: Reutilizar el simulador de crédito

function calcularDisponibilidad(ingresos, egresos) {
    let total = ingresos - egresos
    if (total < 0) {
        total = 0;
        return total
    }
    return total
}

function calcularCapacidadDePago(montoDisponible){
    let capacidadDePago=montoDisponible*0.50
    return capacidadDePago
}

function calcularInteresSimple(monto,plazoanios,tasa){
    let valorInteres = (plazoanios*monto)*(tasa/100);
    return valorInteres;

}

function calcularTotalPagar(monto,interes){
    let valorTotalPagar=monto+interes+100;
    return valorTotalPagar;

}

function calcularCuotaMensual(total, plazoAnios){
    let meses=plazoAnios*12;
    let cuotaMensual= total/meses;
    return cuotaMensual;

}

function aprobarCredito(capacidadDePago,cuotaMensual){
    if(capacidadDePago>cuotaMensual){
        
        return true;
    }else{
        return false;
    }

    
}

function calcularCredito(){
  // Verificar que primero se haya buscado un cliente
    if (clienteSeleccionado == null) {
      alert("Primero busque un cliente válido.");
      return;
    }
  // ===== VALIDAR QUE EXISTA UNA CÉDULA =====
    let cedula = recuperaraTexto("buscarCedulaCredito");

    if (cedula === "") {
        alert("Ingrese la cédula del cliente.");
        return;
    }

  // ===== VALIDAR QUE EL CLIENTE EXISTA =====
    let cliente = buscarCliente(cedula);

    if (cliente == null) {
        alert("Cliente no encontrado.");
        return;
    }

  // ===== VALIDAR MONTO =====
    let monto = recuperarFloat("montoCredito");

    if (isNaN(monto) || monto <= 0) {
        alert("Ingrese un monto de crédito válido.");
        return;
    }

  // ===== VALIDAR PLAZO =====
    let plazo = recuperarInt("plazoCredito");

    if (isNaN(plazo) || plazo <= 0) {
        alert("Ingrese un plazo válido.");
        return;
    }
  //Leer el valor de ingresos (float) 
    let ingresos = clienteSeleccionado.ingresos;
    // Leer el valor de egresos (float) 
    let egresos = clienteSeleccionado.egresos;
    //Llamar a la función calcularDisponible y 
    //guardar el retorno en una variable
    let tenemos = calcularDisponibilidad(ingresos, egresos);
    //Mostrar en pantalla, en el componente resultadoCredito
    let resultado = document.getElementById("resultadoCredito");
    let mostrarEnPantalla="<p><strong>Disponibilidad: </strong>" + "USD" + " " + tenemos.toFixed(2)+"</p><br>";
    /* //Llamar a la función calcularCapacidadPago y guardar el retorno en una
     variable. Para calcular la capacidad de Pago, se le pasa como parámetro el
     valor que ya se obtuvo disponible cuando se invocó a calcularDisponible.  */
    let capacidadDePago = calcularCapacidadDePago(tenemos);
    //Mostrar en pantalla, en el componente resultadoCredito 
    //let dineroDisponible = document.getElementById("resultadoCredito");
    mostrarEnPantalla +="<p><strong>Capacidad de pago: </strong>" + "USD" + " " + capacidadDePago.toFixed(2)+"</p><br>";

    //calcular Interes Simple, leer los valores:
    //monto solicitado:
    let txtMontoSolicitado = document.getElementById("montoCredito");
    let montoSolicitadoInt = txtMontoSolicitado.value;
    let montoSolicitado = parseInt(montoSolicitadoInt);
    //plazo en años
    let plazoAnios = recuperarInt("plazoCredito");
    //tasa anual simple
    let tasaAnual = recuperarInt("tasaInteres");
    let totalInteresSimple = calcularInteresSimple(montoSolicitado, plazoAnios, tasaAnual);
    //Mostrar en pantalla, en el componente resultadoCredito 
    //let mostrarTotalInteres= document.getElementById("resultadoCredito");
    mostrarEnPantalla+="<p><strong>Tasa de interes : </strong>" +totalInteresSimple.toFixed(2)+"</p><br>";
    //el valor total a pagar:
    let totalPagar = calcularTotalPagar(montoSolicitado, totalInteresSimple);
    //Mostrar en pantalla, en el componente resultadoCredito:
    //let totalApagar=document.getElementById("resultadoCredito");
    mostrarEnPantalla+="<p><strong>Total a pagar : </strong>" +totalPagar+"</p><br>";
    //cuota mensual:
    let pagoMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    //Mostrar en pantalla:
    //let cuotaMes=document.getElementById("resultadoCredito");
    mostrarEnPantalla+="<p><strong>Cuota mensual : </strong>" +pagoMensual.toFixed(2)+"</p><br>";
    //Aprobar credito
    /* Si el crédito es aprobado, se debe aplicar la clase:
        resultadoCredito.className = "aprobado";
        Si el crédito es rechazado, se debe aplicar la clase:
        resultadoCredito.className = "rechazado"; */
    let analizarCredito = aprobarCredito(capacidadDePago, pagoMensual);
    if (analizarCredito === true) {
        //let creditoAprobado=document.getElementById("resultadoCredito");
        mostrarEnPantalla+=""+"CREDITO APROBADO";
        resultado.className = "aprobado";
    } else {
        //let creditoRechazado=document.getElementById("resultadoCredito");
        mostrarEnPantalla+=""+" <i class='fa-solid fa-ban' style='color: rgb(219, 38, 19);'></i>"+
        " <i class='fa-brands fa-expeditedssl'></i> CREDITO RECHAZADO <i class='fa-brands fa-expeditedssl'></i>"+
        "  <i class='fa-solid fa-ban' style='color: rgb(219, 38, 19);'></i>";
        
        resultado.className = "rechazado";
    }
    resultado.innerHTML=mostrarEnPantalla;

}