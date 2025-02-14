//Array to stores the images of items.
const images = ["img/img1.jpeg", "img/img2.jpg", "img/img3.webp", "img/img4.jpg", "img/img5.webp", "img/img6.jpg", "img/img7.webp", "img/img8.jpg", "img/img9.webp", "img/img10.jpg", "img/img11.jpg", "img/img12.webp", "img/img13.jpg", "img/img14.webp", "img/img15.jpg","img/img16.jpg"];
//Array to stores prices of items.
const prices = [27.93, 7.49, 30.27, 28.58 , 23.99, 7.83, 29.03, 31.49, 26.37, 23.09, 141.48, 52.65, 16.59, 37.05, 17.49, 16.49];
//Array to stores the item name/title of items.
const titles = [
    "Nature Hoodie", "Eco-Friendly Water Bottles", "Bamboo Sunglasses", "Reusable Beeswax Wraps", 
    "Solar-Powered Lanterns", "Recycled Notebooks", "Wooden Phone Cases", "Plant-Based Candles", 
    "Eco-friendly Beach Towels", "Biodegradable Plant Pots", "Natural Fiber Hammocks", "Sustainable Yoga Mats", 
    "Compostable Cutlery Sets", "Sustainable Wool Scarves", "Eco-Friendly Backpacks", "HABA Terra Kids Cork Boat"
];
//Array to store the color options of items.
const colors = [
    ["#228B22", "#000000", "#FD5E53","#654321"],
    ["#9ACD32", "#FFFFFF", "#FF5733", "#2E2E2E"], 
    ["#D2B48C", "#F5F5DC", "#333333", "#654321", "#008080"],
    ["#FFD700", "#9ACD32", "#990000","#E6E6FA"], 
    ["#FDF5E6", "#2E2E2E", "#FD5E53", "#8A9A5B"],
    ["#FF5733", "#2E2E2E", "#808080", "#006400", "#00008B"], 
    ["#D2B48C", "#A87532", "#0C0C0C"],
    ["#800080", "#33FF57", "#FDF5E6", "#FFFF33"], 
    ["#FF5733", "#F88379", "#FFD700", "#007C77", "#FF33FF"], 
    ["#FF0000", "#228B22", "#3357FF"], 
    ["#000033", "#228B22", "#654321", "#F5F5DC"], 
    ["#A87532", "#33FF57", "#3357FF", "#333333)", "#990000"], 
    ["#D2B48C", "#A87532", "#0C0C0C"], 
    ["#FF0000", "#000057", "#005700", "#5A5AAD","#FFB6C1","#D3D3D3"], 
    ["#FF5733", "#000057", "#3357FF", "#808000", "#000000"],
    ["#D2B48C", "#A87532", "#0C0C0C"]
];

