function atualizarContador(){
    let badge=document.getElementById('carrinho-quantidade')
    if(!badge) return
    let carrinho=JSON.parse(localStorage.getItem('carrinho'))||[]
    let total=carrinho.length
    if(total>0){
        badge.innerText=total
        badge.style.visibility='visible'
    }else{
        badge.style.visibility='hidden'
    }
}

function adicionarAoCarrinho(id){
    let usuario=localStorage.getItem('usuarioLogado')
    if(!usuario){
        mostrarPopup("Faça login para comprar","#dc3545")
        setTimeout(()=>{window.location.href="login.html"},500)
        return
    }
    let produto=estoque.find(p=>p.id===id)
    if(!produto) return
    let carrinho=JSON.parse(localStorage.getItem('carrinho'))||[]
    carrinho.push(produto)
    localStorage.setItem('carrinho',JSON.stringify(carrinho))
    atualizarContador()
    mostrarPopup(produto.nome+" adicionado!","#ff9800")
}

function renderizarCarrinho(){
    let container=document.getElementById('itens-carrinho')
    let totalTxt=document.getElementById('total-valor')
    if(!container) return
    let carrinho=JSON.parse(localStorage.getItem('carrinho'))||[]
    container.innerHTML=''
    let soma=0
    carrinho.forEach((item,index)=>{
        soma+=parseFloat(item.preco)
        container.innerHTML+=`
        <div class="item-carrinho">
            <img src="${item.img}" width="100">
            <div class="info-produto">
                <h3>${item.nome}</h3>
                <p>R$ ${item.preco}</p>
                <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
            </div>
        </div>
        `
    })
    totalTxt.innerText="R$ "+soma.toFixed(2)
    atualizarContador()
}

function removerItem(index){
    let carrinho=JSON.parse(localStorage.getItem('carrinho'))||[]
    carrinho.splice(index,1)
    localStorage.setItem('carrinho',JSON.stringify(carrinho))
    renderizarCarrinho()
}

function limparTudo(){
    localStorage.removeItem('carrinho')
    renderizarCarrinho()
}

window.addEventListener('DOMContentLoaded',atualizarContador)