//récupérer le panier du localStorage
let carte = '';
const tabItems = cart.basket;
console.log('basket tabItems:')
console.log(tabItems);

// affichage et calcul du total des articles et de la somme totale :
const getTotals = () => {
    
    let totalArticles = document.querySelector('#totalQuantity');
    totalArticles.innerHTML = cart.getNumberProduct();
        
    let totalPrice = document.querySelector('#totalPrice');
    totalPrice.innerHTML = cart.getTotalPrice();
}
// affichage des produits dans le panier :
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
let form = document.querySelector('.cart__order__form');
// ecouter la modification du prenom 
form.firstName.addEventListener('change', function(){
    validNameCity(this);
});
// ecouter la modification du nom
form.lastName.addEventListener('change', function(){
    validNameCity(this)
});
// ecouter la modification de la ville
form.city.addEventListener('change', function(){
    validNameCity(this)
});
// ecouter la modification de l'adresse
form.address.addEventListener('change', function(){
    validAddress(this)
});
// ecouter la modification de l'email
form.email.addEventListener('change', function(){
    validEmail(this)
});
// ecouter le bouton commander
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    if (validNameCity(form.firstName) && validNameCity(form.lastName) && validAddress(form.address) && validNameCity(form.city) && validEmail(form.email)){
        //récupérer les valeurs du formulaire
        Data = {
            prenom : form.firstName.value,
            nom : form.lastName.value,
            adresse : form.address.value,
            ville : form.city.value,
            email : form.email.value
        }
        console.log('formulaire Data :')
        console.log(Data);
    } else {
        return false;
    }
    // les mettre dans le localStorage
    localStorage.setItem('Contact', JSON.stringify(Data));
   
    //__________ mettre basket et Data dans un objet à envoyer________
    const sendOrder = {
        tabItems,
        Data
    }
    console.log("à envoyer :")
    console.log(sendOrder);
}); 


//------Conserver les data dans le champ du formulaire------
// récupérer les data contact du localStorage
function getContact() {
    let contact = localStorage.getItem('Contact');
    if (contact == null) {
        return [];
    } else {
        // les transformer en objet js
        return JSON.parse(contact);
    }
}
// les afficher
let contact = getContact();

form.firstName.value = contact.prenom;
form.lastName.value = contact.nom;
form.address.value = contact.adresse;
form.city.value = contact.ville;
form.email.value = contact.email;


//--------Validation Prénom, Nom et Ville---------
const validNameCity = function (input) {
    // regex de validation du prénom, du nom et de la ville
    let nameRegEx = new RegExp(
        '^([a-z]{3,20})?([-]{0,1})?([a-z]{3,20})$','i'
    );
    //récupération de la balise p d'erreur
    let nextPrenom = input.nextElementSibling
    // test de l'expression regulière
    if (nameRegEx.test(input.value)) {
        return true;
    }else{
        nextPrenom.textContent = "Le champs doit contenir entre 3 et 20 lettres au maximum.";
        return false;
    }
};
//--------PB!!Validation Adresse---------
const validAddress = function (input) {
    // regex de validation de l'adresse
    let addressRegEx = new RegExp(
        '[\d]{0,3}[\s\w,.]+','g'
    );   
    //récupération de la balise p d'erreur
    let nextAddress = input.nextElementSibling;
    // test de l'expression regulière
    if (addressRegEx.test(input.value)) {
        return true;
    }else{
        nextAddress.textContent = "Veuillez rentrer une adresse valide";
        return false;
    }
};
//--------Validation Email---------
const validEmail = function (input) {
    // regex de validation de l'adresse
    let emailRegEx = new RegExp(
        '^[a-zA-Z0-9\.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,15}$', 'g'
    );
    //récupération de la balise p d'erreur
    let nextEmail = input.nextElementSibling
    // test de l'expression regulière
    if (emailRegEx.test(input.value)) {
        return true;
    }else{
        nextEmail.textContent = "Veuillez entrer un email valide";
        return false;
    }
};
