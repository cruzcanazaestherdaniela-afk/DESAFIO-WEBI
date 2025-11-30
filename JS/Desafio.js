let intentos = 0; // Contara cuantas veces el usuario fallo al iniciar sesion
let bloqueado = false; // Por 3 intentos fallidos se volvera TRUE y se bloquera

const regexUser = /(^[a-zA-Z0-9]{4,12}$)|(^[^\s@]+@[^\s@]+\.[^\s@]+$)/; //Acepta usuarios simples y correos electronicos
const regexPass = /^(?=.*[0-9]).{8,}$/; // Minimo 8 caracteres y almenos un numero
const regexCelular = /^[67]\d{7}$/; // debe iniciar con 6 o 7 y 7 digitos mas
//Mostrar/ocultar la contraseña
document.getElementById("verPassRegistro").addEventListener("change", () => {
  document.getElementById("registro_pass").type =
    document.getElementById("verPassRegistro").checked ? "text" : "password";
}); //Para mostrar la contraseña cambia type de password a texto, y para ocultar vuelve a password

document.getElementById("verPassLogin").addEventListener("change", () => {
  document.getElementById("login_pass").type =
    document.getElementById("verPassLogin").checked ? "text" : "password";
});//Para mostrar la contraseña cambia type de password a texto, y para ocultar vuelve a password

function registrar() {
  const u = document.getElementById("regitro_usuario").value; //Usuario
  const p = document.getElementById("registro_pass").value; //Contraseña
  const celular = document.getElementById("registro_celular").value; //Celular
  const msg = document.getElementById("msg_registro"); //Mensaje de error o confirmacion
  //Lee datos del formulario

  if (!regexUser.test(u)) {
    msg.textContent = "Usuario inválido. Debe ser un nombre de usuario (4–12 caracteres alfanuméricos) o un correo electrónico válido.";
    msg.style.color = "red";
    return;
  }// Si no cumple el regex muestra un mensaje de error y se detiene todo con return

  if (!regexPass.test(p)) {
    msg.textContent = "La Contraseña debe tener minimo 8 caracteres e incluir número.";
    msg.style.color = "red";
    return;
  }// Si no cumple el regex muestra un mensaje de error y se detiene todo con return

  if (!regexCelular.test(celular)) {
    msg.textContent = "Número de móvil inválido debe iniciar con 6xxxxxxx o 7xxxxxxx.";
    msg.style.color = "red";
    return;
}// Si no cumple el regex muestra un mensaje de error y se detiene todo con return
  
    localStorage.setItem("user", u); //Guardar datos en localStorage
    localStorage.setItem("pass", p);
    localStorage.setItem("celular", celular);

    msg.textContent = "Registro exitoso";
    msg.style.color = "green";
}// Si no hay error guardara el usuario, contraseña y celular 

function loguear() {
  if (bloqueado) {
    document.getElementById("msg_login").textContent = "Usuario bloqueado por 3 intentos fallidos.";
    document.getElementById("msg_login").style.color = "red";
    return;
  } //Verificaremos si esta bloquedo la sesion

  const input = document.getElementById("login_usuario").value;
  const p = document.getElementById("login_pass").value;

  const user = localStorage.getItem("user");//Obtener datos guardados en localStorage
  const pass = localStorage.getItem("pass");
  const celular = localStorage.getItem("celular");
  
  const msg = document.getElementById("msg_login");

  // Se puede loguear con usuario o celular
  if ((input === user || input === celular) && p === pass) { // Puedes iniciar sesion con usuario o celular y la contraseña correcta
    msg.textContent = "Login correcto"; //Mensaje de exito
    msg.style.color = "green";
    intentos = 0; 
  } else {
    intentos++;// Mensaje de error y suma un intento fallido
    msg.textContent = `Credenciales incorrectas. Intento ${intentos}/3`;
    msg.style.color = "red";

    if (intentos >= 3) { // Si llega a 3 intentos fallidos se bloquea
      bloqueado = true;
      msg.textContent = "Usuario bloqueado por superar 3 intentos.";
    }
  }
}
// Recuperar contraseña
function recuperar() {
  const input = document.getElementById("recuperar_user").value;
  const user = localStorage.getItem("user"); //Obtener datos guardados en localStorage
  const pass = localStorage.getItem("pass");
  const celular = localStorage.getItem("celular");
  const msg = document.getElementById("msg_recuperar");

  if (input === user || input === celular) { // Verifica si el usuario o celular coincide con tu registro
    msg.textContent = "Tu contraseña es: " + pass; //Muestra la contraseña
    msg.style.color = "green";
  } else { // Si no coincide muestra mensaje de error
    msg.textContent = "Usuario no encontrado";
    msg.style.color = "red";
  }
}
//Cambia de login a recuperar contraseña y viceversa
function mostrarRecuperar() {
  document.getElementById("login").style.display = "none";
  document.getElementById("recuperar").style.display = "block";
}

function mostrarLogin() {
  document.getElementById("recuperar").style.display = "none";
  document.getElementById("login").style.display = "block";
}