/* app.js */
const productEle = document.querySelector(".products");
const cartItemEle = document.querySelector(".cart-items");
const subTotalEle = document.querySelector(".subtotal");
const totalCartEle = document.querySelector(".total-items-in-cart")
const shoppingBagEle = document.querySelector(".shopping-bag")
const cartEle = document.querySelector(".cart")

function renderProducts(){
    products.forEach((product)=>{
        const Item = document.createElement("div");
        Item.className =" item col-lg-3"
         Item.innerHTML = `<div class="item-container">
            <div class="item-img">
                <img src="${product.imgSrc}" alt="t-shirt 1">
            </div>
            <div class="desc">
                <h2>${product.name}</h2>
                <h2><small>$</small>${product.price}</h2>
                <p>
                    ${product.description}
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart">
                <img src="./icons/bag-plus.png" alt="add to cart" onclick="addTocart(${product.id})">
            </div>
        </div>`

    productEle.appendChild(Item)
    });
}
renderProducts();

let cart =JSON.parse(localStorage.getItem("CartAllItem")) ||[];
updateCart()
function addTocart(id){
    if(cart.some((pro)=> pro.id === id)){
        alert("Do you want to add more");
        numberOfUnit("plus",id)
    }else{
        const itemCart= products.find((item)=> item.id ===id);
        cart.push({
            ...itemCart,
            numberOfUnit: 1,
        });
       
    }
    updateCart();  
}

function updateCart(){
    renderCartAdd();
    renderItem();
    localStorage.setItem("CartAllItem",JSON.stringify(cart));
}
function renderItem(){
    let totalPrice= 0
    let totalItem=0;
  cart.forEach((item)=>{
   
     totalPrice += item.price * item.numberOfUnit;
     totalItem += item.numberOfUnit;
    
    
  });
  subTotalEle.innerHTML =  `Subtotal (${totalItem} items): ${totalPrice.toFixed(2)}`
  totalCartEle.innerHTML = totalItem;
    
}

function renderCartAdd(){
    cartItemEle.innerHTML ="";
    cart.forEach((cartItem)=>{
    cartItemEle.innerHTML += `<div class="cart-item">
            <div class="item-info" onclick="removeFromCart(${cartItem.id})">
                <img src="${cartItem.imgSrc}" alt="${cartItem.name}">
                <h4>T-shirt 1</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${cartItem.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="numberOfUnit('minus',${cartItem.id})">-</div>
                <div class="number">${cartItem.numberOfUnit}</div>
                <div class="btn plus" onclick="numberOfUnit('plus',${cartItem.id})">+</div>           
            </div>
        </div>`
    });
}

function removeFromCart(id){
    cart = cart.filter(item=> item.id !== id);
    updateCart();

}

function numberOfUnit(action,id){
    cart = cart.map((singleItem)=>{
        let numberOfUnit = singleItem.numberOfUnit;

       if(singleItem.id===id){
            if(action === "minus" && numberOfUnit>0){
                numberOfUnit--;
            }else if(action === "plus" && numberOfUnit < singleItem.instock){
                numberOfUnit++;
          
            }
       }
        return{
            ...singleItem,
            numberOfUnit,
        }
       
    });
    updateCart();
}

shoppingBagEle.addEventListener("click",(e)=>{
    if (cartEle.style.display === "none") {
        cartEle.style.display = "block";
      } else {
        cartEle.style.display = "none";
      }
})