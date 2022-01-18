const orderedId = new URL(window.location.href).searchParams.get('id'); 

const displayConfirmation = () => {
    const idOrderSpan = document.querySelector('#orderId')
    
    console.log(orderedId)
    idOrderSpan.innerHTML = orderedId;  
}
displayConfirmation()