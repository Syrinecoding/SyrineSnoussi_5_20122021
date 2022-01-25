// récupérer la chaine de l'url
const queryUrl = window.location.href;
//extraire l'id
const url = new URL(queryUrl);
const id = url.searchParams.get('id');
//console.log(id);


//attribuer les valeurs de l'objet au html
const promiseProduct = fetch(`http://localhost:3000/api/products/${id}`);

//récupérer la valeurs des clés de chaque produit
promiseProduct
.then(response => {
    switch (response.status) {
        case 200:
            return response.json();
        case 404:
            alert("Page introuvable");
            break;
        case 500:
            alert("Le serveur a rencontré une erreur");
            break;
        default:
            alert("Erreur introuvable");
            break;
    }
}) 
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
            //image : productData.imageUrl,
            //texteAlt : productData.altTxt,
            nom : productData.name,
            quantity : numberItem,
            option_produit : colSelected,
            //prix : affichagePrice,
        }

        // faire le contraire : ne pas mettre dans le panier tant que pas confirmé:
        const confirmWindow = () => {
    
            if(window.confirm(`${numberItem} ${selection.nom}, couleur ${colSelected}, ${(numberItem <= 1) ? "a bien été ajouté " : "ont bien été ajoutés"} au panier. \nConsulter le panier : OK ou revenir à l'accueil : ANNULER`)){
                window.location.href = "cart.html"        
            }else{
                window.location.href = "index.html";
                cart.remove(selection);
            }
        }
        console.log(selection);
        

        if(colSelected != '' && numberItem != 0 && numberItem <= 100) {
            cart.add(selection);
            confirmWindow()
        }else if(colSelected != '') {
            alert(`Veuillez indiquer un nombre de ${selection.nom} inférieur à 100`);
        }else{
            alert(`Veuillez choisir une couleur`);
        }
        
        
    }); 
})
.catch(err => console.log("Erreur : " + err));












