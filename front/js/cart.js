// gérer l'affichage du panier et de la page confirmation
let queryActualUrl = window.location.href
// variable contenu du localStorage
const tabItems = cart.basket;
 // tableau pour récupérer les id des produits
let products = new Array();
// initialiser la variable du prix total des articles
let total = 0 ;
// afficher les produits du panier
displayCart = () => {
    console.log("Affichage panier");
    // récupérer les produits de l'API
    fetch('http://localhost:3000/api/products/')
    .then(response => response.json())
    .then(allProducts => {
        // boucle pour récupérer les valeurs des produits du panier
        for(let p of tabItems) {
            // récupérer les id pour le POST
            products.push(p.id);
            // retrouver dans les produits de l'API, les produits du panier
            let product = allProducts.find(product => product._id == p.id);
            // calculer la somme totale dûe
            total += p.quantity * product.price;
            // afficher cart__item pour chaque produit
            displayCartItem(product, p); 
               
        }
        listenInputQuantity();
        listenDelete();  
        getTotalPrice(total); 
    });
    getTotalArticles();
    listenForm(); 
    fillForm();
};

// fonction pour générer les éléments du DOM à ajouter
let dom_utils = {};
(function(context){
    // objet avec propriétés d'un élément
    context.creatEl = function(o) {
        let type = o.type ||'div';
        let el = document.createElement(type);
            for(const key of (Object.keys(o))) {
                if(key != 'attrs' && key != 'type') {
                    el[key] = o[key];
                }
            }
            if(o.attrs) {
                for(let key of (Object.keys(o.attrs))) {
                    let value = o.attrs[key];
                    if(key != key.toLowerCase()) {
                        key = key.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
                    }
                    el.setAttribute(key, value);
                }
            }
            return el;    
    };
    
})(dom_utils);

//générer le code d'un article du panier 
    // la balise article
