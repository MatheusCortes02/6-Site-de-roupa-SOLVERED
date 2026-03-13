function atualizarContador() {
    let badge = document.getElementById('carrinho-quantidade');
    if (!badge) return;
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = carrinho.length;
    if (total > 0) {
        badge.innerText = total;
        badge.style.visibility = 'visible';
    } else {
        badge.style.visibility = 'hidden';
    }
}

function adicionarAoCarrinho(id) {
    let usuario = localStorage.getItem('usuarioLogado');
    if (!usuario) {
        mostrarPopup("Faça login para comprar", "#dc3545");
        setTimeout(() => { window.location.href = "login.html" }, 500);
        return;
    }
    let produto = estoque.find(p => p.id === id);
    if (!produto) return;
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContador();
    mostrarPopup(produto.nome + " adicionado!", "#ff9800");
}

function renderizarCarrinho() {
    let container = document.getElementById('itens-carrinho');
    let totalTxt = document.getElementById('total-valor');
    if (!container) return;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    container.innerHTML = '';
    let soma = 0;

    carrinho.forEach((item, index) => {
        soma += parseFloat(item.preco);
        container.innerHTML += `
        <div class="item-carrinho">
            <img src="${item.img}" width="100">
            <div class="info-produto">
                <h3>${item.nome}</h3>
                <p>R$ ${parseFloat(item.preco).toFixed(2)}</p>
                <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
            </div>
        </div>
        `;
    });

    if (totalTxt) totalTxt.innerText = "R$ " + soma.toFixed(2);
    
    atualizarContador();
    atualizarTotalPagamento();
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
}

function limparTudo() {
    localStorage.removeItem('carrinho');
    renderizarCarrinho();
}

function atualizarTotalPagamento() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const precoBase = carrinho.reduce((acc, item) => acc + parseFloat(item.preco), 0);
    
    const labelTotal = document.querySelector('.total-linha.principal span:last-child');
    const inputPix = document.querySelector('input[name="pagamento"]:checked');
    const subtotalTxt = document.getElementById('subtotal-valor');

    if (subtotalTxt) subtotalTxt.innerText = "R$ " + precoBase.toFixed(2);
    if (!labelTotal) return;

    let valorFinal = precoBase;

    if (inputPix && inputPix.parentElement.textContent.includes("Pix")) {
        valorFinal = precoBase * 0.95; 
        labelTotal.innerHTML = `R$ ${valorFinal.toFixed(2)} <small>(5% OFF aplicado)</small>`;
    } else {
        labelTotal.innerText = `R$ ${valorFinal.toFixed(2)}`;
    }
}

function finalizarPedido() {
    const cep = document.querySelector('.input-cep')?.value;
    const endereco = document.querySelector('input[placeholder="Endereço Completo"]')?.value;
    const pagamentoElement = document.querySelector('input[name="pagamento"]:checked');

    if (!cep || !endereco || !pagamentoElement) {
        alert("Por favor, preencha os dados de entrega e selecione o pagamento.");
        return;
    }

    const pagamento = pagamentoElement.parentElement.textContent.trim();
    const botao = document.querySelector('.btn-finalizar-checkout');
    
    if (botao) {
        botao.innerText = "Processando...";
        botao.disabled = true;
    }

    setTimeout(() => {
        alert(`Pedido realizado com sucesso!\nForma de pagamento: ${pagamento}\nEntrega em: ${endereco}`);
        localStorage.removeItem('carrinho');
        window.location.href = "index.html";
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrinho();

    document.querySelector('.input-cep')?.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, "$1-$2");
        e.target.value = v;
    });

    document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
        radio.addEventListener('change', atualizarTotalPagamento);
    });

    const btnFinalizar = document.querySelector('.btn-finalizar-checkout');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarPedido);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrinho();
    atualizarTotalPagamento();

    document.querySelector('.input-cep')?.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, "$1-$2");
        e.target.value = v;
    });

    document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
        radio.addEventListener('change', atualizarTotalPagamento);
    });

    const btnFinalizar = document.querySelector('.btn-finalizar-checkout');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarPedido);
    }
});