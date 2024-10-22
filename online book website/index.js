import cart from "./AddToCart.js";
import products from "./product.js";
let app=document.getElementById('app');
let temporaryContent=document.getElementById('temporaryContent');
const loadTemplate=()=>{
    fetch('/template.html')
    .then(response=>response.text())
    .then(html=>{
        app.innerHTML=html;
        let contentTab=document.getElementById('contentTab');
        contentTab.innerHTML=temporaryContent.innerHTML;
        temporaryContent.innerHTML=null;
        cart();
        initApp();
    })
}
loadTemplate();
const initApp=()=>{
    let listProduct=document.querySelector('.listProduct');
    listProduct.innerHTML=null;
    products.forEach(product=>{
        let newProduct=document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML=
        '<img src="${product.image}"/> <h2>${Book name}</h2> <h3>${Author name}</h3> <div class="price">$${product.Price}</div> <button class="addCart">Add to Cart</button>';
        listProduct.appendChild(newProduct);
    })
}