// Function to create shop items dynamically.
function createShopItems() {
    //storing the reference to div with ID "showcase".
    const showcase = document.getElementById('showcase');

    //Using a for loop to go through the constant arrays to create items to be added to the shop.
    for (let i = 0; i < images.length; i++) {

        //Creating a div and assigning it to "itemDiv" variable.
        const itemDiv = document.createElement('div');
        //Giving the div created an class name "shopitems".
        itemDiv.classList.add('shopitems');
        //Giving the div created an ID "shpItem + loop iteration count + 1 " to give a unique ID.
        itemDiv.id = `shpItem${i + 1}`;

        //Creating an img element.
        const image = document.createElement('img');
        //giving the class name "displayed-items" to that img element.
        image.classList.add('displayed-items');
        //giving the img src to display image from the images array based on the loop iteration count as the index. 
        image.src = images[i];
        //giving the alt property to that image.
        image.alt = 'shop item';

        //Creating a div element to store the item name /title.
        const title = document.createElement('div');
        //giving the div created an class name "displayed-item-titles"
        title.classList.add('displayed-item-titles');
        //assigning the text content to that div from the titles array based on the loop iteration count as the index.
        title.textContent = titles[i];

        //Creating a <p> tag to store the price of the item.
        const price = document.createElement('p');
        //Assingning the text content of that <p> tag from the prices array based on the loop iteration count as the index and formating it to only 2 decimal places.
        price.textContent = `£${prices[i].toFixed(2)}`;

        // Creating a label to display "Quantity".
        const quantityLabel = document.createElement('label');
        //Setting the attributes of that label (for attribute to link with input field with ID "item + loop iteration count + 1")
        quantityLabel.setAttribute('for', `item${i + 1}`);
        //Giving the text content of that label as "Quantity".
        quantityLabel.textContent = 'Quantity:';

        //Creating the input field for the Quantity label. 
        const quantityInput = document.createElement('input');
        //Setting the type attribute of that input field.
        quantityInput.type = 'number';
        //Giving the id to that input field as "item + loop iteration count + 1".
        quantityInput.id = `item${i + 1}`;
        //Giving the name attribute to that input field to store the quantity data in it.
        quantityInput.name = `item${i + 1}`;
        //Initial value is set to '0'.
        quantityInput.value = '0';

        //Creating the label for color select of the item.
        const colorLabel = document.createElement('label');
        //Setting the 'for' attribute to link with the color-Select select element. 
        colorLabel.setAttribute('for', `colorSelect${i + 1}`);
        //setting the label text content.
        colorLabel.textContent = 'Color:';

        //Creating the select element for the color selector of each item of the store.
        const colorSelect = document.createElement('select');
        //giving the ID for the select element which is uniquely created based on the loop iteration count.
        colorSelect.id = `colorSelect${i + 1}`;
        //giving the Class name for the select element which is "color-select"
        colorSelect.classList.add('color-select');
        //giving the select element an onchange function. here null is passed to ignore the "this.arg".
        colorSelect.onchange = updateColor.bind(null, i);

        //Using a for loop that iterated over the colors array to set the color option of each item.
        for (let j = 0; j < colors[i].length; j++) {
            //create option element.
            const option = document.createElement('option');
            //Setting the color options available inside in each sub-array inside the main colors array.
            option.value = colors[i][j];
            //displaying the color in the option elements as the background color.
            option.style.backgroundColor = colors[i][j];
            //appending the option to the select element currently being accessed.
            colorSelect.appendChild(option);
        }

        //Create a span to show a text indicating the color selected.
        const colorDisplayLabel = document.createElement('span');
        //adding the class name to that created span element.
        colorDisplayLabel.classList.add('colorDisplay-label');
        //adding the text content of that span.
        colorDisplayLabel.textContent = 'Selected color:';

        //Create a div element to display the color selected.
        const colorDisplay = document.createElement('div');
        //adding the classname to that div created.
        colorDisplay.classList.add('colorDisplay');
        //adding the ID to that div created.
        colorDisplay.id = `colorDisplay${i + 1}`;
        colorDisplay.style.backgroundColor = colors[i][0]; // Set initial color to the first option.

        //creating a input field to be made as the add to basket button.
        const addButton = document.createElement('input');
        //setting the input field type as button.
        addButton.type = 'button';
        //setting the value displayed in the button created.
        addButton.value = 'Add to Cart ';
        //giving the add to basket button an onclick function. here null is passed to ignore the "this.arg".
        addButton.onclick = addToBasket.bind(null, i);

        //appending all the elements created to the itemDiv element.
        itemDiv.appendChild(image);
        itemDiv.appendChild(title);
        itemDiv.appendChild(price);
        itemDiv.appendChild(quantityLabel);
        itemDiv.appendChild(quantityInput);
        itemDiv.appendChild(colorLabel);
        itemDiv.appendChild(colorSelect);
        itemDiv.appendChild(document.createElement('br'));
        itemDiv.appendChild(colorDisplayLabel);
        itemDiv.appendChild(colorDisplay);
        itemDiv.appendChild(document.createElement('br'));
        itemDiv.appendChild(addButton);

        //finally appending the itemDiv to the showcase element.
        showcase.appendChild(itemDiv);
    }
}

