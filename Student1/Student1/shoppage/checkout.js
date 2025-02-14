// Retrieving data from  session storage created in shop page.
const storedBasketDetails = JSON.parse(sessionStorage.getItem('basketDetails'));
const storedTotalPrice = sessionStorage.getItem('totalPrice');

// Boolean variables to track form validation status.
let contactFormValid = false;
let paymentFormValid = false;
let billingFormValid = false;

// Ensure that basket details and total price exist in the sessionStorage if not show an error message.
if (storedBasketDetails && storedTotalPrice) {
    //If they exist ("not null") then print it to the console.
    console.log(storedBasketDetails);
    console.log(storedTotalPrice);

    // Reference to the parent element where product items taken from the array "storedBasket details" will be appended/added.
    const summaryContainer = document.getElementById('Summary');

    //Check if the "Summary" container exists before proceeding any further.
    if (summaryContainer) {
        // Function to create and append items to the "Summary"  div that is used to display the items to be purchased.
        function createOrderItem(itemDetails, index) {
            // Create div element for the each Item in the storedBasketDetails array.
            const itemDiv = document.createElement('div');
            // giving the class name for that div that is to be created.
            itemDiv.classList.add('OrderItems');
            //giving the id for that div that is to be created.
            itemDiv.id = `Item${index + 1}`; // Assuming index starts from 0.

            // Create paragraph element with item details stored in individual array of each individual item stored in the main array .
            const itemParagraph = document.createElement('p');
            // setting the innerHTML of the p tags of the individual items.
            itemParagraph.innerHTML = `
                Item Name: ${itemDetails[0]}<br>
                Item Price: ${itemDetails[3]}<br>
                Quantity: ${itemDetails[1]}<br>
                Color: ${itemDetails[2]}
            `;

            // Append paragraph to item's individual div.
            itemDiv.appendChild(itemParagraph);

            // Append individual item div to summary container.
            summaryContainer.appendChild(itemDiv);
        }

        // Looping through storedBasketDetails and creating individual div to display items to be purchase.
        storedBasketDetails.forEach((item, index) => {
            createOrderItem(item, index); // passing the item array and the idex of it in main-array(storedBasketDetails).
        });

        //Capturing the "Total-Order" h3 element.
        const totalOrderElement = document.getElementById('Total-Order');
        // checking if the "Total-Order" h3 element exist.
        if (totalOrderElement) {
            //if the element exists change the innerHTML of it to include the total amount of the purchase bill in it. 
            totalOrderElement.innerHTML = `Order ${storedTotalPrice}`;
        }
    }
} else {
    //Show the message in the console stating theres no data stored in the sessionStorage.
    console.log("Basket details or total price not found in sessionStorage.");
}


//Function to generate random 8-digit reference number when the webpage is loaded.
document.addEventListener('DOMContentLoaded', function() {
    //Capturing the sessionStorage Item "storedReferenceID" in a variable.
    let referenceID = sessionStorage.getItem('storedReferenceID');

    //Checking if the referenceID is stored in the session storage.
    if (!referenceID) {
        // Generate a random 8-digit number if not already stored in sessionStorage.
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
        referenceID = `#${randomNumber}`;

        // Store the generated reference ID in  the sessionStorage.
        sessionStorage.setItem('storedReferenceID', referenceID);
    }

    // Find the element by ID and set its inner HTML to display the reference no. of the purchase.
    const refElement = document.getElementById('Ref_No.');
    refElement.textContent = `Reference ID: ${referenceID}`;
});



// Function to validate each field in all three form. Takes(The field name used to display message if a field doesn't contain any content, input field, custom created error message to be displayed in each error instance).
function validateField(fieldName, field, pattern, errorMessage) {

    // Storing the value stored in each field input after trim the leading and trailing spaces in a variable called value.
    let value = field.value.trim();

    // Checking if the value in the variable is empty.
    if (value === "") {
        //Shows an popup message indicating that the input field is required.
        alert(`${fieldName} is required.`);

        field.focus(); //focusing the input field where the error occured.
        return false; //returning to the caller with false boolean.
    }

    // Check if the value in the variable does not matches the pattern sent to the function.
    if (!pattern.test(value)) {
        //if condition is passed the show popup error message with the custom error message that was passed to the function.
        alert(errorMessage);
        field.focus(); //focusing the input field where the error occured.
        return false; //returning to the caller with false boolean.
    }

    return true; //returning to the caller with true boolean if no error was detected in the value inputted to the input field.
}

