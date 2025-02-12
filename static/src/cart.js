let label = document.getElementById('label')
let ShopCart = document.getElementById('shoping-cart')

let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation = () => {
    const cartIcon = document.getElementById("cartamount")    
    const cartNo = basket.map((x) => x.item).reduce((x,y) => x+y,0)
    cartIcon.innerHTML = cartNo
}

calculation()

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (ShopCart.innerHTML = basket.map((x) => {
            let { id, item } = x
            console.log(item)
            let search = ShopItemsData.find((y) => y.id === id) || []
            let { img, name, price } = search
            return `            
                <div class="cart-item">
                    <img width="100" src="${img}" alt=""/>
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-price">$ $price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>  

                        <div class="buttons">                        
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id}  class="quantity1">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>                        
                        </div>
                        
                        <h3>$ ${item * price}</h3>
                    </div>
                    
                </div>
            `
        }).join(""))
    }
    else {
        ShopCart.innerHTML = ``
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a>
                <button class="HomeBtn" onclick="Home()">Back to Home</button>
            </a>
        `;
    }
};

let Home = () => {
    window.close()
    window.location.href = "/index"
}

generateCartItems()

let increment = (id) => {
    let selectedItem = id 
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    }
    else {
        search.item+=1
    }
     
    generateCartItems()
    update(selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
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
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
   
}
let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
    Totalamount()
}

let removeItem = (id) => {
    let selectedItem = id
    // console.log(selectedItem.id)
    basket = basket.filter((x) => x.id !== selectedItem.id)
    generateCartItems()
    Totalamount()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))
}

let ClearCart = () => {
    basket = []
    generateCartItems()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket))
}

let Totalamount = () => {
    if (basket.length !==0) {
        let amount = basket.map((x) => {
            let { item, id } = x
            let search = ShopItemsData.find((y) => y.id === id) || [] 
            
            return  item*search.price
        }).reduce((x,y) => x+y,0)
        // console.log(amount)
        label.innerHTML = `
            <h2>Total Bill : ${amount}</h2>
            <button class="checkout">Check Out</button>
            <button onclick="ClearCart()" class="clearAll">Clear All</button>
        `
    }
    else {
        return
    }
}
Totalamount()