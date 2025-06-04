// Lista de produtos com detalhes e status
const produtos = [
    {
        id: 1,
        nome: "Bolsa de palha",
        descricao: "Com design artesanal e natural, essa bolsa de palha é ideal para compor looks casuais ou praianos. Leve, prática e versátil, combina elegância e funcionalidade em qualquer ocasião.",
        imagem: "../images/produtos/bolsa-de-palha.png",
        numeroPedido: "SP-250513-87439218"
    },
    {
        id: 2,
        nome: "Escultura de pato de madeira",
        descricao: "Escultura de pato rústico em madeira, com acabamento natural em tons terrosos e detalhes sutis nas asas em preto. Perfeita para decoração de ambientes com temática campestre ou retrô.",
        imagem: "../images/produtos/pato.png",
        numeroPedido: "SP-123456-78901234"
    }
];

// Função para renderizar a lista de produtos clicáveis
function renderizarListaProdutos() {
    const container = document.createElement('div');
    container.id = 'lista-produtos';
    container.style.marginBottom = '20px';

    produtos.forEach(produto => {
        const btn = document.createElement('button');
        btn.onclick = () => mostrarProduto(produto.id);
        container.appendChild(btn);
    });
    const containerPrincipal = document.querySelector('.container-principal');
    containerPrincipal.insertBefore(container, containerPrincipal.firstChild);
}

// Função para mostrar os detalhes do produto selecionado
function mostrarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    document.getElementById('imagem-produto').src = produto.imagem;
    document.getElementById('imagem-produto').alt = produto.nome;
    document.getElementById('nome-produto').textContent = produto.nome;
    document.getElementById('descricao-produto').textContent = produto.descricao || '';
    document.getElementById('numeroPedido').textContent = produto.numeroPedido;
}
// Inicializa a página com o primeiro produto selecionado e renderiza a lista
window.onload = () => {
    renderizarListaProdutos();
    mostrarProduto(produtos[0].id);
};
