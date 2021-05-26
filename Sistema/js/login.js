window.onload = init;

function login(){

    var correo = document.getElementById('bmail').value;
    var contraseña = document.getElementById('bpassword').value;

    console.log({correo,contraseña});
    axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
            correo: correo,
            contraseña: contraseña
        }
    }).then(function(res){
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "empleados.html";
        }
        else{
            alert("Correo o Contraseña Incorrectos");
        }
    }).catch(err => {
        alert("Ha fallado la solicitud")
    })
}

function init(){
    if(localStorage.getItem("token")) window.location.href = "empleados.html";
    document.querySelector(".btn-primary").addEventListener("click", login)
}

