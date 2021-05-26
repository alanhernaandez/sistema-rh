window.onload = init;

function init(){
    if(!localStorage.getItem("token")) window.location = "login.html";

    document.querySelector("#logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location = "login.html";
    })
    document.querySelector("#post").addEventListener("click", () => {
        window.location = "agregarEmpleados.html";
    })
    document.querySelector("#get").addEventListener("click", () => {
        window.location = "buscarEmpleados.html";
    })
    document.querySelector("#patch").addEventListener("click", () => {
        window.location = "ModificarEmpleados.html";
    })
    document.querySelector("#delete").addEventListener("click", () => {
        window.location = "borrarEmpleados.html";
    })
}