const listInputQuantity=document.querySelectorAll("[cart] input[name='quantity']");
if(listInputQuantity){
    listInputQuantity.forEach(input=>{
        input.addEventListener("change",()=>{
            const productId=input.getAttribute("product-id");
            const quantity=parseInt(input.value);
            if(productId &&quantity>0){
                window.location.href=`/cart/update/${productId}/${quantity}`;
            }
        })
    })
}