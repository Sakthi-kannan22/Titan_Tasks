let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartList = document.querySelector('.listCart');
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

        const decreaseButtons = document.querySelectorAll('.decrease');
        const increaseButtons = document.querySelectorAll('.increase');
        const removeButtons = document.querySelectorAll('.remove');

        decreaseButtons.forEach(button => {
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

        increaseButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                let index = event.target.getAttribute('data-index');
                cart[index].quantity++; 
                updateCart(); 
            });
        });

        removeButtons.forEach(button => {
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
}
displayCartItems();
