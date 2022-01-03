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
            foundProduct.quantity = product.quantity;
        } else {
            //product.quantity = 1;
            this.basket.push(product);
            //verifier ici si ce n'est pas ce qui bloque le nombre à 1 quelque soit la valeur affichée.
        }
        this.save();
    }
    remove(product) {
        this.basket = this.basket.filter(p => p.id != product.id && p.option_produit == product.option_produit);
        this.save();
    }
    changeQuantity(product, quantity) {
        let foundProduct = this.basket.find(p => p.id == product.id &&p.option_produit);
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

let cart = new Basket();
console.log(cart);








