let shop = document.querySelector("#Shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let search = basket.find((s) => s.id === x.id) || []
        return `<div class="bg-white rounded-lg p-6 shadow-md w-80">
        <img src="${x.img}" alt="Product" class="w-48 h-48 rounded-md mx-auto mb-4">
        <div class="mb-4">
          <h2 class="text-xl font-semibold">${x.name}</h2>
          <p class="text-gray-600">${x.desc}</p>
        </div>
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600">Price:</span>
          <span class="text-green-600 font-semibold">${x.price}</span>
        </div>
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600">Quantity:</span>
          <div class="flex items-center">
            <button class="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold rounded-l-md" onclick="decrement(${x.id})">-</button>
           <div id=${x.id} class="w-12 px-2 py-1 border rounded-none text-center" >${search.item === undefined ? 0 : search.item}</div>
            <button class="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold rounded-r-md" onclick="increment(${x.id})">+</button>
          </div>
        </div>
        <button class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md">Add to Cart</button>
      </div>  
`;
    }).join(""));
}

generateShop()

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    } else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));

    update(selectedItem.id);
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();


function serach() {
    console.log("v");
}