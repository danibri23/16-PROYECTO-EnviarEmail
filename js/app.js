document.addEventListener("DOMContentLoaded", function () {
  const email1 = {
    email: "",
    asunto: "",
    mensaje: "",
    numero: "",
    credito: "",
    emailcc: "",
  };

  // Seleccionar elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputEmail2 = document.querySelector("#emailcc");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const inputNumero = document.querySelector("#numero");
  const inputCredito = document.querySelector("#credito");
  const btnSubmit = document.querySelector("#formulario button[type='submit']");
  const btnReset = document.querySelector("#formulario button[type='reset']");
  const formulario = document.querySelector("#formulario");
  const spinner = document.querySelector("#spinner");

  inputEmail.addEventListener("input", validar);
  inputEmail2.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputNumero.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  inputCredito.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetFormulario();
  });

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      resetFormulario();

      // Crear una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";

      formulario.appendChild(alertaExito);
      setTimeout(() => {
        alertaExito.remove();
      }, 2000);
    }, 3000);
  }

  function validar(e) {
    if (e.target.value.trim() === "") {
      if (e.target.id != "emailcc") {
        mostratAlerta(
          `El campo ${e.target.id} es obligatorio.`,
          e.target.parentElement
        );
        email1[e.target.id] = "";
        comprobarEmail();
        return;
      }
    }

    if (
      (e.target.id === "email" || e.target.id === "emailcc") &&
      !validarEmail(e.target.value)
    ) {
      mostratAlerta("¡El email no es válido!", e.target.parentElement);
      email1[e.target.id] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    // Asignar los valores
    email1[e.target.id] = e.target.value.trim();
    // console.log(email1);

    // Comprobar el objeto Email
    comprobarEmail();
  }

  function mostratAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    // Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // Comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }
  function comprobarEmail() {
    if (Object.values(email1).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function resetFormulario() {
    // Reiniciar el formulario
    email1.email = "";
    email1.emailcc = "";
    email1.asunto = "";
    email1.mensaje = "";
    email1.numero = "";
    email1.credito = "";

    formulario.reset();
    comprobarEmail();
  }
});

function Card(event, el) {
  //Validar nombre
  //Obteniendo posicion del cursor
  let val = el.value; //Valor de la caja de texto
  let pos = val.slice(0, el.selectionStart).length;

  let out = ""; //Salida
  let filtro = "1234567890";
  let v = 0; //Contador de caracteres validos

  //Filtar solo los numeros
  for (let i = 0; i < val.length; i++) {
    if (filtro.indexOf(val.charAt(i)) != -1) {
      v++;
      out += val.charAt(i);
      //Agregando un espacio cada 4 caracteres
      if (v == 4 || v == 8 || v == 12) out += "-";
    }
  }
  //Reemplazando el valor
  el.value = out;

  //En caso de modificar un numero reposicionar el cursor
  if (event.keyCode == 8) {
    //Tecla borrar precionada
    el.selectionStart = pos;
    el.selectionEnd = pos;
  }
}

function Mayuculas(tx) {
  //Retornar valor convertido a mayusculas
  return tx.toUpperCase();
}

function Numeros(string) {
  //Solo numeros
  let out = "";
  let filtro = "1234567890"; //Caracteres validos

  //Recorrer el texto y verificar si el caracter se encuentra en la lista de validos
  for (let i = 0; i < string.length; i++)
    if (filtro.indexOf(string.charAt(i)) != -1)
      //Se añaden a la salida los caracteres validos
      out += string.charAt(i);

  //Retornar valor filtrado
  return out;
}
