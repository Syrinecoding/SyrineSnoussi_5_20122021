// affichage des produits dans le panier :
let carte = '';
let tabItems = cart.basket;
for (let product of tabItems) {
    carte += 
        `<article class="cart__item" data-id="${product.id}" data-color="${product.option_produit}">
        <div class="cart__item__img">
            <img src="${product.image}" alt="${product.texteAlt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.nom}</h2>
                    <p>${product.option_produit}</p>
                    <p>${product.prix} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
}
document.querySelector('#cart__items').innerHTML = carte;


//modification du nombre d'items :
const inputNumber = document.querySelectorAll('input[type=number]');
console.log(inputNumber);
for(e of inputNumber) {
    console.log(e.value);   
    addEventListener("change", function() {
        //cart.changeQuantity();
        //e.textContent = this.value;
        //console.log(e);
        
    }
    ) 
    
}



/*numberItem.addEventListener('change', function() {
    cart.changeQuantity();
    console.log(cart);
});

numberItem.addEventListener('change', function(){
    numberItem.textContent = this.value;
});*/