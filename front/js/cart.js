// affichage des produits dans le panier :
let carte = '';
let tabItems = cart.basket;
console.log(tabItems);

// console.log(articlePrice);
for (let product of tabItems) {
    let articlePrice = product.quantity * product.prix;
    carte += 
        `<article class="cart__item" data-id="${product.id}" data-color="${product.option_produit}">
        <div class="cart__item__img">
            <img src="${product.image}" alt="${product.texteAlt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.nom}</h2>
                    <p>${product.option_produit}</p>
                    <p>${articlePrice} €</p>
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
    //sélectionner tous les input number
let inputNumber = document.querySelectorAll('input[type=number]');
//console.log(inputNumber);
//boucle pour récupérer les modifications de quantité sur le panier
for (let j of inputNumber) {
    j.addEventListener('change', (event) => {
        // récupérer la nouvelle valeur:
        let newArticleQuantity = event.target.value;
        console.log(newArticleQuantity);
        //récupérer l'id et la couleur de l'article modifié
        let changedArticle = j.closest(".cart__item");
        console.log(changedArticle);
        let changedArticleId = changedArticle.dataset.id;
        console.log(changedArticleId);
        let changedArticleColor = changedArticle.dataset.color;
        console.log(changedArticleColor);
        //retrouver dans les produits, le produit dont la valeur doit être modifiée dans le panier
        let changingArticle = cart.findProduct(changedArticleId, changedArticleColor);
        console.log(changingArticle);
        // modifier la quantité dans le panier
        cart.changeQuantity(changingArticle, newArticleQuantity);
        
    }
    );
}

// suppression d'un article du panier
let delete_btn = document.querySelectorAll('.deleteItem');
for(let k of delete_btn) {
    k.addEventListener('click', () => {
        let itemToDelete = k.closest(".cart__item");
        //console.log(itemToDelete);
        //récupérer son id et sa couleur :
        let idToDelete = itemToDelete.dataset.id;
        let colorToDelete = itemToDelete.dataset.color;
        //console.log(idToDelete + ' ' + colorToDelete);
        // trouver la référence de l'article à supprimer
        let removingItem = cart.findProduct(idToDelete, colorToDelete);
        //console.log(removingItem);
        //supprimer l'article du panier
        cart.remove(removingItem);
        // supprimer l'article du DOM
        if (cart.length > 0){
            document.querySelector('#cart__items').removeChild(itemToDelete);
            //itemToDelete.innerHTML = "<h2>L'article a bien été supprimé du panier</h2>"
        } else {
            let sectionArticles = document.querySelector('#cart__items');
            sectionArticles.innerHTML = "<h2>Votre panier est vide</h2>"
        }
       
    });
}

// affichage et calcul du total des articles et de la somme totale

    /*let totalArticles = document.querySelector('#totalQuantity');
    let numberProducts = cart.getNumberProduct();
    console.log(numberProducts);
    totalArticles.innerHTML = numberProducts;*/
    
let totalPrice = document.querySelector('#totalPrice');
let total = cart.getTotalPrice();
totalPrice.innerHTML = total;

// les sommes ne se remettent pas à jour
