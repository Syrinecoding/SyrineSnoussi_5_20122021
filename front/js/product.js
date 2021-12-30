// récupérer la chaine de l'url
const queryUrl= window.location.href;
//console.log(queryUrl);

//extraire l'id
const url = new URL(queryUrl);
//console.log(url);
const id = url.searchParams.get('id');
console.log(id);


//attribuer les valeurs de l'objet au html
const promiseProduct = fetch(`http://localhost:3000/api/products/${id}`);

//récupérer la valeurs des clés de chaque produit
promiseProduct
.then(response => response.json()
.then(productData => {
    console.log(productData);

    let affichageImg = `<img src="${productData['imageUrl']}">`;
    document.querySelector('.item__img').innerHTML = affichageImg;

    let affichageTitle = `${productData['name']}`;
    document.querySelector('#title').innerHTML = affichageTitle;

    let affichagePrice = `${productData['price']} `;
    document.querySelector('#price').innerHTML = affichagePrice;

    let affichageDesc = `${productData['description']}`;
    document.querySelector('#description').innerHTML = affichageDesc;

    //boucle pour générer chaque option de couleur dans le menu déroulant
    let tabCol = productData['colors']; 
    //console.log(tabCol);
    let affichageCol = '';

    for (let i of tabCol) {
        affichageCol += `<option value="${i}">${i}</option>\n`
    }
    document.querySelector('#colors').innerHTML = document.querySelector('#colors').innerHTML + affichageCol;

    // gestion de la sélection de l'utilisateur
    // selection du bouton ajouter au panier
    const btn_addBasket = document.querySelector('#addToCart');
    //console.log(btn_addBasket)

    //Ecouter le bouton et empêcher reactualisation de la page au click
    btn_addBasket.addEventListener('click', (event)=> {
        event.preventDefault();
        // mettre le choix couleur de l'utilisateur dans une variable
        let colSelected = document.querySelector('#colors').value ;
        //console.log(colSelected);
        // mettre le nombre d'item sélectionnés dans une variable
        const numberItem = document.querySelector('#quantity').value; 
        //console.log(numberItem);
        
        // récupérer les valeurs sélectionnées
        let selection = {
            id : productData._id,
            nom_produit : productData.name,
            quantity : numberItem,
            option_produit : colSelected,
            prix : affichagePrice
        }
        console.log(selection);
        basket.add(selection);
        basket.save(selection);
        
    
    });
    
})
)
.catch(err => console.log('Erreur : ' + err));












