// affichage des produits dans le panier :
let carte = '';
let tabItems = cart.basket;
//console.log(tabItems);

// affichage et calcul du total des articles et de la somme totale :
const getTotals = () => {
    
    let totalArticles = document.querySelector('#totalQuantity');
    totalArticles.innerHTML = cart.getNumberProduct();
        
    let totalPrice = document.querySelector('#totalPrice');
    totalPrice.innerHTML = cart.getTotalPrice();
}

// pb : articlePrice ne se met à jour qu'au rechargement de la page.
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
        //console.log(newArticleQuantity);
        //récupérer l'id et la couleur de l'article modifié
        let changedArticle = j.closest(".cart__item");
        //console.log(changedArticle);
        let changedArticleId = changedArticle.dataset.id;
        //console.log(changedArticleId);
        let changedArticleColor = changedArticle.dataset.color;
        //console.log(changedArticleColor);
        //retrouver dans les produits, le produit dont la valeur doit être modifiée dans le panier
        let changingArticle = cart.findProduct(changedArticleId, changedArticleColor);
        //console.log(changingArticle);
        // modifier la quantité dans le panier
        cart.changeQuantity(changingArticle, newArticleQuantity);
        getTotals();
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
        } else {
            let sectionArticles = document.querySelector('#cart__items');
            sectionArticles.innerHTML = "<h2>Votre panier est vide</h2>"
        }
        getTotals();
    });
}
getTotals();
/**************************************FORMULAIRE************************************** */


// selection du bouton Commander 
const orderBtn = document.querySelector('#order');
// ecouter le bouton 
orderBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    
   //récupérer les valeurs du formulaire
   const Data = {
       prenom : document.querySelector('#firstName').value,
       nom : document.querySelector('#lastName').value,
       adresse : document.querySelector('#address').value,
       ville : document.querySelector('#city').value,
       email : document.querySelector('#email').value
   }
    console.log(Data);
    
    // les mettre dans le localStorage
    localStorage.setItem('Contact', JSON.stringify(Data));
   
    // mettre basket et Data dans un objet à envoyer
    
});  






