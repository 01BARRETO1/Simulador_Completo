// validaciones_cliente.js

// Inyecta estilos para errores (una sola vez)
(function() {
  if (!document.getElementById('estilos-validacion-cliente')) {
    const s = document.createElement('style');
    s.id = 'estilos-validacion-cliente';
    s.textContent = `
      .input-error { border: 1.5px solid #e74c3c !important; }
      .error-text { color: #e74c3c; font-size: 0.9rem; margin-top:4px; display:block; }
      #mensajeClientesGlobal { color:#e74c3c; margin-top:8px; }
    `;
    document.head.appendChild(s);
  }
})();

// Recupera elementos del formulario de clientes
function _el(id) { return document.getElementById(id); }

// Valida campos y devuelve resultado
function validarCamposCliente() {
  const cedulaEl = _el("txtCedula");
  const nombreEl = _el("txtNombre");
  const apellidoEl = _el("txtApellido");
  const ingresosEl = _el("txtIngresos");
  const egresosEl = _el("txtEgresos");

  const cedula = (cedulaEl.value || "").trim();
  const nombre = (nombreEl.value || "").trim();
  const apellido = (apellidoEl.value || "").trim();
  const ingresosRaw = ingresosEl.value;
  const egresosRaw = egresosEl.value;

  // Parseo seguro: si está vacío lo dejamos NaN para detectar error
  const ingresos = ingresosRaw === "" ? NaN : parseFloat(ingresosRaw);
  const egresos = egresosRaw === "" ? NaN : parseFloat(egresosRaw);

  limpiarErroresCliente();

  const errores = [];

  if (cedula === "") errores.push({ el: cedulaEl, msg: "Cédula no puede estar vacía" });
  if (nombre === "") errores.push({ el: nombreEl, msg: "Nombre no puede estar vacío" });
  if (apellido === "") errores.push({ el: apellidoEl, msg: "Apellido no puede estar vacío" });

  if (isNaN(ingresos)) {
    errores.push({ el: ingresosEl, msg: "Ingresos debe ser un número válido" });
  } else if (ingresos < 0) {
    errores.push({ el: ingresosEl, msg: "Ingresos no puede ser negativos" });
  }

  if (isNaN(egresos)) {
    errores.push({ el: egresosEl, msg: "Egresos debe ser un número válido" });
  } else if (egresos < 0) {
    errores.push({ el: egresosEl, msg: "Egresos no pueden ser negativos" });
  }

  return {
    ok: errores.length === 0,
    errores: errores,
    datos: { cedula, nombre, apellido, ingresos, egresos }
  };
}

// Muestra errores junto a cada input y un mensaje global
function mostrarErroresCliente(errores) {
  let global = document.getElementById("mensajeClientesGlobal");
  if (!global) {
    global = document.createElement("p");
    global.id = "mensajeClientesGlobal";
    // Insertar después del botón "Guardar cliente" si existe
    const guardarBtn = document.querySelector("#clientes button[onclick*='guardarCliente']");
    if (guardarBtn && guardarBtn.parentNode) {
      guardarBtn.parentNode.insertBefore(global, guardarBtn.nextSibling);
    } else {
      document.getElementById("clientes").appendChild(global);
    }
  }

  global.innerHTML = errores.map(e => e.msg).join("<br>");

  errores.forEach(e => {
    const input = e.el;
    input.classList.add("input-error");

    // Añadir span de error si no existe
    const next = input.nextElementSibling;
    if (!next || !next.classList || !next.classList.contains("error-text")) {
      const span = document.createElement("span");
      span.className = "error-text";
      span.textContent = e.msg;
      input.parentNode.insertBefore(span, input.nextSibling);
    }
  });
}

// Limpia errores visuales previos
function limpiarErroresCliente() {
  ["txtCedula","txtNombre","txtApellido","txtIngresos","txtEgresos"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("input-error");
    const next = el.nextElementSibling;
    if (next && next.classList && next.classList.contains("error-text")) next.remove();
  });
  const global = document.getElementById("mensajeClientesGlobal");
  if (global) global.innerHTML = "";
}

// Función segura que valida y solo si pasa llama a la función original guardarCliente()
function guardarClienteSeguro(event) {
  // Si se llama desde un submit, evitar envío por defecto
  if (event && typeof event.preventDefault === "function") event.preventDefault();

  const resultado = validarCamposCliente();
  if (!resultado.ok) {
    mostrarErroresCliente(resultado.errores);
    return; // NO continuar si hay errores
  }

  // Si todo está bien, llamar a la función original que ya existe
  // Asumimos que existe guardarCliente() definida en simulador_completo.js
  if (typeof guardarCliente === "function") {
    guardarCliente(); // la función original leerá los inputs y guardará
  } else {
    // Si por alguna razón no existe, podemos crear el cliente aquí como fallback
    const d = resultado.datos;
    const cliente = {
      cedula: d.cedula,
      nombre: d.nombre,
      apellido: d.apellido,
      ingresos: d.ingresos,
      egresos: d.egresos
    };
    // Si existe el arreglo global clientes lo usamos, si no lo creamos
    if (!window.clientes) window.clientes = [];
    window.clientes.push(cliente);
    // Intentar llamar a pintarClientes si existe
    if (typeof pintarClientes === "function") pintarClientes();
  }
}

// Conectar el botón "Guardar cliente" al wrapper sin tocar el HTML
document.addEventListener("DOMContentLoaded", function() {
  // Buscar el botón que llama a guardarCliente en tu HTML
  const btn = document.querySelector("#clientes button[onclick*='guardarCliente']");
  if (btn) {
    // Removemos el onclick inline para evitar doble ejecución (opcional)
    btn.removeAttribute("onclick");
    // Añadimos nuestro manejador seguro
    btn.addEventListener("click", guardarClienteSeguro);
  } else {
    // Si no lo encuentra, buscar por posición (primer botón dentro de #clientes)
    const fallback = document.querySelector("#clientes button");
    if (fallback) {
      fallback.removeAttribute("onclick");
      fallback.addEventListener("click", guardarClienteSeguro);
    }
  }
});
