let allProducts = [];

async function fetchh() {
  const wrapper = document.getElementById('wrapper');
  try {
  
    const res = await fetch('./db.json');
  

    const data = await res.json();


    data.carts.forEach(cart => {
      cart.products.forEach(product => {
        allProducts.push(product);
      });
    });

  
    displayProducts(allProducts);

    
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(query)
      );
      displayProducts(filteredProducts);
    });

  } catch (error) {
    console.error('hatoo:', error);

 ;
  } finally {
   
    console.log('barbiram ishliman.');
  }
}

function displayProducts(products) {
  const wrapper = document.getElementById('wrapper');
  wrapper.innerHTML = ''; 

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = "p-4 rounded-xl max-w-sm mt-10";

    card.innerHTML = `
      <img src="${product.thumbnail}" class="w-[170px] h-40 object-cover rounded-md mb-3 shadow-sm shadow-slate-500"/>
      <h2 class="text-red-500 text-[15px] mt-1">${product.price} UZS</h2>
      <h2 class="text-lg font-semibold mt-2 w-[170px]">${product.title}</h2>
      <p class="text-gray-600">Miqdor: <span class="font-bold">${product.quantity}</span></p>
      <div class="flex gap-1 mt-1">
    <img class="w-[24px]" src="https://st.aestatic.net/mixer-storage/snippet/icon_16_delivery_x4.png" alt="">
      <h3 class="text-emerald-800">14 дней бесплатно</h3>
</div>
      <h1 class="add-to-cart bg-red-500 w-[100px] h-[34px] p-[3px] px-3 rounded-md text-white mt-2">korzinkaga</h1>

    `;

    wrapper.appendChild(card);
  });
}
// --- LOCAL STORAGE KORZINKA ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render qilingan kartalarga event qo‘shish
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {

        const card = e.target.closest("div"); 

        const product = {
            thumbnail: card.querySelector("img").src,
            price: card.querySelector("h2").innerText,
            title: card.querySelectorAll("h2")[1].innerText,
        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Mahsulot savatchaga qo‘shildi!");
    }
});



fetchh();






const btn = document.getElementById("catalogBtn");
const menu = document.getElementById("catalogMenu");
const overlay = document.getElementById("overlay");

btn.addEventListener("click", () => {
    menu.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
});
overlay.addEventListener("click", () => {
    menu.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
});






var swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

