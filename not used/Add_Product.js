const addButton = document.getElementById('addButton');
const addModal = document.getElementById('addProductModal');
const editModal = document.getElementById('editProductModal');
const closeBtns = document.getElementsByClassName('close');

addButton.onclick = function() {
    addModal.classList.add('show');
}

Array.from(closeBtns).forEach(btn => {
    btn.onclick = function() {
        addModal.classList.remove('show');
        editModal.classList.remove('show');
    }
});

window.onclick = function(event) {
    if (event.target == addModal) {
        addModal.classList.remove('show');
    }
    if (event.target == editModal) {
        editModal.classList.remove('show');
    }
}

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const imageFile = document.getElementById('productImage').files[0];
    const description = document.getElementById('productDescription').value;
    const rating = parseFloat(document.getElementById('productRating').value);
    const price = parseFloat(document.getElementById('productPrice').value);

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageDataUrl = e.target.result;
            const newProduct = {
                name: name,
                image: imageDataUrl,
                description: description,
                rating: rating,
                price: price
            };
            addProduct(newProduct);
        }
        reader.readAsDataURL(imageFile);
    } else {
        const newProduct = {
            name: name,
            description: description,
            rating: rating,
            price: price
        };
        addProduct(newProduct);
    }

    // Reset form and close modal
    this.reset();
    addModal.classList.remove('show');
});

document.getElementById('editProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('editProductId').value;
    const name = document.getElementById('editProductName').value;
    const imageFile = document.getElementById('editProductImage').files[0];
    const description = document.getElementById('editProductDescription').value;
    const rating = parseFloat(document.getElementById('editProductRating').value);
    const price = parseFloat(document.getElementById('editProductPrice').value);

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageDataUrl = e.target.result;
            const updatedProduct = {
                name: name,
                image: imageDataUrl,
                description: description,
                rating: rating,
                price: price
            };
            updateProduct(id, updatedProduct);
        }
        reader.readAsDataURL(imageFile);
    } else {
        const updatedProduct = {
            name: name,
            description: description,
            rating: rating,
            price: price
        };
        updateProduct(id, updatedProduct);
    }

    // Reset form and close modal
    this.reset();
    editModal.classList.remove('show');
});

function addProduct(product) {
    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        displayProducts();
    })
    .catch(error => console.error('Error:', error));
}

function updateProduct(id, product) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        displayProducts();
    })
    .catch(error => console.error('Error:', error));
}

function deleteProduct(id) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        displayProducts();
    })
    .catch(error => console.error('Error:', error));
}

function loadProducts() {
    return fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => data.data)
        .catch(error => console.error('Error:', error));
}

function displayProducts() {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = ""; // Clear existing products

    loadProducts().then(products => {
        products.forEach((product) => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
    });
}

function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Rating: ${product.rating.toFixed(2)}/5</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button class="add-to-cart">Add to Cart</button>
        <button class="edit-product" onclick="editProduct(${product.id})">Edit</button>
        <button class="remove-product" onclick="deleteProduct(${product.id})">Remove</button>
    `;
    return productCard;
}

function editProduct(id) {
    loadProducts().then(products => {
        const product = products.find(product => product.id == id);

        if (product) {
            document.getElementById('editProductId').value = product.id;
            document.getElementById('editProductName').value = product.name;
            document.getElementById('editProductDescription').value = product.description;
            document.getElementById('editProductRating').value = product.rating;
            document.getElementById('editProductPrice').value = product.price;
            editModal.classList.add('show');
        }
    });
}

window.addEventListener("DOMContentLoaded", displayProducts);