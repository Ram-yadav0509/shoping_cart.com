let shop = document.getElementById('shop')

let basket = JSON.parse(localStorage.getItem("data")) || []

let generateshop = () =>{
    return (shop.innerHTML = ShopItemsData
        .map((x) => {
        let {id, name, price, desc, img } = x
        const search = basket.find((x) => x.id === id) || []
        // console.log(x.img)
        return `
        <div id=product-id-${id} class="item">
            <img width="220" src=${img} alt="Image">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">                        
                        
                        <div id=${id}  class="quantity">
                            ${search.item === undefined ? 0: search.item}
                        </div>
                        <i onclick="increment(${id})" class="add-to-cart">Add to Cart</i>                    
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join(""))
}

generateshop()

let add_to_cart = document.getElementsByClassName('add-to-cart')

let increment = (id) => {
    let selectedItem = id 
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    }
    // else {
    //     // search.item+=1
    //    return
    // } 
     add_to_cart.innerText = "Items"
    // console.log(basket)
    update(selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
    // alert("Item is SuccessFully added to the card")
}
let decrement = (id) => {
    let selectedItem = id 
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) return

    else if (search.item === 0) return
    else {
        search.item-=1
    }
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
    // console.log(basket)
    localStorage.setItem("data", JSON.stringify(basket))
   
}
let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
}

let calculation = () => {
    const cartIcon = document.getElementById("cartamount")    
    const cartNo = basket.map((x) => x.item).reduce((x,y) => x+y,0)
    cartIcon.innerHTML = cartNo
}

calculation()

function logout(){
    window.close()
    window.location.replace('/login_form')
}
