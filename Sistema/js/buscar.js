window.onload = init;

var url = "https://sistemarh2020.herokuapp.com/empleados/";
var token = localStorage.getItem("token");

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
        var params = document.querySelector("#datos").value;

        if(params != ""){
            url += params;
            var table_body = document.querySelector("#table_body");
            axios.get(url, headers).then((res) => {
                displayEmpleado(res.data.message);
                params.value = "";
            }).catch((err) => {
            })
        }
        else{
            alert("Debes escribir un nombre para continuar");
        }
    })
}

function displayEmpleado(empleado){
    var table_body = document.querySelector("#table_body");

    var innerHTML = 
    `<tr>\
        <td></td>\
        <td>\
            <table border="1" align="center">\
                <thead>\
                    <tr>\
                        <th>ID</th>\
                        <th>Nombre</th>\
                        <th>Apellido</th>\
                        <th>Telefono</th>\
                        <th>E-mail</th>\
                        <th>Direccion</th>\
                    </tr>\
                </thead>\
                <tbody>\
                    <tr>\
                        <td>${empleado.id}</td>\
                        <td>${empleado.nombre}</td>\
                        <td>${empleado.apellido}</td>\
                        <td>${empleado.telefono}</td>\
                        <td>${empleado.email}</td>\
                        <td>${empleado.direccion}</td>\
                    </tr>\
                </tbody>\
            </table>\
        </td>\
        <td></td>\
    </tr>`

    table_body.innerHTML = innerHTML;
}