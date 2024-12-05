/* add click events to buttons*/
//start
var updatedIndex;
document.getElementById("add").addEventListener("click", () => {
    add();
})
function declare_UpdateAndDelete() {
    // document.getElementById("Update")?.addEventListener("click", () => {
    //     // Update();
    //     console.log("UpdateUpdateUpdate");
    // })
    const Update_buttons = document.querySelectorAll("#Update");
    Update_buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            Update_item(index);
        })
    })
    // document.getElementById("Delete")?.addEventListener("click", () => {
    // for (let i = 0; i < document.querySelectorAll("#Delete.Delete").length; i++) {
    //     console.log(document.querySelectorAll("#Delete.Delete")[i]);
    //     // Delete_item();
    //     // console.log("DeleteDeleteDeleteDelete");
    // };
    const Delete_buttons = document.querySelectorAll("#Delete");
    Delete_buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            Delete_item(index);
        })
    })

}
//end
/* intionaize varibales to store the data*/
//start
var ProductName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var Productimg = document.getElementById("Productimg");
var ProductCategory = document.getElementById("ProductCategory");
var ProductDesc = document.getElementById("ProductDesc");
var ProductSearcInput = document.getElementById("search_bar");
var product_list = [];
//end
// if (localStorage.length != 0) {//
if (localStorage.getItem("product_list") != null) {
    var product_list = JSON.parse(localStorage.getItem("product_list"));
    displayAll(product_list);
}
function add() {
    var product = {
        name: ProductName.value,
        price: ProductPrice.value,
        img: `images/${Productimg.files[0]?.name}`,
        Category: ProductCategory.value,
        Desc: ProductDesc.value
    };
    product_list.push(product);
    displayAfterAdd();
    localStorage.setItem("product_list", JSON.stringify(product_list));
    clearInputs();
}
var items = "";
function displayAfterAdd() {
    items = `<tr>
    <td>${product_list.length}</td>
    <td>${product_list[product_list.length - 1].name}</td>
    <td>${product_list[product_list.length - 1].price}</td>
    <td><img src="${product_list[product_list.length - 1].img}" alt=""></td>
    <td>${product_list[product_list.length - 1].Category}</td>
    <td>${product_list[product_list.length - 1].Desc}</td>
    <td>
        <div class="d-flex flex-column">
            <button id="Update" class="btn btn-warning btn-sm">Update</button>
            <button id="Delete" class="Delete btn btn-danger btn-sm mt-2">Delete </button>
        </div>
    </td>
</tr>`;

    document.getElementById("tbody").innerHTML += items;
    declare_UpdateAndDelete();
}
function displayAll(list, mark) {
    items = "";
    for (let i = 0; i < list.length; i++) {
        items += `<tr>
        <td>${i + 1}</td>
   <!--     <td>${((mark) ? (list[i].name)?.replaceAll(mark, `<mark>${mark}</mark>`) : list[i].name)}</td> -->
        <td>${((mark) ? (list[i].name)?.replaceAll(mark, `<span class="text-warning bg-danger fw-bolder">${mark}</span>`) : list[i].name)}</td> 
        <td>${list[i].price}</td>
        <td><img src="${list[i].img}" alt=""></img></td>
        <td>${list[i].Category}</td>
        <td>${list[i].Desc}</td>
        <td>
            <div class="d-flex flex-column">
                <button id="Update" class="btn btn-warning btn-sm">Update</button>
                <button id="Delete" class="Delete btn btn-danger btn-sm mt-2">Delete </button>
            </div>
        </td>
</tr>`;
    }
    document.getElementById("tbody").innerHTML = items;
    declare_UpdateAndDelete();
}
function clearInputs() {
    ProductName.value = '';
    ProductPrice.value = '';
    Productimg.value = '';
    ProductCategory.value = '';
    ProductDesc.value = '';
}
ProductSearcInput.addEventListener("input", searchByNameOfProduct);
function searchByNameOfProduct() {
    var outputOfSearch = [];
    var search_value = ProductSearcInput.value.toLowerCase();
    for (let i = 0; i < product_list.length; i++) {
        if (product_list[i].name.toLowerCase().includes(search_value)) {
            outputOfSearch.push(product_list[i]);
        }
    }
    displayAll(outputOfSearch, search_value);
}
function Delete_item(index) {
    product_list.splice(index, 1);
    console.log(product_list);
    displayAll(product_list);
    console.log(localStorage.setItem("product_list", JSON.stringify(product_list)));
}
function Update_item(index) {
    document.getElementById("Update_button").dataset.index = index;  // ** this line for solving the problem of changed index to brevies one **
    ProductName.value = product_list[index].name;
    ProductPrice.value = product_list[index].price;
    ProductCategory.value = product_list[index].Category;
    // get image sol 1
    var ImgName = product_list[index].img;
    ImgName = ImgName.slice(ImgName.lastIndexOf("/") + 1, (ImgName.toString()).length);
    const imageNameElement = document.getElementById('imageName');
    const productImage = product_list[index].img;
    if (productImage) {
        imageNameElement.textContent = `Current Image: ${ImgName}`;
    } else {
        imageNameElement.textContent = 'No image available';
    }
    //end sol 1
    // sol 2
    document.getElementById('Productimg').value = '';
    const currentImagePreview = document.getElementById('currentImagePreview');
    if (productImage) {
        currentImagePreview.src = productImage;
        currentImagePreview.style.display = 'block';
    } else {
        currentImagePreview.style.display = 'none';
    }
    //end sol 2
    ProductDesc.value = product_list[index].Desc;
    console.log(document.getElementsByClassName("btn-container")[0]);
    // how to change the buttons sol 1
    // document.getElementById("add").setAttribute('style', 'display:none !important');
    // document.getElementById("Update_button").setAttribute('style', 'display:block !important');
    // how to change the buttons sol 2 this sol is  better , cleaner and more maintainable
    document.getElementById("add").classList.replace('d-block', 'd-none');
    document.getElementById("Update_button").classList.replace('d-none', 'd-block');


    updatedIndex = index;
}
document.getElementById("Update_button").addEventListener("click", () => {
    SaveUpdates();
    document.getElementById("add").classList.replace('d-none', 'd-block');
    document.getElementById("Update_button").classList.replace('d-block', 'd-none');

});
function SaveUpdates() {
    // console.log(index);

    product_list[updatedIndex].name = ProductName.value;
    product_list[updatedIndex].price = ProductPrice.value;
    product_list[updatedIndex].Category = ProductCategory.value;

    console.log(ProductName.value);
    console.log(ProductPrice.value);
    console.log(ProductCategory.value);
    console.log(ProductDesc.value);
    product_list[updatedIndex].img = ((Productimg.files[0]?.name) ? `images/${Productimg.files[0]?.name}` : product_list[updatedIndex].img)
    product_list[updatedIndex].Desc = ProductDesc.value;
    currentImagePreview.style.display = 'none';
    document.getElementById('imageName').style.display = 'none'
    console.log(product_list, 'hiiiiiiii');
    displayAll(product_list);
    localStorage.setItem('product_list', JSON.stringify(product_list));
    clearInputs();

}

