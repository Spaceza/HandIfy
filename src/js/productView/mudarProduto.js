import { products } from "../database.js";

document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.product-gallery .main-image img');
    const thumbnails = document.querySelectorAll('.product-gallery .thumbnails img');
    const productName = document.querySelector('.product-details h1');
    const oldPrice = document.querySelector('.product-details .old-price');
    const currentPrice = document.querySelector('.product-details .current-price');
    const installments = document.querySelector('.product-details .installments');
    const productInfo = document.querySelector('.product-info');

    // Função para preencher as informações do produto principal
    function fillProductInfo(product) {
        if (!product) return;
        if (mainImage) mainImage.src = product.img;
        if (productName) productName.textContent = product.name;
        if (oldPrice) oldPrice.textContent = product.originalPrice || '';
        if (currentPrice) currentPrice.textContent = product.price || '';
        if (installments && product.price) {
            const valor = parseFloat(product.price.replace(/[^0-9,]/g, '').replace(',', '.'));
            if (!isNaN(valor)) {
                const parcela = (valor / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                installments.textContent = `em 12x R$ ${parcela}*`;
            }
        }
        // Exemplo de lógica para thumbnails e product-info
        if (thumbnails.length > 0) {
            if (product.name.toLowerCase().includes('bolsa de palha')) {
                thumbnails.forEach(thumb => thumb.style.display = '');
            } else {
                thumbnails.forEach(thumb => thumb.style.display = 'none');
            }
        }
        if (productInfo) {
            if (product.name.toLowerCase().includes('bolsa de palha')) {
                productInfo.style.display = '';
            } else {
                productInfo.style.display = 'none';
            }
        }
    }

    // Ao abrir a página, preenche as infos se houver slug
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('produto');
    if (slug) {
        const product = products.find(p => p.slug === slug);
        fillProductInfo(product);
    }

    // --- Cards de produtos similares/ofertas ---
    const cards = document.querySelectorAll('.Produtos-similares .card, .other-offers .card, .carrossel-cards .card');
    cards.forEach(card => {
        const h5 = card.querySelector('h5') || card.querySelector('.card-title');
        const title = h5 ? h5.textContent.trim() : '';
        const slug = card.getAttribute('data-slug');
        const product = products.find(p => p.slug === slug);
        card.style.cursor = "pointer";
        card.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = `${window.location.pathname}?produto=${product.slug}`;
        });
        Array.from(card.children).forEach(child => {
            child.style.cursor = "pointer";
            child.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = `${window.location.pathname}?produto=${product.slug}`;
            });
        });
    });
});

