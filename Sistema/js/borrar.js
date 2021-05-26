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

    document.querySelector("#delete").addEventListener("click", () => {
        var id = document.querySelector("#id").value;
        
        if(id){
            var url = "http://localhost:3000/empleados/" + id;
            
            axios.delete(url, headers).then((res) => {
                const code = res.data.code;
                const message = res.data.message; 
                if(code == 1){
                    alert(message)
                }
                else if(code == 2){
                    alert(message);
                    document.querySelector("#id").value = "";
                }
            }).catch((err) => {
                //
            })
        }
    })
}