// Function to update color in the color display, uses the index value passed to locate element.
function updateColor(index) {
    //Accessing the select element by ID. 
    const select = document.getElementById(`colorSelect${index + 1}`);
    //Accessing the  color display div using ID.
    const colorDisplay = document.getElementById(`colorDisplay${index + 1}`);
    //Accessing current value of the color select element of the item.
    const selectedColor = select.value;

    //Setting that color value as the background color of the color display div.
    colorDisplay.style.backgroundColor = selectedColor;
}

// Function to add item to basket, uses the index value passed to locate element.
function addToBasket(index) {
    //Access the item added to basket by the ID. 
    const item = document.getElementById(`shpItem${index + 1}`);
    //Access the current items quantity input field value using quantity input field ID.
    const quantity = parseInt(item.querySelector(`#item${index + 1}`).value);
    //Access current items color value using color selector ID.
    const color = item.querySelector(`#colorSelect${index + 1}`).value;
    //Access the price of the current item based on the index from the prices array.
    const price = prices[index];
    //Calculating the total price based on the quantity purchased.
    const totalPrice = (price * quantity).toFixed(2);

    //Checking if the Item added to Basket is having a quantity between 0-25.
    if (quantity > 0 && quantity <= 25) { 
        //Access the div with the ID "CartShowCase".
        const cartShowCase = document.getElementById('CartShowCase');

        //Create an div to store the item data of the item added to the basket.
        const cartItemDiv = document.createElement('div');
        //Adding a class name to that div.
        cartItemDiv.classList.add('CartItem');
        //Adding a unique ID to that div based on the index.
        cartItemDiv.id = `CartItem${index + 1}`;

        //Creating a remove button using input tag.
        const removeBtn = document.createElement('input');
        //Setting the input field type to button.
        removeBtn.type = 'button';
        //adding the classname to that button
        removeBtn.classList.add('removeBtn');
        //adding the Unique ID to that button based on the index.
        removeBtn.id = `Item${index + 1}btn`;
        //Setting the value displayed in the button.
        removeBtn.value = 'X';
        //Add remove functionality to the button to remove items added to the basket
        removeBtn.onclick = () => removeFromBasket(cartItemDiv, totalPrice);

        //Create a div to hold the image of the item added to the basket.
        const cartItemImgHolder = document.createElement('div');
        //adding a class name to that div.
        cartItemImgHolder.classList.add('cartItemImgHolder');

        //Creating a img tag to store the image of the item added.
        const cartItemImg = document.createElement('img');
        //Add a classname to that img tag.
        cartItemImg.classList.add('CartItemImg');
        //Add a unique ID to the img tag based index.
        cartItemImg.id = `Item${index + 1}Img`;
        //setting the img tag src using the images array based on the index.
        cartItemImg.src = images[index];
        //setting the alt attribute text.
        cartItemImg.alt = 'Cart Item Image';

        //create an div element to store the individual item details of the item added to basket.
        const cartItemDetails = document.createElement('div');
        //Adding a classname to that div.
        cartItemDetails.classList.add('CartItemDetails');
        //Add a unique ID to the div based index.
        cartItemDetails.id = `Item${index + 1}Details`;
        //Adding the innerHTML of that div that gets created.
        cartItemDetails.innerHTML = `<span>Item = ${titles[index]} | Quantity = ${quantity} | Color = ${color} <br> Price = £${totalPrice}</span>`;

        //Appending element to thier respective parent element.
        cartItemImgHolder.appendChild(cartItemImg);
        cartItemDiv.appendChild(removeBtn);
        cartItemDiv.appendChild(cartItemImgHolder);
        cartItemDiv.appendChild(cartItemDetails);
        cartShowCase.appendChild(cartItemDiv);

        //Function to Update total price of the Basket.
        updateTotalPrice(parseFloat(totalPrice));

        //Accessing the openCart div with ID. 
        const openCart = document.getElementById('openCart');
        //Adding the classname to openCart element to show the animation in openCart div. 
        openCart.classList.add('itemsIn');

        //Accessing the openCartSvg svg with ID.
        const openCartSvg = document.getElementById('openCartSvg');
        //Adding the classname to openCart element to show the animation in openCart div. 
        openCartSvg.classList.add('itemsIn');

    } else if (quantity > 25) {
        //Error pop up message if quantity above 25.
        alert('More than 25 items of the same product cannot be added in one package.\nBut you can add multiple packages of the same product!');
    } else {
        //Error pop up message if quantity is 0 or below.
        alert('Please enter a quantity greater than 0');
    }
}

