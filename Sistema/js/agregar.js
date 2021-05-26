window.onload = init;

var token = localStorage.getItem("token");
var url = "https://sistemarh2020.herokuapp.com/empleados";
var headers = {
    headers: {
        "Authorization" : "bearer " + token
    }
}

function init(){
    if(!token) window.location = "login.html";    

    document.querySelector("#Regresar").addEventListener("click", () => {
        window.location = "empleados.html";
    })

    document.querySelector("#post").addEventListener("click", () => {
        var nombre = document.querySelector("#nombre").value;
        var apellido = document.querySelector("#apellido").value;
        var telefono = document.querySelector("#telefono").value;
        var email = document.querySelector("#email").value;
        var direccion = document.querySelector("#direccion").value;
        console.log({nombre, apellido, telefono, email, direccion});
        var data = {
                nombre,
                apellido,
                telefono,
                email,
                direccion
        }

        axios.post(url, data, headers).then((res) => {
            alert(res.data.message);
            document.querySelector("#nombre").value = "";
            document.querySelector("#apellido").value = "";
            document.querySelector("#telefono").value = "";
            document.querySelector("#email").value = "";
            document.querySelector("#direccion").value = "";
        }).catch((err) => {
            alert("Todos los datos deben estar completos");
        })
    })
}