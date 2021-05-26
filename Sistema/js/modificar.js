window.onload = init;

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


    document.querySelector("#patch").addEventListener("click", () => {
        var id = document.querySelector("#id").value;
        var nombre = document.querySelector("#nombre").value;
        var apellido = document.querySelector("#apellido").value;
        var telefono = document.querySelector("#telefono").value;
        var email = document.querySelector("#email").value;
        var direccion = document.querySelector("#direccion").value;
        
        var data = {
            nombre,
            apellido,
            telefono,
            email,
            direccion
        }

        if(id){
            var url = "http://localhost:3000/empleados/" + id;
            
            axios.patch(url, data, headers).then((res) => {
                const code = res.data.code;
                const message = res.data.message; 
                if(code == 1){
                    alert(message)
                    document.querySelector("#id").value = "";
                    document.querySelector("#nombre").value = "";
                    document.querySelector("#apellido").value = "";
                    document.querySelector("#telefono").value = "";
                    document.querySelector("#email").value = "";
                    document.querySelector("#direccion").value = "";
                }
                else if(code == 2){
                    alert(message);
                    document.querySelector("#id").value = "";
                }
                else{
                    alert(message);
                }
            }).catch((err) => {
                //
            })
        }
    })
}