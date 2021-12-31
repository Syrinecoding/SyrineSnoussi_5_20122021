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
            total += product.quantity * product.price;
        }
        return total; 
    }
}

let basket = new Basket();
console.log(basket);

let affichageItems = '';


/*affichageItems +=
    `<article class="cart__item" data-id="${product-ID}" data-color="${product-color}">
        <div class="cart__item__img">
            <img src="${images}" alt="${Photographie}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${Nom}</h2>
                    <p>${Vert}</p>
                    <p>${42,00} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${42}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
}document.querySelector('#cart__items').innerHTML = affichageItems.
*/