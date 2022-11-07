/** @format */

// 상품 불러오기 핸들러
const handleLoad = (event) => {
  fetch("http://localhost:3001/product", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      for (i of data) {
        const $container = document.createElement("section");
        const $option = document.createElement("option");
        const $productName = document.createElement("h2");
        const $price = document.createElement("p");
        const $deleteBtn = document.createElement("button");

        $container.setAttribute("data-id", i.id);
        $productName.innerText = i.productName;
        $price.innerText = i.price;
        $price.style.textAlign = "center";
        $deleteBtn.textContent = "삭제";
        $deleteBtn.addEventListener("click", handleDelete); //Delete
        $option.setAttribute("value", i.id);
        $option.textContent = i.productName;

        $container.appendChild($productName);
        $container.appendChild($price);
        $container.appendChild($deleteBtn);
        $productSelector.appendChild($option);

        document.body.appendChild($container);
      }
    });
};
// 업데이트할 상품 선택 핸들러
const handleSelector = (event) => {
  const id = event.target.value;
  fetch(`http://localhost:3001/product?id=${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#productId").value = data[0].id;
      document.querySelector("#productname").value = data[0].productName;
      document.querySelector("#productprice").value = data[0].price;
      document.querySelector("#productstock").value = data[0].stockCount;
      document.querySelector("#productpubdate").value = data[0].pubDate;
    });
};
// 업로드 상품  핸들러
const handleUpload = (event) => {
  // console.log("눌렀다.");

  const productInfo = {
    productName: document.querySelector("#productname").value,
    price: document.querySelector("#productprice").value,
    stockCount: document.querySelector("#productstock").value,
    viewCount: 0,
    pubDate: document.querySelector("#productpubdate").value,
    modDate: document.querySelector("#productpubdate").value,
  };

  fetch("http://localhost:3001/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productInfo),
  })
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .then((data) => {
      const $container = document.createElement("section");
      const $productName = document.createElement("h2");
      const $price = document.createElement("p");

      $productName.innerText = data.productName;
      $price.innerText = data.price;

      $container.appendChild($productName);
      $container.appendChild($price);

      document.body.appendChild($container);
    });
};
// 상품 업데이트 핸들러
const handleUpdate = (event) => {
  // console.log("눌렀다.");
  const id = document.querySelector("#productId").value;
  const productInfo = {
    productName: document.querySelector("#productname").value,
    price: document.querySelector("#productprice").value,
    stockCount: document.querySelector("#productstock").value,
    viewCount: 0,
    pubDate: document.querySelector("#productpubdate").value,
    modDate: document.querySelector("#productpubdate").value,
  };

  fetch(`http://localhost:3001/product/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productInfo),
  });
};

// 상품 삭제 핸들러
const handleDelete = (event) => {
  // 이벤트의 현재 타겟의 자신 포함 부모방향으로 CSS선택자(section)로 탐색해서 dataset 어트리뷰트 가져오기
  const id = event.currentTarget.closest("section").dataset.id;

  fetch(`http://localhost:3001/product/${id}`, {
    method: "DELETE",
  });
};

// Read
const $btnLoad = document.querySelector("#상품불러오기");
const $productSelector = document.querySelector("#selectProduct");

$btnLoad.addEventListener("click", handleLoad);
$productSelector.addEventListener("input", handleSelector);

//create
const $btnRegister = document.querySelector("#상품등록하기");
$btnRegister.addEventListener("click", handleUpload);

// update
const btnUpdate = document.querySelector("#상품업데이트");
btnUpdate.addEventListener("click", handleUpdate);
