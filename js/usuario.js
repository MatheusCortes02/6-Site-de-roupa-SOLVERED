function cadastrar(){
    let nome=document.getElementById("nome").value
    let telefone=document.getElementById("telefone").value
    let email=document.getElementById("emailCadastro").value
    let senha=document.getElementById("senhaCadastro").value
    let usuario={nome:nome,telefone:telefone,email:email,senha:senha,cpf:"",endereco:""}
    localStorage.setItem("usuario",JSON.stringify(usuario))
    localStorage.setItem("usuarioLogado",JSON.stringify(usuario))
    mostrarPopup("Conta criada com sucesso!","#28a745")
    setTimeout(()=>{window.location.href="conta.html"},500)
}

function login(){
    let email=document.getElementById("email").value
    let senha=document.getElementById("senha").value
    let usuario=JSON.parse(localStorage.getItem("usuario"))
    if(usuario && email===usuario.email && senha===usuario.senha){
        localStorage.setItem("usuarioLogado",JSON.stringify(usuario))
        mostrarPopup("Login realizado com sucesso!","#28a745")
        setTimeout(()=>{window.location.href="conta.html"},500)
    }else{
        mostrarPopup("Login inválido!","#dc3545")
    }
}

function salvarInfo(){
    let usuario=JSON.parse(localStorage.getItem("usuario"))
    let usuarioLogado=JSON.parse(localStorage.getItem("usuarioLogado"))
    usuario.cpf=document.getElementById("cpf").value
    usuario.endereco=document.getElementById("endereco").value
    usuarioLogado.cpf=document.getElementById("cpf").value
    usuarioLogado.endereco=document.getElementById("endereco").value
    localStorage.setItem("usuario",JSON.stringify(usuario))
    localStorage.setItem("usuarioLogado",JSON.stringify(usuarioLogado))
    mostrarPopup("Informações salvas","#1e90ff")
}

function logout(){
    localStorage.removeItem("usuarioLogado")
    mostrarPopup("Logout realizado","#ff9800")
    setTimeout(()=>{window.location.href="index.html"},500)
}

function atualizarInterfaceUsuario(){
    let usuario=localStorage.getItem("usuarioLogado")
    let area=document.getElementById("area-usuario")
    if(area){
        if(usuario){
            area.innerHTML=`<a href="conta.html"><img src="img/login.png" width="35"></a>`
        }else{
            area.innerHTML=`<a href="login.html"><img src="img/login.png" width="35"></a>`
        }
    }
}

function mostrarPopup(mensagem, cor="#1e90ff"){
    let popup=document.getElementById("popup")
    if(!popup){
        popup=document.createElement("div")
        popup.id="popup"
        popup.className="popup"
        document.body.appendChild(popup)
    }
    popup.innerText=mensagem
    popup.style.backgroundColor=cor
    popup.classList.add("show")
    setTimeout(()=>{popup.classList.remove("show")},2500)
}

document.addEventListener("DOMContentLoaded",()=>{
    atualizarInterfaceUsuario()
    if(window.location.pathname.includes("conta.html")){
        const usuario=JSON.parse(localStorage.getItem("usuarioLogado"))
        if(!usuario){window.location.href="login.html"; return}
        document.getElementById("nome").innerText=usuario.nome
        document.getElementById("email").innerText=usuario.email
        document.getElementById("telefone").innerText=usuario.telefone
        if(usuario.cpf) document.getElementById("cpf").value=usuario.cpf
        if(usuario.endereco) document.getElementById("endereco").value=usuario.endereco
    }
})