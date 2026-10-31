let products = ["Item 1", "Item 2", "Item 3", "Item 4"];
let prices = [100, 200, 300, 400];

const tableBody = document.getElementById("tableBody");

function displayProducts() {
    tableBody.innerHTML = "";

    if (products.length === 0) {
        alert("No Products Found");
        return;
    }

    for (let i = 0; i < products.length; i++) {
        const row = document.createElement("tr");

        // textContent (not innerHTML) so a name like <b>hi</b> is shown as plain text
        const numberCell = document.createElement("td");
        numberCell.textContent = i + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = products[i];

        const priceCell = document.createElement("td");
        priceCell.textContent = prices[i] + " $";

        row.appendChild(numberCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        tableBody.appendChild(row);
    }
}

// ask the user for a product number, returns the array index or -1 if it's not valid
function askForIndex(message) {
    const answer = prompt(message);

    if (answer === null) {
        return -1; // pressed cancel
    }

    const number = Number(answer);

    if (answer.trim() === "" || !Number.isInteger(number) || number < 1 || number > products.length) {
        alert("Please enter a number between 1 and " + products.length);
        return -1;
    }

    return number - 1;
}

// ask for a name, returns null if empty or cancelled
function askForName(message) {
    const name = prompt(message);

    if (name === null || name.trim() === "") {
        return null;
    }

    return name.trim();
}

// ask for a price, returns null if it's not a valid number
function askForPrice(message) {
    const answer = prompt(message);

    if (answer === null) {
        return null;
    }

    const price = Number(answer);

    if (answer.trim() === "" || isNaN(price) || price < 0) {
        alert("Price must be a positive number");
        return null;
    }

    return price;
}

function addProduct() {
    const productName = askForName("Enter Product Name");
    if (productName === null) {
        return;
    }

    const productPrice = askForPrice("Enter Product Price");
    if (productPrice === null) {
        return;
    }

    products.push(productName);
    prices.push(productPrice);

    displayProducts();
}

function deleteProduct() {
    if (products.length === 0) {
        alert("No Products Found");
        return;
    }

    const index = askForIndex("Enter Product Number To Delete");
    if (index === -1) {
        return;
    }

    products.splice(index, 1);
    prices.splice(index, 1);

    displayProducts();
}

function updateProduct() {
    if (products.length === 0) {
        alert("No Products Found");
        return;
    }

    const index = askForIndex("Enter Product Number To Update");
    if (index === -1) {
        return;
    }

    const newName = askForName("Enter New Product Name");
    if (newName === null) {
        return;
    }

    const newPrice = askForPrice("Enter New Product Price");
    if (newPrice === null) {
        return;
    }

    products[index] = newName;
    prices[index] = newPrice;

    displayProducts();
}

displayProducts();
