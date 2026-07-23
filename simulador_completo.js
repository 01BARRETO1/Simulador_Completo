
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
  document.getElementById("contacto").classList.remove("activa");
  document.getElementById("listaCreditos").classList.remove("activa");
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
  //habilitar escribir en cedula
  document.getElementById("txtCedula").readOnly = false;
  //ÚLTIMO PASO DEL DOCUMENTO SIMULADOR 2 
  /* ✔ Si NO existe → crear
    ✔ Si existe → actualizar (excepto cédula)*/

  //1. Obtener datos del formulario
  let cedula = recuperarTexto("txtCedula");


  let nombre = recuperarTexto("txtNombre");
  let apellido = recuperarTexto("txtApellido");
  //2. Convertir valores numéricos
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");
  //Examen let correo
  let correo = recuperarTexto("txtCorreo");
  //✔ Si NO existe → crear
  //Variable del objeto si lo encuentra
  let busquedaCliente = buscarCliente(cedula);
  if (busquedaCliente == null) {
    //3. Crear objeto cliente
    let cliente = {};
    //4. Agregarlo al arreglo
    cliente.cedula = cedula;
    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.correo = correo;
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
    clienteSeleccionado.correo = correo;
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
      "<td>" + persona.correo + "</td>" +
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
  clienteSeleccionado = clienteExiste;
  for (let i = 0; i < clientes.length; i++) {
    cedulaEncontrada = clientes[i];
    if (cedulaEncontrada.cedula == cedula) {
      clienteSeleccionado = cedulaEncontrada;

      console.log("Ya existe");
      return clienteSeleccionado;
    }

  }
  return clienteSeleccionado;
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
      //Deshabilitar escribir en cedula
      document.getElementById("txtCedula").readOnly = true;
      mostrarTextoEnCaja("txtCedula", clienteSeleccionado.cedula);
      mostrarTextoEnCaja("txtNombre", clienteSeleccionado.nombre);
      mostrarTextoEnCaja("txtApellido", clienteSeleccionado.apellido);
      mostrarTextoEnCaja("txtCorreo", clienteSeleccionado.correo);
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
  mostrarTextoEnCaja("txtCorreo", "");
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

//Parte 2: Crear la función clienteValido
function buscarClienteCredito() {
  
  // Limpiar la selección anterior
  clienteSeleccionado = null;
  //1. Tomar el valor ingresado en el campo de cédula.
  let txtCedula = recuperarTexto("buscarCedulaCredito");
  //Deshabilitamos el boton para recoger nuevos datos
  document.getElementById("btnSolicitarCredito").disabled = true;
  //2. Buscar el cliente dentro del arreglo de clientes.
  let clienteValido = buscarCliente(txtCedula);
  //3. Si el cliente existe, mostrar sus datos en pantalla.
  let mostrarDatos = document.getElementById("datosClienteCredito");
  if (clienteValido != null) {
    //  Guardamos el cliente para usarlo después
    clienteSeleccionado = clienteValido;

    let datosCliente = "<div class='datosCliente'><h3>Datos del Cliente</h3><br>" +
      "<p><strong>Cédula: </strong>" + clienteValido.cedula + "</p><br>" +
      "<p><strong>Nombre: </strong>" + clienteValido.nombre + "</p><br>" +
      "<p><strong>Apellido: </strong>" + clienteValido.apellido + "</p><br>" +
      "<p><strong>Correo: </strong>" + clienteValido.correo + "</p><br>" +
      "<p><strong>Ingresos: </strong>" + clienteValido.ingresos + "</p><br>" +
      "<p><strong>Egresos: </strong>" + clienteValido.egresos + "</p><br></div>";

    mostrarDatos.innerHTML = datosCliente;
    mostrarDatos.className = "card";
  } else {
    // Si no existe, dejamos la variable en null
    clienteSeleccionado = null;
    //4. Si el cliente no existe, mostrar un mensaje indicando que no fue encontrado.
    mostrarDatos.innerHTML = "<h3 class='card'>🧱Cliente NO encontrado🧱</h3>";

    let resultado = document.getElementById("resultadoCredito");
    let mostrarEnPantalla = "";
    resultado.innerHTML = mostrarEnPantalla;
    document.getElementById("btnSolicitarCredito").disabled = true;

    mostrarTextoEnCaja("montoCredito", "");
    mostrarTextoEnCaja("plazoCredito", "");
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

function calcularCapacidadDePago(montoDisponible) {
  let capacidadDePago = montoDisponible * 0.50
  return capacidadDePago
}

function calcularInteresSimple(monto, plazoanios, tasa) {
  let valorInteres = (plazoanios * monto) * (tasa / 100);
  return valorInteres;

}

function calcularTotalPagar(monto, interes) {
  let valorTotalPagar = monto + interes + 100;
  return valorTotalPagar;

}

function calcularCuotaMensual(total, plazoAnios) {
  let meses = plazoAnios * 12;
  let cuotaMensual = total / meses;
  return cuotaMensual;

}

function aprobarCredito(capacidadDePago, cuotaMensual) {
  if (capacidadDePago > cuotaMensual) {

    return true;
  } else {
    return false;
  }


}

function calcularCredito() {
  // Verificar que primero se haya buscado un cliente
  if (clienteSeleccionado == null) {
    alert("Primero busque un cliente válido.");
    return;
  }
  // ===== VALIDAR QUE EXISTA UNA CÉDULA =====
  let cedula = recuperarTexto("buscarCedulaCredito");

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
  let mostrarEnPantalla = "<p><strong>Disponibilidad: </strong>" + "USD" + " " + tenemos.toFixed(2) + "</p><br>";
  /* //Llamar a la función calcularCapacidadPago y guardar el retorno en una
   variable. Para calcular la capacidad de Pago, se le pasa como parámetro el
   valor que ya se obtuvo disponible cuando se invocó a calcularDisponible.  */
  let capacidadDePago = calcularCapacidadDePago(tenemos);
  //Mostrar en pantalla, en el componente resultadoCredito 
  //let dineroDisponible = document.getElementById("resultadoCredito");
  mostrarEnPantalla += "<p><strong>Capacidad de pago: </strong>" + "USD" + " " + capacidadDePago.toFixed(2) + "</p><br>";

  //calcular Interes Simple, leer los valores:
  //monto solicitado:
  let txtMontoSolicitado = document.getElementById("montoCredito");
  let montoSolicitadoInt = txtMontoSolicitado.value;
  let montoSolicitado = parseInt(montoSolicitadoInt);
  //Agregamos al arreglo (en secreto) el monto solicitado para tener el informe y mostrar en la tabla
  //clienteSeleccionado.montoSolicitado=montoSolicitado;
  //plazo en años
  let plazoAnios = recuperarInt("plazoCredito");
  if(plazoAnios>20){
    mostrarTextoEnCaja("plazoCredito",20);
    return 20;
  }
  //tasa anual simple
  let tasaAnual = recuperarInt("tasaInteres");
  let totalInteresSimple = calcularInteresSimple(montoSolicitado, plazoAnios, tasaAnual);
  //Mostrar en pantalla, en el componente resultadoCredito 
  //let mostrarTotalInteres= document.getElementById("resultadoCredito");
  mostrarEnPantalla += "<p><strong>Interes a pagar : </strong>" + totalInteresSimple.toFixed(2) + "</p><br>";
  //el valor total a pagar:
  let totalPagar = calcularTotalPagar(montoSolicitado, totalInteresSimple);
  //Asiganmos a la variable totalInteresSimple a la variable global tasInteres
  
  tasaInteres = totalInteresSimple.toFixed(2);


  //Mostrar en pantalla, en el componente resultadoCredito:
  //let totalApagar=document.getElementById("resultadoCredito");
  mostrarEnPantalla += "<p><strong>Total a pagar : </strong>" + totalPagar.toFixed(2) + "</p><br>";
  //cuota mensual:
  let pagoMensual = calcularCuotaMensual(totalPagar, plazoAnios);
  //Asiganmos a la variable global el total a pagar - o sea el monto calculado
  montoCalculado = totalPagar.toFixed(2);
  //Variable global para mostrar en el arreglo
  plazoCalculado = plazoAnios * 12;
  //Mostrar en pantalla:
  //let cuotaMes=document.getElementById("resultadoCredito");
  mostrarEnPantalla += "<p><strong>Cuota mensual : </strong>" + pagoMensual.toFixed(2) + "</p><br>";
  //Aprobar credito
  /* Si el crédito es aprobado, se debe aplicar la clase:
      resultadoCredito.className = "aprobado";
      Si el crédito es rechazado, se debe aplicar la clase:
      resultadoCredito.className = "rechazado"; */
  let analizarCredito = aprobarCredito(capacidadDePago, pagoMensual);
  //Asiganmos a la variable global el total a pagar
  cuotaCalculada = pagoMensual.toFixed(2);

  if (analizarCredito === true) {
    //let creditoAprobado=document.getElementById("resultadoCredito");
    let txtMontoSolicitado = document.getElementById("montoCredito");
  let montoSolicitadoInt = txtMontoSolicitado.value;
  let montoSolicitado = parseInt(montoSolicitadoInt);
  //Agregamos al arreglo (en secreto) el monto solicitado para tener el informe y mostrar en la tabla
  clienteSeleccionado.montoSolicitado=montoSolicitado;
    mostrarEnPantalla += "" + "CREDITO APROBADO";
    resultado.className = "aprobado";
    document.getElementById("btnSolicitarCredito").disabled = false;

  } else {
    //let creditoRechazado=document.getElementById("resultadoCredito");
    mostrarEnPantalla += "" + " <i class='fa-solid fa-ban' style='color: rgb(219, 38, 19);'></i>" +
      " <i class='fa-brands fa-expeditedssl'></i> CREDITO RECHAZADO <i class='fa-brands fa-expeditedssl'></i>" +
      "  <i class='fa-solid fa-ban' style='color: rgb(219, 38, 19);'></i>";

    resultado.className = "rechazado";
    document.getElementById("btnSolicitarCredito").disabled = true;
  }
  resultado.innerHTML = mostrarEnPantalla;


}

//Simulador2 - parte3
//PASO 2: Agregar botón “Asignar Crédito” 
//Boton Asignar Crédito
function solicitarCredito() {
  alert("Credito aprobado");
  document.getElementById("btnSolicitarCredito").disabled = true;
  //monto solicitado:
  let txtMontoSolicitado = document.getElementById("montoCredito");
  let montoSolicitadoInt = txtMontoSolicitado.value;
  let montoSolicitado = parseInt(montoSolicitadoInt);
  //Agregamos al arreglo (en secreto) el monto solicitado para tener el informe y mostrar en la tabla
  clienteSeleccionado.montoSolicitado=montoSolicitado;
  let newObjetoCredito = {
    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    correo: clienteSeleccionado.correo,
    monto: montoCalculado,
    montoSolicitado: montoSolicitado,
    tasa: tasaInteres,
    plazo: plazoCalculado,
    cuota: cuotaCalculada
  }
  creditos.push(newObjetoCredito);

}

//PASO 4: Crear función buscarCreditos 
function buscarCreditos(cedula) {

  /*  Esta función debe recibir como parámetro la cédula de un cliente y retornar un arreglo con
       todos los créditos registrados para ese cliente. */

  let cedulaRegistrada;
  let creditosCliente = null;
  clienteSeleccionado = creditosCliente;
  for (let i = 0; i < creditos.length; i++) {
    cedulaRegistrada = creditos[i];
    if (cedulaRegistrada.cedula == cedula) {
      clienteSeleccionado = cedulaRegistrada;

      console.log("Credito encontrado");
      return clienteSeleccionado;
    }
  }
  return clienteSeleccionado;
}

//PASO 5: Crear función pintarCreditos
function pintarCreditos(arreglo) {
  let arregloCreditos = document.getElementById("tablaCreditos");
  let pintarCreditos = "";
  let credito;
  for (let i = 0; i < creditos.length; i++) {
    credito = creditos[i];
  
        let tasaAnual = recuperarInt("tasaInteres");
        credito.tasa=tasaAnual
        pintarCreditos += "<tr>" +
        "<td>" + credito.cedula + "</td>" +
        "<td>" + credito.nombre + "</td>" +
        "<td>" + credito.apellido + "</td>" +
        "<td>" + credito.correo + "</td>" +
        "<td>$" + credito.montoSolicitado + "</td>" +
        "<td>" + credito.tasa + "%</td>" +
        "<td>" + credito.plazo + " meses</td>" +
        "<td>" + credito.cuota + "</td>" +
        "<td><button onclick='eliminarCredito(\"" + credito.cedula + "\");'>Eliminar</button></td>" +
        "</tr>";

      }
      arregloCreditos.innerHTML = pintarCreditos;
    }



//PASO 6: Crear función buscarCreditosCliente 
function buscarCreditosCliente() {
  
  // ===== VALIDAR QUE EXISTA UNA CÉDULA =====
  let txtCreditos = recuperarTexto("buscarCedulaListado");

  if (txtCreditos === "") {
    alert("Ingrese la cédula del cliente.");
    return;
  }

  // ===== VALIDAR QUE EL CLIENTE EXISTA =====
  let tieneCredito = buscarCreditos(txtCreditos);

  if (tieneCredito == null) {
    alert("Cliente no encontrado.");
    return;
  } else {
    let arregloCreditos = document.getElementById("tablaCreditos");
    let pintarCreditos = "";
    let credito;
    for (let i = 0; i < creditos.length; i++) {
      credito = creditos[i];
      if(tieneCredito.cedula==credito.cedula){
        //Agregamos el valor de la tasa en porcentaje ejemplo= 15%
        //para evitar mostra la tasa de interés a pagar total
        //el interes a pagar total se muestra en crédito aprovado, y dentro del arreglo
        let tasaAnual = recuperarInt("tasaInteres");
        credito.tasa=tasaAnual
        pintarCreditos += "<tr>" +
        "<td>" + credito.cedula + "</td>" +
        "<td>" + credito.nombre + "</td>" +
        "<td>" + credito.apellido + "</td>" +
        "<td>" + credito.correo + "</td>" +
        "<td>$" + credito.montoSolicitado + "</td>" +
        "<td>" + credito.tasa + "%</td>" +
        "<td>" + credito.plazo + " meses</td>" +
        "<td>" + credito.cuota + "</td>" +
        "<td><button onclick='eliminarCredito2(\"" + credito.cedula + "\");'>Eliminar</button></td>" +
        "</tr>";

      }
      arregloCreditos.innerHTML = pintarCreditos;  
    }
    
  }
}

//Boton Eliminar Credito, buscar 
//funcion eliminar
function eliminarCredito(cedula) {

  if (!confirm("¿Está seguro de eliminar este cliente?")) {
    return;
  }

  for (let i = 0; i < creditos.length; i++) {

    if (creditos[i].cedula == cedula) {

      

      let eliminarCredito=buscarCreditos(cedula);
      limpiar();
      creditos.splice(i, 1);

      pintarCreditos(eliminarCredito);
      let blanquearTabla=document.getElementById("tablaCreditos");
      blanquearTabla.innerHTML="";
      pintarCreditos(eliminarCredito);

      

      alert("Cliente eliminado correctamente.");

      return;
    }
  }

  alert("Cliente no encontrado.");
}

//Boton Eliminar Credito en buscar todo
//para que solo elimine uno y se siga viendo los otros
//funcion eliminar
function eliminarCredito2(cedula) {

  if (!confirm("¿Está seguro de eliminar este cliente?")) {
    return;
  }

  for (let i = 0; i < creditos.length; i++) {

    if (creditos[i].cedula == cedula) {

      

      let eliminarCredito=buscarCreditos(cedula);
      limpiar();
      creditos.splice(i, 1);

      pintarCreditos(eliminarCredito);
      let blanquearTabla=document.getElementById("tablaCreditos");
      blanquearTabla.innerHTML="";

      

      alert("Cliente eliminado correctamente.");

      return;
    }
  }

  alert("Cliente no encontrado.");
}
