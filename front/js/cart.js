// affichage des produits dans le panier :
let carte = '';
let tabItems = cart.basket;
//console.log(tabItems);
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
    }
    )
}

