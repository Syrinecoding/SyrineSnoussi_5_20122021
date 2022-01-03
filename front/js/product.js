// récupérer la chaine de l'url
const queryUrl= window.location.href;
//console.log(queryUrl);

//extraire l'id
const url = new URL(queryUrl);
//console.log(url);
const id = url.searchParams.get('id');
//console.log(id);


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
    let affichageCol = '';

    for (let i of tabCol) {
        affichageCol += `<option value="${i}">${i}</option>\n`
    }
    document.querySelector('#colors').innerHTML = document.querySelector('#colors').innerHTML + affichageCol;

            // **** gestion de la sélection de l'utilisateur ****
    const btn_addBasket = document.querySelector('#addToCart');
    //Ecouter le bouton et empêcher reactualisation de la page au click
    btn_addBasket.addEventListener('click', (event)=> {
        event.preventDefault();  
        // mettre le choix couleur et le nombre de l'utilisateur dans des variables
        let colSelected = document.querySelector('#colors').value ;
        const numberItem = document.querySelector('#quantity').value; 
      
        // récupérer les valeurs sélectionnées
        let selection = {
            id : productData._id,
            image : productData.imageUrl,
            texteAlt : productData.altTxt,
            nom : productData.name,
            quantity : numberItem,
            option_produit : colSelected,
            prix : affichagePrice,
        }
        const confirmWindow = () => {
            if(window.confirm(`${numberItem} ${selection.nom} option : ${colSelected} a bien été ajouté au panier. \nConsulter le panier : OK ou revenir à l'accueil : ANNULER`)){
                window.location.href = "cart.html"        
            }else{
                window.location.href = "index.html";
            }
        }
        console.log(selection);
        cart.add(selection);
        confirmWindow()
    }); 
})
)
.catch(err => console.log('Erreur : ' + err));












