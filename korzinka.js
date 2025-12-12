let cart = JSON.parse(localStorage.getItem("cart")) || [];


cart = cart.map(item => ({
    ...item,
    quantity: item.quantity ?? 1
}));

const list = document.getElementById("cart-list");
const totalBlock = document.getElementById("summary-total");
const itemsBlock = document.getElementById("summary-items");
const deliveryBlock = document.getElementById("summary-delivery");

function renderCart() {
    list.innerHTML = "";

    let totalPrice = 0;
    let delivery = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        const card = document.createElement("div");
        card.className =
            "bg-white p-4 rounded-xl shadow flex gap-4 items-center";

        card.innerHTML = `
            <input type="checkbox" checked class="w-5 h-5">

            <img src="${item.thumbnail}" class="w-28 rounded-lg">

            <div class="w-2/3">
                <h2 class="font-bold">${item.title}</h2>
                <h3 class="text-red-500 text-xl mt-1">${item.price} UZS</h3>
            </div>

            <div class="flex gap-2 items-center">
                <button class="minus bg-gray-200 px-3 py-1 rounded">-</button>
                
                <p class="quantity text-lg font-bold">${item.quantity}</p>

                <button class="plus bg-gray-200 px-3 py-1 rounded">+</button>
            </div>

            <button class="delete text-red-600 text-2xl font-bold ml-3">×</button>
        `;

    
        card.querySelector(".plus").onclick = () => {
            item.quantity++;
            save();
        };

 
        card.querySelector(".minus").onclick = () => {
            if (item.quantity > 1) item.quantity--;
            save();
        };

      
        card.querySelector(".delete").onclick = () => {
            cart.splice(index, 1);
            save();
        };

        list.appendChild(card);

        totalPrice += parseFloat(item.price) * item.quantity;
        itemCount += item.quantity;
    });


    itemsBlock.innerHTML = `Товаров: ${itemCount}`;
    deliveryBlock.innerHTML = `Доставка: ${delivery} UZS`;
    totalBlock.innerHTML = `${(totalPrice + delivery).toFixed(2)} UZS`;
}

function save() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
