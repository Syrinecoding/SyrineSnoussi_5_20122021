//récupérer le panier du localStorage

const tabItems = cart.basket;
console.log('basket tabItems:')
console.log(tabItems);
let products = [];
let articlePrice;
function loopCart () {
    for(let product of tabItems) {
        const pId = product.id;
        const pColor = product.option_produit;
        const pImg = product.image;
        const pAlt = product.texteAlt;
        const pName = product.nom;
        const pQuantity = product.quantity;
        const pPrice = product.prix;
        let productsId = [product.id];
        products.push(productsId);
    }
    articlePrice = pQuantity * pPrice;
}

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

function initArticle() {
    let parent = document.querySelector('#cart__items');

    let articleItem = dom_utils.creatEl({
        type: 'article',
        className: 'cart__item',
        attrs:{
            dataId: `{pId}`,
            dataColor: `{pColor}`,
        }
    });
    parent.appendChild(articleItem);
}
function initDivImage() {
    let parent = document.querySelector('.cart__item');

    let imgDivItem = dom_utils.creatEl({
        className: 'cart__item__img',
    });
    parent.appendChild(imgDivItem);
}
function initImg() {
    let parent = document.querySelector('.cart__item__img');
    let imgItem =dom_utils.creatEl({
        type: 'img',
        attrs:{
            src: ``,
            alt: ``,
        }
    });
    parent.appendChild(imgItem);
}
function initDivContent() {
    let imageItem = document.querySelector('.cart__item__img');
    let divContent = dom_utils.creatEl({
        className: 'cart__item__content',
    });
    imageItem.insertAdjacentElement('beforeend', divContent);
}
function initDescription() {
    let parent = document.querySelector('.cart__item__content');
    let itemDesc = dom_utils.creatEl({
        className: '.cart__item__content__description',
    });
    parent.append(itemDesc);
}
function initSettings() {
    let parent = document.querySelector('.cart__item__content');

    let itemSettings = dom_utils.creatEl({
        className: '.cart__item__content__settings',
    });
    parent.insertAdjacentElement('beforeend', itemSettings);
};
function initsetQuantity() {
    let parent= document.querySelector('.cart__item__content__settings');
    console.log(parent);
    let itemSetQuantity = dom_utils.creatEl({
        className: '.cart__item__content__settings__quantity',
    });
    parent.appendChild(itemSetQuantity);
};

initArticle();
initDivImage();
initImg();
initDivContent();
initDescription();
initSettings();
initsetQuantity();

// // affichage et calcul du total des articles et de la somme totale :
// const getTotals = () => {
    
//     let totalArticles = document.querySelector('#totalQuantity');
//     totalArticles.innerHTML = cart.getNumberProduct();
        
//     let totalPrice = document.querySelector('#totalPrice');
//     totalPrice.innerHTML = cart.getTotalPrice();
// }

// let carte = '';
// let products = [];
// // affichage des produits dans le panier :
// // pb : articlePrice ne se met à jour qu'au rechargement de la page.
// for (let product of tabItems) {
//     let productsId = [product.id];
//     products.push(productsId);
//     console.log(products);
//     let articlePrice = product.quantity * product.prix;
//     carte += 
//         `<article class="cart__item" data-id="${product.id}" data-color="${product.option_produit}">
//         <div class="cart__item__img">
//             <img src="${product.image}" alt="${product.texteAlt}">
//         </div>
//         <div class="cart__item__content">
//             <div class="cart__item__content__description">
//                 <h2>${product.nom}</h2>
//                     <p>${product.option_produit}</p>
//                     <p>${articlePrice} €</p>
//             </div>
//             <div class="cart__item__content__settings">
//                 <div class="cart__item__content__settings__quantity">
//                     <p>Qté : </p>
//                     <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
//                 </div>
//                 <div class="cart__item__content__settings__delete">
//                     <p class="deleteItem">Supprimer</p>
//                 </div>
//             </div>
//         </div>
//     </article>`;
// }
// document.querySelector('#cart__items').innerHTML = carte;


// //modification du nombre d'items :
// //sélectionner tous les input number
// let inputNumber = document.querySelectorAll('input[type=number].itemQuantity');
// //boucle pour récupérer les modifications de quantité sur le panier
// for (let j of inputNumber) {
//     j.addEventListener('change', (event) => {
//     // récupérer la nouvelle valeur:
//         let newArticleQuantity = event.target.value;
//     //récupérer l'id et la couleur de l'article modifié
//         let changedArticle = j.closest(".cart__item");
//         let changedArticleId = changedArticle.dataset.id;
//         let changedArticleColor = changedArticle.dataset.color;
//     //retrouver dans les produits, le produit dont la valeur doit être modifiée dans le panier
//         let changingArticle = cart.findProduct(changedArticleId, changedArticleColor);
//     // modifier la quantité dans le panier
//         cart.changeQuantity(changingArticle, newArticleQuantity);
//         getTotals();
//         location.reload(true);
//     }
//     );
// }

