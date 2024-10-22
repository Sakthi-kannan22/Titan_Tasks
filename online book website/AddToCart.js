let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = document.querySelector('.icon-cart span');
let cartList = document.querySelector('.listCart');


function updateCartCount() {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}


function displayCartItems() {
    cartList.innerHTML = '';  

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            let cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price} x <span class="quantity">${item.quantity}</span></span>
                <button class="decrease" data-index="${index}">-</button>
                <button class="increase" data-index="${index}">+</button>
                <button class="remove" data-index="${index}">Remove</button>
            `;
            cartList.appendChild(cartItem);
        });

        
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', (event) => {
                let index = event.target.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--; 
                } else {
                    cart.splice(index, 1); 
                }
                updateCart();
            });
        });

        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', (event) => {
                let index = event.target.getAttribute('data-index');
                cart[index].quantity++; 
                updateCart();
            });
        });

        document.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', (event) => {
                let index = event.target.getAttribute('data-index');
                cart.splice(index, 1); 
                updateCart();
            });
        });
    }
}


function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); 
    updateCartCount(); 
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        let name = event.target.getAttribute('data-name');
        let price = parseFloat(event.target.getAttribute('data-price'));
        
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++; 
        } else {
            cart.push({ name, price, quantity: 1 }); 
        }
        updateCart(); 
    });
});

displayCartItems();
updateCartCount();

