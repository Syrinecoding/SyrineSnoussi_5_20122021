class Basket {
    constructor(){
        // récupère l'item 'basket' du localStorage dans la variable basket.
        let basket = localStorage.getItem('basket');
        if (basket == null) {
            this.basket = [];
        } else {
            this.basket = JSON.parse(basket);
            //convertir les objets du local storage en format js.
        }
    }
    save() {
        //enregistre le panier dans localStorage : clé : 'basket' et valeur :(variable) basket.
        localStorage.setItem('basket', JSON.stringify(this.basket));
    }
    add(product) {
        let foundProduct = this.basket.find(p => p.id == product.id && p.option_produit == product.option_produit);
        if (foundProduct != undefined) {
            foundProduct.quantity++;
        } else {
            product.quantity = 1;
            this.basket.push(product);
        }
        this.save();
    }
    remove(product) {
        this.basket = this.basket.filter(p => p.id != product.id && p.option_produit == product.option_produit);
        this.save();
    }
    changeQuantity(product, quantity) {
        let foundProduct = this.basket.find(p => p.id == product.id && p.option_produit == product.option_produit );
        if (foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if (foundProduct.quantity <= 0) {
                this.remove(foundProduct);
            } else {
                this.save();
            }
        }
    }
    getNumberProduct() {
        let number = 0;
        for (let product of this.basket) {
            number += product.quantity;
        }
        return number;
    }
    getTotalPrice() {
        let total = 0;
        for (let product of this.basket) {
            total += product.quantity * product.prix;
        }
        return total; 
    }
}

let basket = new Basket();
console.log(basket);

let savePanier = JSON.parse(localStorage.getItem('basket'));
console.log(savePanier)
let panier = document.querySelector('#cart__items');
//let affichageItems;
savePanier.forEach(product => {
    panier.innerHTML +=
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
    </article>`
    });






