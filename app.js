/* app.js */

// Steps

    // 1. Render products
    // 2. Add Products to Cart
    // 3. Render Cart Items
    // 4. Change Number Of Units For a Product in Cart
    // 5. Calculate & Render The Subtotal
    // 6. Remove Items form Cart
    // 7. Save Cart to Local Storage

const productEle = document.querySelector(".products");
const cartItemEle = document.querySelector(".cart-items");
const subTotalEle = document.querySelector(".subtotal");
const totalCartEle = document.querySelector(".total-items-in-cart")
const shoppingBagEle = document.querySelector(".shopping-bag")
const cartEle = document.querySelector(".cart")
const countOfItemEle = document.querySelector(".countOfItem")
const closeEle = document.querySelector(".closeEle")
const closeItemEle = document.querySelector(".closeItem")

    // 1. Render products
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
           
            <div class="add-to-cart">
                <span onclick="addTocart(${product.id})">+</span>
               
            </div>
        </div>`

    productEle.appendChild(Item)
    });
}
renderProducts();
 // 7. Save Cart to Local Storage

let cart =JSON.parse(localStorage.getItem("CartAllItem")) ||[];
updateCart()

// add all date with unit of number
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

// 5. Calculate & Render The Subtotal
function renderItem(){
    let totalPrice= 0
    let totalItem=0;
  cart.forEach((item)=>{
     totalPrice += item.price * item.numberOfUnit;
     totalItem += item.numberOfUnit;
  });
  subTotalEle.innerHTML =  `Subtotal (${totalItem} items): ${totalPrice.toFixed(2)}`
  totalCartEle.innerHTML = totalItem;
  countOfItemEle.innerHTML = `$${totalPrice.toFixed(2)}`;
    
}

// 2. Add Products to Cart
function renderCartAdd(){
    cartItemEle.innerHTML ="";
    cart.forEach((cartItem)=>{
    cartItemEle.innerHTML += `<div class="cart-item">
            <div class="closeItem" onclick="removeFromCart(${cartItem.id})"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg></div>
            <div class="item-info" onclick="removeFromCart(${cartItem.id})">
                <div><img src="${cartItem.imgSrc}" alt="${cartItem.name}"></div>
                <div> <h4>${cartItem.name}</h4> </div>
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

// 6. Remove Items form Cart
function removeFromCart(id){
    cart = cart.filter(item=> item.id !== id);
    updateCart();

}

// 4. Change Number Of Units For a Product in Cart
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

closeEle.addEventListener("click",()=>{
    cartEle.style.display = "none";
});


