
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
function ocultarSecciones(){
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
}
//b) Crear función mostrarSeccion(id)
function mostrarSecciones(id){
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");

}
//PARTE 2: CONFIGURAR TASA

function guardarTasa(){

  tasaInteres=recuperarInt("tasaInteres")
  if(tasaInteres>=10 && tasaInteres<=20){
    mostrarTexto("mensajeTasa","✅ Tasa configurada correctamente: "+tasaInteres+"%")
  }else{
    mostrarTexto("mensajeTasa","❌ La tasa debe estar entre 10% y 20%")
  }

}

//PARTE 3: ADMINISTRACIÓN DE CLIENTES
//🧱 PARTE A: CREAR Y LISTAR CLIENTES
//let clientes = []; está creadad arriba como global
//️Función guardarCliente()
function guardarCliente(){
  
  //1. Obtener datos del formulario
  let cedula = recuperaraTexto("txtCedula")
  let nombre=recuperaraTexto("txtNombre");
  let apellido=recuperaraTexto("txtApellido");
  //2. Convertir valores numéricos
  let ingresos= recuperarFloat("txtIngresos");
  let egresos= recuperarFloat("txtEgresos");
  
  //3. Crear objeto cliente
  let cliente={};
  //4. Agregarlo al arreglo
  cliente.cedula=cedula;
  cliente.nombre=nombre;
  cliente.apellido=apellido;
  cliente.ingresos=ingresos;
  cliente.egresos=egresos;
  clientes.push(cliente);
  //Cada vez que se guarda un cliente → llamar pintarClientes()
  pintarClientes();
}

//Función pintarClientes()
function pintarClientes(){
  
  //Recorrer el arreglo
  let idTablitaDinamica=document.getElementById("tablaClientes");
  let tablitaDinamica="";
  let persona;
  for(let i=0; i<clientes.length; i++){
    //Generar filas <tr> dinámicamente
    persona=clientes[i];
    //3.-Insertarlas en: <tbody id="tablaClientes"></tbody>
    tablitaDinamica+= "<tbody id='tablaClientes'>"+
          "<tr>"
    tablitaDinamica+="<td>"+persona.cedula+"</td>"+
          "<td>"+persona.nombre+"</td>"+
          "<td>"+persona.apellido+"</td>"+
          "<td>"+persona.ingresos+"</td>"+
          "<td>"+persona.egresos+"</td>"+
          "<td>"+
            "<button>Actualizar</button>"+
          "</td>"+
        "</tr>"+
        "</tbody>"
  }
  idTablitaDinamica.innerHTML=tablitaDinamica;
}

//VALIDAR--Validaciones