// // suppression d'un article du panier
// let delete_btn = document.querySelectorAll('.deleteItem');
// for(let k of delete_btn) {
//     k.addEventListener('click', () => {
//         let itemToDelete = k.closest(".cart__item");
//     //récupérer son id et sa couleur :
//         let idToDelete = itemToDelete.dataset.id;
//         let colorToDelete = itemToDelete.dataset.color;
//     // trouver la référence de l'article à supprimer
//         let removingItem = cart.findProduct(idToDelete, colorToDelete);
//     //supprimer l'article du panier
//         cart.remove(removingItem);
//     // supprimer l'article du DOM
//         if (cart.length > 0){
//             document.querySelector('#cart__items').removeChild(itemToDelete);
//         } else {
//             let sectionArticles = document.querySelector('#cart__items');
//             sectionArticles.innerHTML = "<h2>Votre panier est vide</h2>"
//         }
//         getTotals();
//     });
// }
// getTotals();

// /**************************************FORMULAIRE************************************** */
// let form = document.querySelector('.cart__order__form');
// // ecouter la modification du prenom 
// form.firstName.addEventListener('change', function(){
//     validNameCity(this);
// });
// // ecouter la modification du nom
// form.lastName.addEventListener('change', function(){
//     validNameCity(this)
// });
// // ecouter la modification de la ville
// form.city.addEventListener('change', function(){
//     validNameCity(this)
// });
// // ecouter la modification de l'adresse
// form.address.addEventListener('change', function(){
//     validAddress(this)
// });
// // ecouter la modification de l'email
// form.email.addEventListener('change', function(){
//     validEmail(this)
// });
// // ecouter le bouton commander
// form.addEventListener('submit', (e) =>{
//     e.preventDefault();
//     if (validNameCity(form.firstName) && validNameCity(form.lastName) && validAddress(form.address) && validNameCity(form.city) && validEmail(form.email)){
//         //récupérer les valeurs du formulaire
//         contact = {
//             firstName : form.firstName.value,
//             lastName : form.lastName.value,
//             address : form.address.value,
//             city : form.city.value,
//             email : form.email.value
//         }
//         console.log('formulaire contact :')
//         console.log(contact);
//     } else {
//         return false;
//     }
//     // les mettre dans le localStorage
//     localStorage.setItem('Contact', JSON.stringify(contact));
   
//     //__________ mettre products et contact dans un objet à envoyer________ 
//     const sendOrder = {
//         contact,
//         products    
//     }
//     //appel de la fonction POST
//     sendingOrder(sendOrder);
    
// }); 

// //------Conserver les data dans le champ du formulaire------
// // récupérer les data contact du localStorage
// function getContact() {
//     let user = localStorage.getItem('Contact');
//     if (user != null) {
//         return JSON.parse(user);   
//     }
// };
// // les afficher
// let user = getContact();
// form.firstName.value = user.firstName;
// form.lastName.value = user.lastName;
// form.address.value = user.address;
// form.city.value = user.city;
// form.email.value = user.email;

// //--------Validation Prénom, Nom et Ville---------
// const validNameCity = function (input) {
//     // regex de validation du prénom, du nom et de la ville
//     let nameRegEx = new RegExp(
//         '^([a-z]{3,20})?([-]{0,1})?([a-z]{3,20})$','i'
//         //'^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$', 'g'
//     );
//     //récupération de la balise p d'erreur
//     let nextPrenom = input.nextElementSibling
//     // test de l'expression regulière
//     if(input.value.length < 3 || input.value.length > 20) {
//         nextPrenom.textContent = "Le champs doit contenir entre 3 et 20 lettres au maximum.";
//         return false;
//     } else if (!nameRegEx.test(input.value)) {
//         nextPrenom.textContent = "Le champs ne doit contenir aucun caractères spéciaux.";
//         return false;
//     } else if (nameRegEx.test(input.value)) {
//         return true;
//     }    
// };
// //--------PB!!Validation Adresse---------
// const validAddress = function (input) {
//     // regex de validation de l'adresse
//     let addressRegEx = new RegExp(
//         '[0-9-a-zA-Z\s, ]*','g'
//     );   
//     //récupération de la balise p d'erreur
//     let nextAddress = input.nextElementSibling;
//     // test de l'expression regulière
//     if (addressRegEx.test(input.value)) {
//         return true;
//     }else{
//         nextAddress.textContent = "Veuillez rentrer une adresse valide";
//         return false;
//     }
// };
// //--------Validation Email---------
// const validEmail = function (input) {
//     // regex de validation de l'adresse mail
//     let emailRegEx = new RegExp(
//         '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,15}$', 'g'
//     );
//     //récupération de la balise p d'erreur
//     let nextEmail = input.nextElementSibling
//     // test de l'expression regulière
//     if (emailRegEx.test(input.value)) {
//         return true;
//     }else{
//         nextEmail.textContent = "Veuillez entrer un email valide";
//         return false;
//     }
// };


// const sendingOrder = (sendOrder) =>{
//     //-------envoi de l'objet contenant produit et contact vers le serveur--------
//     const promiseOrder = fetch('http://localhost:3000/api/products/order', {
//         method: 'POST',
//         body: JSON.stringify(sendOrder),
//         headers: {
//         'Content-Type' : 'application/json',
//         },
//     })
//     .then(response => response.json())
//     .then(data => {
//         let reference = `${data.orderId}`;
//         window.location = `../html/confirmation.html?id=${data.orderId}`;
//     })
//     .catch(err => console.log('Erreur : ' + err));
// };