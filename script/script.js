function fetchApiData(){
    fetch("https://corebiz-test.herokuapp.com/api/v1/products")
    .then((response) => response.json())
    .then((data) => {
        productRender(data)
    })
    .catch((error) => console.log(error))
}

function productRender(products){
    const productCards = document.querySelector(".div-cards")
    console.log('Eu sou uma lista', products)
    for(let product of products){
        let productCard = document.createElement("div")
        productCard.className = "card"
        productCard.innerHTML = 
        `
            <img class="prod-img" src="${product.imageUrl}" alt="">
            <button class="btn-circle"">&#9825</button>
            <p class="prod-name">${product.productName}</p>
            <p class="price-old">R$ ${product.listPrice ? product.listPrice : "0"}</p>
            <p class="price-new">${currencyMaster(product.price)}</p>
            <p class="installments">${product.installments.lenght ? `em até ${product.installments[0].quantity}x de ${product.installments[0].value} sem juros`:""} </p>
            <button class="add-button" id="btn-add">ADICIONAR</button>
        `
        productCards.appendChild(productCard)
        }
        let wishlistButton = document.querySelectorAll(".btn-circle")
        let buyButton = document.querySelectorAll(".add-button")
        addProduct(buyButton)
        btncircle(wishlistButton)
        currencyMaster()
}

function addProduct(){
    let buttons = document.querySelectorAll(".add-button")
    buttons.forEach(function(item){
        item.addEventListener("click", function(){
            if (item.classList.contains("selected")){
                item.classList.remove("selected")
                item.textContent = "ADCIONAR"
            }
            else {
                item.classList.add("selected")
                item.innerHTML = " &#10004 ADCIONADO"
            }
        })
    })
}

function btncircle(){
    let wishlistBtn = document.querySelectorAll(".btn-circle")
    wishlistBtn.forEach(function(btn) {
        btn.addEventListener("click", function(){
            if (btn.classList.contais("selectedWishlist")){
                btn.classList.remove("selectedWishlist")
            }
            else{
                btn.classList.add("selectedWishlist")
            }
        })
    })
}

function currencyMaster(convertCurrency){
    return (convertCurrency / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

}
fetchApiData()