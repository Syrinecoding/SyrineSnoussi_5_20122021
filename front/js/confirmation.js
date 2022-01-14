const orderedId = new URL(window.location.href).searchParams.get('id');
        
const confirmOrder = () => {
    let idOrder = document.querySelector('#orderId')
    if (document.URL.includes('confirmation.html')) {
        idOrder.innerHTML = orderedId;
    }
}
confirmOrder()