// Function to update total price of the basket.
function updateTotalPrice(priceChange) {
    //Accessing the div with ID "Totalpay"
    const totalElement = document.getElementById('Totalpay');
    //Creating a variable to store the price of the items added to the basket.
    let currentTotal = parseFloat(totalElement.textContent.replace('Total: £', ''));
    //Creating a variable to update the current total.
    let newTotal = (currentTotal + priceChange).toFixed(2);
    //Changing the text content of the "Totalpay" div.
    totalElement.textContent = `Total: £${newTotal}`;
}

// Function to remove item from basket.
function removeFromBasket(cartItemDiv, itemPrice) {
    //Accessing the div with ID "CartShowCase".
    const cartShowCase = document.getElementById('CartShowCase');
    //removing the CartItemDiv from the div "CartShowCase".
    cartShowCase.removeChild(cartItemDiv);

    // Update total price after removing Item.
    updateTotalPrice(-itemPrice);

    // Check if CartShowCase is empty.
    if (cartShowCase.children.length === 0) {
        //Access the div with ID "openCart".
        const openCart = document.getElementById('openCart');
        //remove the class name from the "openCart" div.
        openCart.classList.remove('itemsIn'); // Hide the animation of the opencart div.
        //Access the svg with ID "openCartSvg".
        const openCartSvg = document.getElementById('openCartSvg'); 
        //remove the class name from the "openCartSvg" svg.
        openCartSvg.classList.remove('itemsIn');// Hide the animation in openCartSvg svg.
    }

}

// Function to clear the cart/Basket.
function clearCart() {
    //Access the the div with element ID "CartShowCase".
    const cartShowCase = document.getElementById('CartShowCase');
    cartShowCase.innerHTML = ''; // Remove all child elements from that div.

    // Update total price to zero using the updateTotalPrice function.
    updateTotalPrice(-parseFloat(document.getElementById('Totalpay').textContent.replace('Total: £', '')));

    //Access the div with ID "openCart".
    const openCart = document.getElementById('openCart');
    //remove the class name from the "openCart" div.
    openCart.classList.remove('itemsIn'); // Hide the animation of the opencart div.
    //Access the svg with ID "openCartSvg".
    const openCartSvg = document.getElementById('openCartSvg');
    //remove the class name from the "openCartSvg" svg.
    openCartSvg.classList.remove('itemsIn');// Hide the animation in openCartSvg svg.
}

