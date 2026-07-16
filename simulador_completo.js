
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
// Recupera el componente
let componente= document.getElementById("parametros");
// Recupera la lista de clases del componente
let listaClass=componente.classList;
// Agrega o elimina la clase
//listaClass.add("activa");
//listaClass.remove("activa");
//document.getElementById("parametros").classList.add("activa");
function ocultarSecciones(){
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
}

function mostrarSecciones(id){
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");

}

function guardarTasa(){

  let valorInput=recuperarInt("tasaInteres")
  if(valorInput>=10 && valorInput<=20){
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+valorInput+"%")
  }else{
    mostrarTexto("mensajeTasa","La tasa debe estar entre 10% y 20%")
  }

}