//Function to validate the Contact form.
function validateContactForm() {
    
    //Accessing the reference to the elements below by ID and assigning them to variables for later use.
    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let phoneNo = document.getElementById("phoneNo");
    let email = document.getElementById("Email");
    let consentCheckbox = document.getElementById("consent1");

    // Initializing variable with regex to validate relevant input field.
    let namePattern = /^[a-zA-Z]+$/;
    let phonePattern = /^\d{10}$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Ensure form validity starts as false everytime, in the variable used to keep track of each form.
    contactFormValid = false;// Maintain the validity check status of the contact fields of the Contact form.

    // Validate each input field of the Contact-details form. If only the validation of all fields becomes a success the code will proceed to to its real end.
    if (!validateField("First Name", fname, namePattern, "First name can only contain letters.")) return;
    if (!validateField("Last Name", lname, namePattern, "Last name can only contain letters.")) return;
    if (!validateField("Phone Number", phoneNo, phonePattern, "Phone number must be 10 digits.")) return;
    if (!validateField("Email Address", email, emailPattern, "Please enter a valid email address.")) return;

    // Check if consent checkbox is checked.
    if (!consentCheckbox.checked) {
        alert("Please agree to the terms and conditions.");
        consentCheckbox.focus(); //focusing the checkbox where the error occured.
        return;
    }

    // If all fields are valid, set form validity to true in the variable used to track the validity success of the Contact-details form.
    contactFormValid = true;

    // Displays a validation success popup message indicating all the data entered to the contact-details form are valid.
    alert("Contact form validation successful!");

    // Make input fields readonly if validation is successful to prevent the user from entering any new data.
    fname.readOnly = true;
    lname.readOnly = true;
    phoneNo.readOnly = true;
    email.readOnly = true;

    // Update loader that displays the status of the purchase form completion.
    updateLoader();

    // Disable Clear fields button functionality after the Save changes button executes it function without any data validation issues.
    // Access the button with ID "Contact-clear" in a variable.
    let clearButton = document.getElementById("Contact-clear");
    //Check if the button exist.
    if (clearButton) {
        clearButton.disabled = true; // Disables the button, this is done to prevent the user from cleaing the data he/she had correctly entered and finalized.
    }

}