// Function to proceed to checkout page.
function generateitemslist() {
    // Select all span elements within elements that have both the CartItem and CartItemDetails classes.
    const cartItems = document.querySelectorAll('.CartItem .CartItemDetails span');

    // Check if cartItems is empty.
    if (cartItems.length === 0) {
        //Error popup message if the basket is empty.
        alert('No items in the cart to proceed to checkout.');
        return; // Exit the function.
    }
    
    
    // Initialize an empty array to hold basket details
    const basketDetails = [];

    //Access the div with Id "Totalpay".
    const totalPriceElement = document.getElementById('Totalpay');
    //To extract the total at the time when the Proceed to check out button is pressed
    const totalPrice = totalPriceElement.textContent.trim(); //The text content is trimed to avoid spaces.

    // Iterate over each cart item span element.
    cartItems.forEach(item => {
        // Get the text content of the span element.
        const text = item.textContent;

        // Extract details based on expected format
        const itemName = text.match(/Item = ([^|]+)/)[1].trim(); //The regular expression ignores ^, |, and \ as literal characters inside the character class [ ].
        const quantity = text.match(/Quantity = (\d+)/)[1].trim(); // This Matches one or more digits. \d is shorthand for [0-9]. The parentheses create a capturing group.
        const color = text.match(/Color = (#\w+)/)[1].trim(); // ("#" followed by  more of "\w is shorthand for [a-zA-Z0-9_]").
        const price = text.match(/Price = (£[\d.]+)/)[1].trim(); //Matches the pound sign £ followed by one or more digits or periods (\d is shorthand for [0-9] and "."" matches a literal period). 

        // Add the extracted details as an array to the basketDetails array.
        basketDetails.push([itemName, quantity, color, price]);
    });
    // Storing data in a session storage.
    sessionStorage.setItem('basketDetails', JSON.stringify(basketDetails));
    sessionStorage.setItem('totalPrice', totalPrice);

    //Display in the console the session storage data.
    console.log('Data exported:', basketDetails, totalPrice);

    // Redirect to Checkout webpage after processing.
    window.location.href = 'checkout.html';
}


// Call the function to create shop items on the page load.
document.addEventListener('DOMContentLoaded', createShopItems);

//Listens to the scroll of the webpage window.
window.addEventListener('scroll', function() {
    //Access div by ID "faketop".
    var faketop = document.getElementById('faketop');
    
    // Calculate the 10% scroll threshold.
    var scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    var threshold = 0.1 * scrollableHeight;

    //Check if the window scroll-y is greater that the scroll height.
    if (window.scrollY > threshold) {
        //Making the "faketop" div display again.
        faketop.style.display = 'block';
    } else {
        //Making the "faketop" div remove from document.
        faketop.style.display = 'none';
    }
});

//function when menu button is displayed.
function menuclicked() {
    //Access the div with ID "dropdown".
    var dropdown = document.getElementById('dropdown');
    //Check if the dropdown div is not displayed
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block'; //Making it visible again.
    } else {
        dropdown.style.display = 'none'; //removing it again if it was previously visible.
    }
}


// Ensuring dropdown is hidden if the menu button is not displayed.
function handleResize() {
    //Access the button element with ID "menubtn" using a variable.
    var menubtn = document.getElementById('menubtn');
    //Access the div element with ID "dropdown" using a variable.
    var dropdown = document.getElementById('dropdown');
    //Check if the menebtn is removed or made invisible.
    if (window.getComputedStyle(menubtn).display === 'none') {
        //if the menu btn has dissappeared then the dropdown should also disppear.
        dropdown.style.display = 'none';
    }
}

// Attach the handleResize function to the window resize event.
window.addEventListener('resize', handleResize);

// Call handleResize on initial load to ensure correct state.
handleResize();

//Listens to the event when the "openCartSvg" svg is clicked.
document.getElementById('openCartSvg').addEventListener('click', function() {
    //Accessing the div with the ID "Basket".
    var basket = document.getElementById('Basket');
    //Accessing the div with the ID "openCart".
    var openCart = document.getElementById('openCart');
    //Accessing the svg with ID "openCartSvg".
    var openCartSvg = document.getElementById('openCartSvg');
    //Added class name "show" to "Basket" div.
    basket.classList.add('show'); //Makes the div visible.
    //Hides the div with the ID "openCart".
    openCart.style.display = 'none';
    //Hides the svg with ID "openCartSvg".
    openCartSvg.style.display = 'none';
});

//Listens to the event when "closeCart" div is clicked. 
document.getElementById('closeCart').addEventListener('click', function() {
    //Accessing the div with the ID "Basket".
    var basket = document.getElementById('Basket');
    //Accessing the div with the ID "openCart".
    var openCart = document.getElementById('openCart');
    //Accessing the svg with ID "openCartSvg".
    var openCartSvg = document.getElementById('openCartSvg');
    //Remove the class name from the "Basket" div.
    basket.classList.remove('show');
    //Make the div with the ID "openCart" visible.
    openCart.style.display = 'flex';
    //Make the svg with ID "openCartSvg" visible.
    openCartSvg.style.display = 'flex';
});