displayCartItem = (product, p) => {
    function initArticle(p) {
        let parent = document.querySelector('#cart__items');
    
        let articleItem = dom_utils.creatEl({
            type: 'article',
            className: 'cart__item',
            attrs:{
                dataId: p.id,
                dataColor: p.option_produit,
            }
        });
        parent.appendChild(articleItem);
    }
    //la div img
    function initDivImage(product) {
        let parents = document.querySelectorAll('.cart__item');
        let last = parents[parents.length -1]
    
        let imgDivItem = dom_utils.creatEl({
            className: 'cart__item__img',
            innerHTML: `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        });
        last.appendChild(imgDivItem);
    }
    // la div content
    function initDivContent() {
        let imageItems = document.querySelectorAll('.cart__item');
        let last = imageItems[imageItems.length -1]
        let divContent = dom_utils.creatEl({
            className: 'cart__item__content',
        });
        last.appendChild(divContent);
    }
    // la div description
    let displayPrice;
    function initDescription(p, product) {
        let parents = document.querySelectorAll('.cart__item__content');
        let last = parents[parents.length -1];
        displayPrice = product.price * p.quantity;
    
        let itemDesc = dom_utils.creatEl({
            className: 'cart__item__content__description',
            innerHTML: `<h2>${product.name}</h2>\n<p>${p.option_produit}</p>\n<p>${displayPrice} €</p>`
        });
        last.appendChild(itemDesc);
    }
    
    // la div settings
    function initSettings() {
        let parents = document.querySelectorAll('.cart__item__content');
        let last = parents[parents.length -1]
    
        let itemSettings = dom_utils.creatEl({
            className: 'cart__item__content__settings',
        });
        last.appendChild(itemSettings);
    };
    // la div quantity
    function initsetQuantity(p) {
        let parents = document.querySelectorAll('.cart__item__content__settings');
        let last = parents[parents.length -1]
    
        let itemSetQuantity = dom_utils.creatEl({
            className: 'cart__item__content__settings__quantity',
            innerHTML: `<p>Qté : ${p.quantity}</p>`,
        });
        last.appendChild(itemSetQuantity);
    };
    // l'input itemQuantity
    function initInputQty(p) {
        let parents = document.querySelectorAll('.cart__item__content__settings__quantity');
        let last = parents[parents.length -1]
        let itemInputQuantity = dom_utils.creatEl({
            type: 'input',
            className: 'itemQuantity',
            attrs:{
                type: 'number',
                name: 'itemQuantity',
                min: '1',
                max: '100',
                value: `${p.quantity}`,
            }
        });
        last.appendChild(itemInputQuantity);
    };
    // la div delete 
    function initSetDelete(p) {
        let parents = document.querySelectorAll('.cart__item__content__settings');
        let last = parents[parents.length -1]
        let itemSetDelete = dom_utils.creatEl({
            className: 'cart__item__content__settings__delete',
            innerHTML: '<p class="deleteItem">Supprimer</p>',
        });
        last.appendChild(itemSetDelete);
    };
    // appel de toutes les balises de l'article
    initArticle(p);
    initDivImage(product);
    initDivContent();
    initDescription(p, product);
    initSettings();
    initsetQuantity(p);
    initInputQty(p);
    initSetDelete(p);
}

// afficher le prix total
const getTotalPrice = (total) => {
    const totalPrice = document.querySelector('#totalPrice');
    totalPrice.innerHTML = total;
}

// affichage et calcul du total des articles :
const getTotalArticles = () => {
    const totalArticles = document.querySelector('#totalQuantity');
    totalArticles.innerHTML = cart.getNumberProduct();  
}

// modification du nombre d'items :
const listenInputQuantity = () => {
    // //sélectionner tous les input number
    let inputNumber = document.querySelectorAll('input[type=number].itemQuantity');
    //boucle pour récupérer les modifications de quantité sur le panier
    for (let j of inputNumber) {
        j.addEventListener('change', (event) => {
            // récupérer la nouvelle valeur:
            let newArticleQuantity = event.target.value;
            //récupérer l'id et la couleur de l'article modifié
            let changedArticle = j.closest(".cart__item");
            let changedArticleId = changedArticle.dataset.id;
            let changedArticleColor = changedArticle.dataset.color;
            //retrouver dans les produits, le produit dont la valeur doit être modifiée dans le panier
            let changingArticle = cart.findProduct(changedArticleId, changedArticleColor);
            // modifier la quantité dans le panier
            cart.changeQuantity(changingArticle, newArticleQuantity);
            getTotalArticles();
            location.reload(true);
        });
    }
}


// suppression d'un article du panier
const listenDelete = () => {
    let delete_btn = document.querySelectorAll('.deleteItem');
    for(let k of delete_btn) {
        k.addEventListener('click', () => {
            //récupérer son id et sa couleur :
            let idToDelete = k.closest(".cart__item").dataset.id;
            let colorToDelete = k.closest(".cart__item").dataset.color;
            // trouver la référence de l'article à supprimer
            let removingItem = cart.findProduct(idToDelete, colorToDelete);
            //supprimer l'article du panier
            cart.remove(removingItem);
            // supprimer l'article du DOM
            if (cart.length > 0){
                document.querySelector('#cart__items').removeChild(k.closest(".cart__item"));
            } else {
                let sectionArticles = document.querySelector('#cart__items');
                sectionArticles.innerHTML = "<h2>Votre panier est vide</h2>"
            }
            getTotalArticles();
            location.reload(true);
        });
    }
}


/**************************************FORMULAIRE************************************** */
//écouter le formulaire et valider la commande
const listenForm = () => {
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
            let contact = {
                firstName : form.firstName.value,
                lastName : form.lastName.value,
                address : form.address.value,
                city : form.city.value,
                email : form.email.value
            }
            console.log('formulaire contact :')
            console.log(contact);
        } 
        // les mettre dans le localStorage
        localStorage.setItem('Contact', JSON.stringify(contact));
    
        //__________ mettre products et contact dans un objet à envoyer________ 
        const sendOrder = {
            contact,
            products    
        }
        
        //appel de la fonction POST
        sendingOrder(sendOrder);
        
    }); 
    
};


// récupérer les data contact du localStorage
function getContact() {
    let user = localStorage.getItem('Contact');
    if (user != null) {
        return JSON.parse(user);   
    }
};
// remplir les champs de form avec le contact en storage
function fillForm() {
    let form = document.querySelector('.cart__order__form');
    let user = getContact();
    form.firstName.value = user.firstName;
    form.lastName.value = user.lastName;
    form.address.value = user.address;
    form.city.value = user.city;
    form.email.value = user.email;
};


//--------Validation Prénom, Nom et Ville---------
const validNameCity = function (input) {
    // regex de validation du prénom, du nom et de la ville
    let nameRegEx = new RegExp(
        //'^([a-z]{3,20})?([-]{0,1})?([a-z]{3,20})$','i'
        '^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$', 'g'
    );
    //récupération de la balise p d'erreur
    let nextPrenom = input.nextElementSibling
    // test de l'expression regulière
    if(input.value.length < 3 || input.value.length > 20) {
        nextPrenom.textContent = "Le champs doit contenir entre 3 et 20 lettres au maximum.";
        nextPrenom.style.color = 'red';
        
    } else if (!nameRegEx.test(input.value)) {
        nextPrenom.textContent = "Le champs ne doit contenir aucun caractères spéciaux.";
        nextPrenom.style.color = 'red';

    } 
    
};
//--------PB!!Validation Adresse---------
const validAddress = function (input) {
    // regex de validation de l'adresse
    let addressRegEx = new RegExp(
        '[0-9-a-zA-ZÀ-ÿ\s, ]*','g'
    );   
    //récupération de la balise p d'erreur
    let nextAddress = input.nextElementSibling;
    // test de l'expression regulière
    if (addressRegEx.test(input.value)) {
        return true;
    }else{
        nextAddress.textContent = "Veuillez rentrer une adresse valide";
        nextAddress.style.color = 'red';
        return false;
    }
    
};
//--------Validation Email---------
const validEmail = function (input) {
    // regex de validation de l'adresse mail
    let emailRegEx = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,15}$', 'g'
    );
    //récupération de la balise p d'erreur
    let nextEmail = input.nextElementSibling
    // test de l'expression regulière
    if (emailRegEx.test(input.value)) {
        return true;
    }else{
        nextEmail.textContent = "Veuillez entrer un email valide";
        nextEmail.style.color = 'red';
        return false;
    }

};


const sendingOrder = (sendOrder) =>{
    //-------envoi de l'objet contenant produit et contact vers le serveur--------
    const promiseOrder = fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        body: JSON.stringify(sendOrder),
        headers: {
        'Content-Type' : 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        window.location = `../html/confirmation.html?id=${data.orderId}`;
        //localStorage.clear();
    })
    .catch(err => console.log('Erreur : ' + err));
};
     
let urlToDisplay = queryActualUrl.split('/')
if(urlToDisplay[urlToDisplay.length-1].startsWith('confirmation')) {
    displayConfirmation()
}else{
    displayCart()
}