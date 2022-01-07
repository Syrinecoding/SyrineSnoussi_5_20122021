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
    get length() {
        return this.basket.length;
    }
    save() {
        //enregistre le panier dans localStorage : clé : 'basket' et valeur :(variable) basket.
        localStorage.setItem('basket', JSON.stringify(this.basket));
    }
    add(product) {
        //let foundProduct = this.basket.find(p => p.id == product.id && p.option_produit == product.option_produit);
        let foundProduct = this.findProduct(product.id, product.option_produit)
        if (foundProduct != undefined) {
            foundProduct.quantity = product.quantity;
        } else {
            //product.quantity = 1;
            this.basket.push(product);
            
        }
        this.save();
    }
    remove(product) {
        this.basket = this.basket.filter(p => p.id != product.id && p.option_produit != product.option_produit);
        this.save();
    }
    changeQuantity(product, quantity) {
        let foundProduct = this.findProduct(product.id, product.option_produit);
        if (foundProduct != undefined) {
            foundProduct.quantity = quantity;
            if (foundProduct.quantity < 1) {
                this.remove(foundProduct);
            } else {
                this.save();
            }
        }
    }
    getNumberProduct() {
        let number = 0;
        for (let product of this.basket) {
            number += parseInt(product.quantity);
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
    findProduct(id, color) {
        let foundProduct = this.basket.find(p => p.id == id && p.option_produit == color);
        if(foundProduct != undefined) {
            return foundProduct;
        } else {
            console.log("no product found");
            return null;
        }
    }
}

let cart = new Basket();
//console.log(cart);
// jester pour tester