//When the webpage content loads adding the event listeners to the below elements of the Contact form that will respond when data is added to the input fields below.
document.addEventListener("DOMContentLoaded", function() {
    //Adding event listener to input field with ID "fname".
    document.getElementById("fname").addEventListener("change", function() {
        validateField("First Name", this, /^[a-zA-Z]+$/, "First name can only contain letters.");
    });
    //Adding event listener to input field with ID "lname".
    document.getElementById("lname").addEventListener("change", function() {
        validateField("Last Name", this, /^[a-zA-Z]+$/, "Last name can only contain letters.");
    });
    //Adding event listener to input field with ID "phoneNo".
    document.getElementById("phoneNo").addEventListener("change", function() {
        validateField("Phone Number", this, /^\d{10}$/, "Phone number must be 10 digits.");
    });
    //Adding event listener to input field with ID "Email".
    document.getElementById("Email").addEventListener("change", function() {
        validateField("Email Address",this, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address.");
    });
});

//Function to clear Contact details in the input fields of the Contact details form.
function clearContactFields() {
    //Clearing all the input fields of the Contact form.
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("phoneNo").value = "";
    document.getElementById("Email").value = "";

    //Removing the readonly attribute from all the input fields of the Contact details form.
    document.getElementById("fname").readOnly = false;
    document.getElementById("lname").readOnly = false;
    document.getElementById("phoneNo").readOnly = false;
    document.getElementById("Email").readOnly = false;
}




// Function to clear payment details in the input fields of the Payment details form.
function clearPaymentFields() {
    //Clearing all the input fields of the Payment details form.
    document.getElementById("CardNo").value = "";
    document.getElementById("CardHolderName").value = "";
    document.getElementById("ExpiryDate").value = "";
    document.getElementById("CCV").value = "";

    //Removing the readonly attribute from all the input fields of the Payment details form.
    document.getElementById("CardNo").readOnly = false;
    document.getElementById("CardHolderName").readOnly = false;
    document.getElementById("ExpiryDate").readOnly = false;
    document.getElementById("CCV").readOnly = false;
}



// Function to validate the entire payment form
function validatePaymentForm() {

    //Accessing the reference to the elements below by ID and assigning them to variables for later use.
    let cardNo = document.getElementById("CardNo");
    let cardHolderName = document.getElementById("CardHolderName");
    let expiryDate = document.getElementById("ExpiryDate");
    let ccv = document.getElementById("CCV");
    let consentCheckbox = document.getElementById("consent2");

    // Initializing variable with regex to validate relevant input field.
    let cardNumberPattern = /^\d{16}$/;
    let namePattern = /^[a-zA-Z ]+$/;
    let ccvPattern = /^\d{3}$/;

    // Ensure form validity starts as false everytime, in the variable used to keep track of each form.
    paymentFormValid = false; // Maintain the validity check status of the Payment field of the payment form.

    // Validate each input field of the payment-details form. If only the validation of all fields becomes a success the code will proceed to to its real end.
    if (!validateField("Card Number", cardNo, cardNumberPattern, "Card number must be 16 digits.")) return;
    if (!validateField("Cardholder Name", cardHolderName, namePattern, "Cardholder name can only contain letters and spaces.")) return;
    if (!validateField("Expiry Date", expiryDate, /.+/, "Expiry date is required.")) return;
    if (!validateField("CCV", ccv, ccvPattern, "CCV must be 3 digits.")) return;

    // Check if consent checkbox is checked.
    if (!consentCheckbox.checked) {
        alert("Please agree to the terms and conditions.");
        consentCheckbox.focus(); //focusing the checkbox where the error occured.
        return;
    }

    // Displays a validation success popup message indicating all the data entered to the payment-details form are valid.
    alert("Payment form validation successful!");

    // Make input fields readonly if validation is successful to prevent the user from entering any new data.
    cardNo.readOnly = true;
    cardHolderName.readOnly = true;
    expiryDate.readOnly = true;
    ccv.readOnly = true;

    // If all fields are valid, set form validity to true in the variable used to track the validity success of the payment-details form.
    paymentFormValid = true; 

    // Update loader that displays the status of the purchase form completion.
    updateLoader();

    // Disable Clear fields button functionality after the Save changes button executes it function without any data validation issues.
    // Access the button with ID "Payment-clear" in a variable.
    let clearButton = document.getElementById("Payment-clear");
    //Check if the button exist.
    if (clearButton) {
        clearButton.disabled = true; // Disables the button, this is done to prevent the user from cleaing the data he/she had correctly entered and finalized.
    }
}

//When the webpage content loads adding the event listeners to the below elements of the Payment details form that will respond when data is added to the input fields below.
document.addEventListener("DOMContentLoaded", function() {
    //Adding event listener to input field with ID "CardNo".
    document.getElementById("CardNo").addEventListener("change", function() {
        validateField("Card Number", this, /^\d{16}$/, "Card number must be 16 digits.");
    });
    //Adding event listener to input field with ID "CardHolderName".
    document.getElementById("CardHolderName").addEventListener("change", function() {
        validateField("Cardholder Name", this, /^[a-zA-Z ]+$/, "Cardholder name can only contain letters and spaces.");
    });
    //Adding event listener to input field with ID "ExpiryDate".
    document.getElementById("ExpiryDate").addEventListener("change", function() {
        validateField("Expiry Date", this, /.+/, "Expiry date is required.");
    });
    //Adding event listener to input field with ID "CCV".
    document.getElementById("CCV").addEventListener("change", function() {
        validateField("CCV", this, /^\d{3}$/, "CCV must be 3 digits.");
    });
});





//Function to clear billing details in the input fields of the Billing address details form.
function clearBillingFields() {
    //Clearing all the input fields of the billing address details form.
    document.getElementById("Addressline1").value = "";
    document.getElementById("Addressline2").value = "";
    document.getElementById("Addressline3").value = "";
    document.getElementById("TownOrCity").value = "";
    document.getElementById("StateOrCountry").value = "";
    document.getElementById("PostCodeOrZipcode").value = "";
    document.getElementById("Country").value = "";

    //Removing the readonly attribute from all the input fields of the Billing address details form.
    document.getElementById("Addressline1").readOnly = false;
    document.getElementById("Addressline2").readOnly = false;
    document.getElementById("Addressline3").readOnly = false;
    document.getElementById("TownOrCity").readOnly = false;
    document.getElementById("StateOrCountry").readOnly = false;
    document.getElementById("PostCodeOrZipcode").readOnly = false;
    document.getElementById("Country").readOnly = false;
}


// Function to validate the entire billing form.
function validateBillingForm() {
    //Accessing the reference to the elements below by ID and assigning them to variables for later use.
    let addressLine1 = document.getElementById("Addressline1");
    let townOrCity = document.getElementById("TownOrCity");
    let postCodeOrZipcode = document.getElementById("PostCodeOrZipcode");
    let country = document.getElementById("Country");
    let consentCheckbox = document.getElementById("consent3");

    // Initializing variable with regex to validate relevant input field.
    let addressPattern = /^[a-zA-Z0-9\s,'-]*$/; // Allows letters, numbers, spaces, and basic punctuation.
    let postcodePattern = /^[a-zA-Z0-9\s,'-]*$/;

    // Ensure form validity starts as false everytime, in the variable used to keep track of each form.
    billingFormValid = false; // Maintain the validity check status of the Billing fields of the billing address form.

   // Validate each input field of the Billing address details form. If only the validation of all fields becomes a success the code will proceed to to its real end.
    if (!validateField("Address Line 1", addressLine1, addressPattern, "Address Line 1 can only contain letters, numbers, spaces, and basic punctuation (, '-).")) return;
    if (!validateField("Town/City", townOrCity, addressPattern, "Town/City can only contain letters, numbers, spaces, and basic punctuation (, '-).")) return;
    if (!validateField("Postcode/Zip code", postCodeOrZipcode, postcodePattern, "Postcode/Zip code must contain only numbers and letters.")) return;
    if (!validateField("Country", country, addressPattern, "Country can only contain letters, numbers, spaces, and basic punctuation (, '-).")) return;

    // Check if consent checkbox is checked.
    if (!consentCheckbox.checked) {
        alert("Please agree to the terms and conditions.");
        consentCheckbox.focus(); //focusing the checkbox where the error occured.
        return;
    }

    // Displays a validation success popup message indicating all the data entered to the Billing address details form are valid.
    alert("Billing address form validation successful!");

    // Make input fields readonly if validation is successful to prevent the user from entering any new data.
    addressLine1.readOnly = true;
    document.getElementById("Addressline2").readOnly = true;
    document.getElementById("Addressline3").readOnly = true;
    townOrCity.readOnly = true;
    document.getElementById("StateOrCountry").readOnly = true;
    postCodeOrZipcode.readOnly = true;
    country.readOnly = true;

    // If all fields are valid, set form validity to true in the variable used to track the validity success of the Billing address details form.
    billingFormValid = true; // Maintain the validity check status of the Billing fields.

     // Disable Clear fields button functionality after the Save changes button executes it function without any data validation issues.
    // Access the button with ID "Billing-clear" in a variable.
    let clearButton = document.getElementById("Billing-clear");
    //Check if the button exist.
    if (clearButton) {
        clearButton.disabled = true; // Disables the button, this is done to prevent the user from cleaing the data he/she had correctly entered and finalized.
    }
    // Update loader that displays the status of the purchase form completion.
    updateLoader();
}

//When the webpage content loads adding the event listeners to the below elements of the Billing address details form that will respond when data is added to the input fields below.
document.addEventListener("DOMContentLoaded", function() {
    //Adding event listener to input field with ID "Addressline1".
    document.getElementById("Addressline1").addEventListener("change", function() {
        validateField("Address Line 1", this, /^[a-zA-Z0-9\s,'-]*$/, "Address Line 1 can only contain letters, numbers, spaces, and basic punctuation (, '-).");
    });
    //Adding event listener to input field with ID "TownOrCity".
    document.getElementById("TownOrCity").addEventListener("change", function() {
        validateField("Town/City", this, /^[a-zA-Z0-9\s,'-]*$/, "Town/City can only contain letters, numbers, spaces, and basic punctuation (, '-).");
    });
    //Adding event listener to input field with ID "PostCodeOrZipcode".
    document.getElementById("PostCodeOrZipcode").addEventListener("change", function() {
        validateField("Postcode/Zip code", this,/^[a-zA-Z0-9\s,'-]*$/, "Postcode/Zip code must contain only numbers and letters.");
    });
    //Adding event listener to input field with ID "Country".
    document.getElementById("Country").addEventListener("change", function() {
        validateField("Country", this, /^[a-zA-Z0-9\s,'-]*$/, "Country can only contain letters, numbers, spaces, and basic punctuation (, '-).");
    });
});



// Function to update loader based on form validation status
function updateLoader() {
    //Accessing the loader bar element.
    let loader = document.getElementById("loader");

    // Count how many forms are valid.
    let validCount = 0;
    if (contactFormValid) validCount++;
    if (paymentFormValid) validCount++;
    if (billingFormValid) validCount++;


    // Access the <h1> and <p> elements in the div with ID "CompletinoStatus".
    let completionStatusHeader = document.querySelector("#CompletionStatus h1");
    let completionStatusParagraph = document.querySelector("#CompletionStatus p");

    // Adjust loader properties based on validCount.
    //Check if all forms have been validated successfully.
    if (validCount === 3) {
        /*Making the loader take 100% of the width of its parent container*/
        loader.style.display = "none";
        loader.style.width = "100%";
        loader.style.display = "block";

        // Update the content of the <h1> and <p> tags in the div with ID "CompletinoStatus".
        completionStatusHeader.textContent = "The Form is Complete";
        completionStatusParagraph.textContent = "You can make the payment now!";


    } else if (validCount === 2) {
        // Adjust loader properties if the validCount is only 2.
        loader.style.display = "none";
        loader.style.width = "calc(100% / 3 * 2)";
        loader.style.display = "block";
    } else if (validCount === 1) {
        // Adjust loader properties if the validCount is only 1.
        loader.style.display = "none";
        loader.style.display = "block";
    } else {
        // Adjust loader properties if the validCount is 0.
        loader.style.display = "none";
    }
}

//function to display the pop up message.
function displayMessage(action) {
    //Capture the reference number from the sessionStorage item storing the referenece id
    const orderNumber = sessionStorage.getItem('storedReferenceID');
    //Checking if the reference number is available in the session storage.
    if (!orderNumber) {
        //Console message if the reference number is missing.
        console.log("Order number not found in sessionStorage.");
    }

    //accessing elements by ID inside the popup message container for later use.
    const decisionResponse = document.getElementById('Decision-response');
    const responseMessage1 = document.getElementById('Response-message1');
    const moneyUse = document.getElementById('moneyuse')
    const responseMessage2 = document.getElementById('Response-message2');
    const PopupMessage = document.getElementById('PopupMessage');
    
    let formcomplete= false;//Maintain the form completion status.

    //if form complete then the variable is set to true.
    if (contactFormValid && paymentFormValid && billingFormValid) formcomplete = true;

    //Check which if parameter that was recieved was "payment".
    if (action === 'payment') {
        //check if the form is complete.
        if(formcomplete){
            //Changing the innerHTML of the below elements.
            decisionResponse.innerText = 'Thank You For Your Purchase!';
            responseMessage1.innerHTML = `Your order has been successfully placed.<br><br>
                                          Order Number: <span>${orderNumber}</span><br><br>
                                          You will receive a confirmation email shortly with your order details.<br>`;
            moneyUse.innerText = 'Support for Conservation';
            responseMessage2.innerHTML = `We are committed to the conservation of wildlife and forest biomes around the world. 
                                          A portion of the proceeds from your purchase will be dedicated to these efforts.<br><br>
                                          If you have any questions or need further assistance, please don't hesitate to contact our customer support team.<br><br>
                                          Thank you for shopping with us and for supporting our conservation efforts!<br><br>
                                          <i>~ Gaia Radiance</i>`;

            PopupMessage.style.display = 'flex'; //Makes the popup message container visible.
        } else{
            //Error popup message if the Make payment button is pressed without the form complete.
            alert("You must fill the form to make the payment!")
        }
    } //Check which if parameter that was recieved was "cancel".
    else if (action === 'cancel') {
        //Changing the innerHTML of the below elements.
        decisionResponse.innerText = 'Order Canceled!';
        responseMessage1.innerHTML = `We noticed that you have declined your order.<br><br>
                                      Order Number: <span>${orderNumber}</span><br><br>
                                      If this was a mistake or if you have any questions or concerns, please don't hesitate to contact our customer support team for assistance.<br>`;
        moneyUse.innerText = 'Support for Conservation';
        responseMessage2.innerHTML = `We appreciate your consideration. Remember, a portion of proceeds from every purchase helps support the conservation of wildlife and forest biomes around the world. 
                                      We hope you will consider supporting our cause in the future.<br><br>
                                      Thank you for considering <i>Gaia Radiance</i> store.`;

        PopupMessage.style.display = 'flex';//Makes the container visible.
    }
}

// function to hide the pop-up message container.
function hidePopupMessage() {
    document.getElementById('PopupMessage').style.display = 'none';
}

function Backtoshop(){
    // Redirect to shop webpage.
    window.location.href = 'shop.html';
}

//Listens to the scroll of the webpage window.
window.addEventListener('scroll', function() {
    //Access div by ID "faketop".
    var faketop = document.getElementById('faketop');
    
    // Calculate the 10% scroll threshold.
    var scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    var threshold = 0.2 * scrollableHeight;

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
        dropdown.style.display = 'block';//Making it visible again.
    } else {
        dropdown.style.display = 'none';//removing it again if it was previously visible.
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
