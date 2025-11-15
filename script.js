// ===========================
// DADOS DOS PRODUTOS
// ===========================

const products = [
    {
        id: 1,
        name: "Cantoneira Reforçada",
        category: "Reforçadas",
        price: 45.90,
        image: "https://via.placeholder.com/300x300?text=Cantoneira+Reforçada&bg=ff8c00&text_color=fff",
        description: "Cantoneira reforçada de alta resistência"
    },
    {
        id: 2,
        name: "Cantoneira de Alumínio",
        category: "Alumínio",
        price: 32.50,
        image: "https://via.placeholder.com/300x300?text=Aluminio&bg=ff8c00&text_color=fff",
        description: "Cantoneira de alumínio leve e durável"
    },
    {
        id: 3,
        name: "Cantoneira de Ferro",
        category: "Ferro",
        price: 28.90,
        image: "https://via.placeholder.com/300x300?text=Ferro&bg=ff8c00&text_color=fff",
        description: "Cantoneira de ferro - unidade ou kit"
    },
    {
        id: 4,
        name: "Cantoneira para Pintura",
        category: "Pintura",
        price: 35.00,
        image: "https://via.placeholder.com/300x300?text=Pintura&bg=ff8c00&text_color=fff",
        description: "Cantoneira preparada para pintura"
    },
    {
        id: 5,
        name: "Dobra de Cantoneira",
        category: "Dobras",
        price: 22.50,
        image: "https://via.placeholder.com/300x300?text=Dobra&bg=ff8c00&text_color=fff",
        description: "Dobra de cantoneira de qualidade"
    },
    {
        id: 6,
        name: "Cantoneira para Escada",
        category: "Escada",
        price: 55.00,
        image: "https://via.placeholder.com/300x300?text=Escada&bg=ff8c00&text_color=fff",
        description: "Cantoneira especial para escadas"
    }
];

// ===========================
// ESTADO DA APLICAÇÃO
// ===========================

let currentCategory = "all";

// ===========================
// ELEMENTOS DO DOM
// ===========================

const menuBtn = document.getElementById("menuBtn");
const navMobile = document.getElementById("navMobile");
const categoriesContainer = document.getElementById("categoriesContainer");
const productsContainer = document.getElementById("productsContainer");
const productsTitle = document.getElementById("productsTitle");
const scrollBtn = document.getElementById("scrollBtn");
const contactForm = document.getElementById("contactForm");

// ===========================
// FUNÇÕES PRINCIPAIS
// ===========================

// Renderizar produtos
function renderProducts(category = "all") {
    const filteredProducts = category === "all" 
        ? products 
        : products.filter(p => p.category === category);

    productsContainer.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `).join("");

    // Atualizar título
    if (category === "all") {
        productsTitle.textContent = "Todos os Produtos";
    } else {
        productsTitle.textContent = category;
    }
}

// Filtrar por categoria
function filterByCategory(category) {
    currentCategory = category;
    
    // Atualizar botões ativos
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.category === category) {
            btn.classList.add("active");
        }
    });

    // Renderizar produtos filtrados
    renderProducts(category);
}

// Mostrar notificação
function showNotification(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff8c00 0%, #e67e00 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease-out";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================
// EVENT LISTENERS
// ===========================

// Menu mobile
menuBtn.addEventListener("click", () => {
    navMobile.classList.toggle("active");
});

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-mobile .nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMobile.classList.remove("active");
    });
});

// Filtrar por categoria
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        filterByCategory(btn.dataset.category);
    });
});

// Scroll para produtos
scrollBtn.addEventListener("click", () => {
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
});

// Formulário de contato
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showNotification("Mensagem enviada com sucesso!");
    contactForm.reset();
});

// ===========================
// INICIALIZAÇÃO
// ===========================

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    
    // Adicionar animação ao carregar
    const style = document.createElement("style");
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===========================
// UTILITÁRIOS
// ===========================

// Função para buscar produtos (pode ser expandida)
function searchProducts(query) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
    
    productsContainer.innerHTML = filtered.length > 0 
        ? filtered.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h4 class="product-name">${product.name}</h4>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `).join("")
        : '<p style="text-align: center; color: #718096;">Nenhum produto encontrado.</p>';
}

// Função para obter lista de produtos
function getProducts() {
    return products;
}

// Função para obter produto por ID
function getProductById(id) {
    return products.find(p => p.id === id);
}

// Função para adicionar novo produto (para integração com estoque)
function addProduct(product) {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct = { ...product, id: newId };
    products.push(newProduct);
    return newProduct;
}

// Função para atualizar produto (para integração com estoque)
function updateProduct(id, updatedData) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        return products[index];
    }
    return null;
}

// Função para remover produto (para integração com estoque)
function removeProduct(id) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        const removed = products.splice(index, 1);
        return removed[0];
    }
    return null;
}
