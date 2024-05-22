let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let total = document.getElementById("total");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

// console.log(title, price, taxes, ads, discount, count, category, submit, total);

// Create Function Get Total Of Price

function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    // console.log(price.value);
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#5f0303";
  }
}

// Create Empty Array To Store Data InSide

let arrayOfData = [];

// To Sava Data On LocalStorage

if (window.localStorage.getItem("data")) {
  arrayOfData = JSON.parse(window.localStorage.getItem("data"));
} else {
  arrayOfData = [];
}

// Create Function Read Data From Fields (  Create Product)

submit.addEventListener("click", function () {
  const dataObject = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: +price.value + +taxes.value + +ads.value - +discount.value,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // Count On Fields
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 100
  ) {
    if (mood == "create") {
      if (dataObject.count > 1) {
        for (let i = 0; i < dataObject.count; i++) {
          arrayOfData.push(dataObject);
        }
      } else {
        arrayOfData.push(dataObject);
      }
    } else {
      arrayOfData[tmp] = dataObject;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  showData();
  dataOfLocalStorage(arrayOfData);
});

// Clear Data From Fields

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

// Create Function To Sava Data On LocalStorage

function dataOfLocalStorage(arrayOfData) {
  window.localStorage.setItem("data", JSON.stringify(arrayOfData));
}

// Create Function To Show Data On Home Page

function showData() {
  let table = "";
  for (let i = 0; i < arrayOfData.length; i++) {
    table += `            <tr>
              <td>${i + 1}</td>
              <td>${arrayOfData[i].title}</td>
              <td>${arrayOfData[i].price}</td>
              <td>${arrayOfData[i].taxes}</td>
              <td>${arrayOfData[i].ads}</td>
              <td>${arrayOfData[i].discount}</td>
              <td>${arrayOfData[i].total}</td>
              <td>${arrayOfData[i].category}</td>
              <td><button id="update" onclick = "updateData(${i})">Update</button></td>
              <td><button id="delete" onclick = "deleteData(${i})">Delete</button></td>
            </tr>
            
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let delBtn = document.getElementById("deleteAll");
  console.log(delBtn);
  if (arrayOfData.length > 1) {
    delBtn.innerHTML = `<button >Delete All (${arrayOfData.length})</button>`;
  } else {
    delBtn.innerHTML = "";
  }
}
showData();

// Delete Data

function deleteData(i) {
  arrayOfData.splice(i, 1);
  window.localStorage.setItem("data", JSON.stringify(arrayOfData));
  showData();
}

// Delete All

document.getElementById("deleteAll").onclick = function deleteAll() {
  arrayOfData.splice(0);
  window.localStorage.setItem("data", JSON.stringify(arrayOfData));
  showData();
};

// Update Data

function updateData(i) {
  title.value = arrayOfData[i].title;
  price.value = arrayOfData[i].price;
  taxes.value = arrayOfData[i].taxes;
  ads.value = arrayOfData[i].ads;
  discount.value = arrayOfData[i].discount;
  category.value = arrayOfData[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

// Search

let searchMood = "title";
let search = document.getElementById("search");
function getSearch(id) {
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < arrayOfData.length; i++) {
      if (arrayOfData[i].title.includes(value.toLowerCase())) {
        table += `            <tr>
              <td>${i + 1}</td>
              <td>${arrayOfData[i].title}</td>
              <td>${arrayOfData[i].price}</td>
              <td>${arrayOfData[i].taxes}</td>
              <td>${arrayOfData[i].ads}</td>
              <td>${arrayOfData[i].discount}</td>
              <td>${arrayOfData[i].total}</td>
              <td>${arrayOfData[i].category}</td>
              <td><button id="update" onclick = "updateData(${i})">Update</button></td>
              <td><button id="delete" onclick = "deleteData(${i})">Delete</button></td>
            </tr>
            
    `;
      }
    }
  } else {
    for (let i = 0; i < arrayOfData.length; i++) {
      if (arrayOfData[i].category.includes(value.toLowerCase())) {
        table += `            <tr>
              <td>${i + 1}</td>
              <td>${arrayOfData[i].title}</td>
              <td>${arrayOfData[i].price}</td>
              <td>${arrayOfData[i].taxes}</td>
              <td>${arrayOfData[i].ads}</td>
              <td>${arrayOfData[i].discount}</td>
              <td>${arrayOfData[i].total}</td>
              <td>${arrayOfData[i].category}</td>
              <td><button id="update" onclick = "updateData(${i})">Update</button></td>
              <td><button id="delete" onclick = "deleteData(${i})">Delete</button></td>
            </tr>
            
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
