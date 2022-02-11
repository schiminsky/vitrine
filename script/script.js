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
            <button class="btn-circle" onclick="submitButtonStyle()">&#9825</button>
            <p class="prod-name">${product.productName}</p>
            <p class="price-old">R$ ${product.listPrice ? product.listPrice : "0"}</p>
            <p class="price-new">${product.price}</p>
            <p class="installments">${product.installments.lenght ? `em até ${product.installments[0].quantity}x de ${product.installments[0].value} sem juros`:""} </p>
            <button class="add-button" id="btn-add">ADICIONAR</button>
        `
        productCards.appendChild(productCard)
        }
        addProduct()
        btncircle()
        currencyMaster()
}

async function addProduct(){
    let buttons = await document.querySelectorAll(".add-button")
    buttons.forEach(function(item,index){
        item.addEventListener("click", function(){
            item.innerHTML = " &#10004 ADCIONADO"
            this.style.backgroundColor = "#A3F9B9"
            this.style.color = "black"
        })
    })
}

function btncircle(){
    document.querySelectorAll(".btn-circle").forEach(function(btn) {
        btn.addEventListener("click", function() {
            this.style.backgroundColor = "red";
            this.style.color = "white"
        })
    })
}
function currencyMaster(){
    let formatter = new Intl.NumberFormat([], {
        style: "currency",
        currency: "BRL"
    })
    let currency = document.getElementsByClassName("price-new")[0].innerHTML
        console.log(formatter.format(currency))
}
fetchApiData()