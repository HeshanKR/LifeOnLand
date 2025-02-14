document.addEventListener('DOMContentLoaded', function() {
    // Declare and initialize the variable 'promptContainer' to reference the element with id 'prompt-container'.
    const promptContainer = document.getElementById('prompt-container');
    
    // Declare and initialize the variable 'userInput' to reference the element with id 'user-input'.
    const userInput = document.getElementById('user-input');
    
    // Declare and initialize the variable 'progressBar' to reference the element with id 'progress-bar'.
    const progressBar = document.getElementById('progress-bar');
    
    // Declare and initialize the variable 'progressPercent' to reference the element with id 'progress-percent'.
    const progressPercent = document.getElementById('progress-percent');
    
    // Declare and initialize the variable 'stepsContainer' to reference the element with id 'steps'.
    const stepsContainer = document.getElementById('steps');
    
    // Declare and initialize the variable 'outputContainer' to reference the element with id 'output'.
    const outputContainer = document.getElementById('output');
    
    // Declare and initialize the variable 'prevButton' to reference the element with id 'prevButton'.
    const prevButton = document.getElementById('prevButton');
    
    // Declare and initialize the variable 'nextButton' to reference the element with id 'nextButton'.
    const nextButton = document.getElementById('nextButton');
    
    // Declare and initialize the variable 'promptModal' to reference the element with id 'promptModal'.
    const promptModal = document.getElementById('promptModal');
    
    // Declare and initialize the variable 'summaryModal' to reference the element with id 'summaryModal'.
    const summaryModal = document.getElementById('summaryModal');
    
    // Declare and initialize the variable 'summaryContent' to reference the element with id 'summaryContent'.
    const summaryContent = document.getElementById('summaryContent');
    
    // Declare and initialize the variable 'showSummaryButton' to reference the element with id 'showSummaryButton'.
    const showSummaryButton = document.getElementById('showSummaryButton');
    
    // Declare and initialize the variable 'submitButton' to reference the element with id 'submitButton'.
    const submitButton = document.getElementById('submitButton');

    // Declare and initialize the variable 'currentStep' to 0.
    let currentStep = 0;
    
    // Declare and initialize the variable 'totalSteps' to 15.
    const totalSteps = 15;
    
    // Declare and initialize the array 'userAnswers' to store user responses.
    const userAnswers = [];

    // Declare and initialize the array 'prompts' to store the questions.
    const prompts = [
        "What's your name?",
        "How old are you?",
        "Enter your username",
        "Enter a password",
        "What's your favourite land animal?",
        "Name a tree species you like",
        "How often do you visit parks or forests?",
        "Have you ever planted a tree?",
        "What's your favorite outdoor activity?",
        "Have you ever participated in a nature clean up?",
        "Have you ever seen a wild animal in its natural habitat?",
        "What's your favorite fruit that grows on trees?",
        "Have you ever grown a plant from a seed?",
        "What's your favorite season to observe changes in nature?"
    ];

    // Declare and initialize the array 'numericSteps' to store steps requiring numeric input.
    const numericSteps = [1,6]; // Steps that require numeric input
    
    // Declare and initialize the array 'alphabeticSteps' to store steps requiring alphabetic input.
    const alphabeticSteps = [0, 4, 5, 7, 8, 9, 10, 11, 12, 13]; // Steps that require alphabetic input

    // Function to update the UI based on the current step.
    function updateUI() {
        // Update the prompt container with the current question.
        promptContainer.textContent = prompts[currentStep];
        
        // Update the user input with the answer provided for the current step or an empty string.
        userInput.value = userAnswers[currentStep] || '';
        
        // Calculate the progress percentage and update the progress bar and percentage display.
        const progress = Math.round((currentStep / (totalSteps - 1)) * 100);
        progressBar.style.width = `${progress}%`;
        progressPercent.textContent = `${progress}%`;
        
        // Disable the previous button if the current step is the first step.
        prevButton.disabled = (currentStep === 0);
        
        // Disable the next button if the current step is the last step.
        nextButton.disabled = (currentStep === totalSteps - 1);
        
        // Disable the next button if the current answer is not valid.
        nextButton.disabled = !isCurrentAnswerValid();

        // Clear and update the steps container to show the completed steps.
        stepsContainer.innerHTML = '';
        for (let i = 0; i < totalSteps; i++) {
            const stepElement = document.createElement('div');
            stepElement.textContent = `${i + 1}`;
            stepElement.className = i <= currentStep ? 'completed' : '';
            stepsContainer.appendChild(stepElement);
        }

        // Check if the current step requires numeric input and set the input mode and event listeners accordingly.
        if (numericSteps.includes(currentStep)) {
            userInput.setAttribute('inputmode', 'numeric');
            userInput.addEventListener('keypress', restrictToNumbers);
            userInput.removeEventListener('keypress', restrictToLetters);
        // Check if the current step requires alphabetic input and set the input mode and event listeners accordingly.
        } else if (alphabeticSteps.includes(currentStep)) {
            userInput.setAttribute('inputmode', 'text');
            userInput.addEventListener('keypress', restrictToLetters);
            userInput.removeEventListener('keypress', restrictToNumbers);
        } else {
            // Remove input mode and event listeners if the current step does not have specific input restrictions.
            userInput.removeAttribute('inputmode');
            userInput.removeEventListener('keypress', restrictToNumbers);
            userInput.removeEventListener('keypress', restrictToLetters);
        }
    }

    // Function to check if the current answer is valid based on input type.
    function isCurrentAnswerValid() {
        const value = userInput.value.trim();
        // Validate numeric input.
        if (numericSteps.includes(currentStep)) {
            return /^\d+$/.test(value); // Only numbers are valid
        // Validate alphabetic input.
        } else if (alphabeticSteps.includes(currentStep)) {
            return /^[a-zA-Z\s]+$/.test(value); // Only letters and spaces are valid
        }
        // Validate non-empty input for other steps.
        return value !== ''; // Non-empty value is valid for other steps
    }

    // Function to restrict input to numbers.
    function restrictToNumbers(e) {
        const charCode = e.charCode;
        // Prevent input if the character code is not a number.
        if (charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
    }

    // Function to restrict input to letters and spaces.
    function restrictToLetters(e) {
        const charCode = e.charCode;
        // Prevent input if the character code is not a letter or space.
        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 32) {
            e.preventDefault();
        }
    }

    // Event listener for the previous button to navigate to the previous step.
    prevButton.addEventListener('click', function() {
        if (currentStep > 0) {
            currentStep--;
            updateUI();
        }
    });

    // Event listener for the next button to navigate to the next step if the current answer is valid.
    nextButton.addEventListener('click', function() {
        if (isCurrentAnswerValid()) {
            userAnswers[currentStep] = userInput.value;
            if (currentStep < totalSteps - 1) {
                currentStep++;
                updateUI();
            }
            // Display the prompt modal if the current step is the last step.
            if (currentStep === totalSteps - 1) {
                promptModal.style.display = 'block';
            }
        } else {
            alert('Please enter a valid answer for the current question.');
        }
    });

    // Event listener for the show summary button to display the summary modal.
    showSummaryButton.addEventListener('click', function() {
        promptModal.style.display = 'none';
        summaryModal.style.display = 'block';
        summaryContent.innerHTML = `
            <h2>Profile Summary</h2>
            <p><strong>Name:</strong> ${userAnswers[0]}</p>
            <p><strong>Age:</strong> ${userAnswers[1]}</p>
            <p><strong>Username:</strong> ${userAnswers[2]}</p>
            <p><strong>Favourite land animal:</strong> ${userAnswers[4]}</p>
            <p><strong>Tree Species:</strong> ${userAnswers[5]}</p>
            <p><strong>Visit parks or forests:</strong> ${userAnswers[6]}</p>
            <p><strong>Planted a tree:</strong> ${userAnswers[7]}</p>
            <p><strong>Favourite outdoor activity:</strong> ${userAnswers[8]}</p>
            <p><strong>Participated in a nature clean up:</strong> ${userAnswers[9]}</p>
            <p><strong>Seen a wild animal in its natural habitat:</strong> ${userAnswers[10]}</p>
            <p><strong>Favorite fruit :</strong> ${userAnswers[11]}</p>
            <p><strong>Grown a plant:</strong> ${userAnswers[12]}</p>
            <p><strong>Favorite season to observe changes in nature:</strong> ${userAnswers[13]}</p>
        `;
    });

    // Event listener for the user input to enable the next button if the current answer is valid.
    userInput.addEventListener('input', function() {
        nextButton.disabled = !isCurrentAnswerValid();
    });

    // Event listener for the submit button to display an alert and hide the summary modal upon submission.
    submitButton.addEventListener('click', function() {
        alert('Profile submitted successfully!');
        summaryModal.style.display = 'none';
    });

    // Initial call to update the UI.
    updateUI();
});



// Function to handle menu button click events.
function menuclicked() {
    // Access the div with id 'dropdown'.
    var dropdown = document.getElementById('dropdown');
    // Check if the dropdown div is not displayed or has no display style set.
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        // Make the dropdown visible.
        dropdown.style.display = 'block'; 
    } else {
        // Hide the dropdown if it is already visible.
        dropdown.style.display = 'none'; 
    }
}


// Function to handle window resize events and hide the dropdown if the menu button is not displayed.
function handleResize() {
    // Access the button element with id 'menubtn'.
    var menubtn = document.getElementById('menubtn');
    // Access the div element with id 'dropdown'.
    var dropdown = document.getElementById('dropdown');
    // Check if the menu button is hidden or removed from the view.
    if (window.getComputedStyle(menubtn).display === 'none') {
        // Hide the dropdown if the menu button is not visible.
        dropdown.style.display = 'none';
    }
}

// Attach the handleResize function to the window resize event to ensure the dropdown is hidden if the menu button is not displayed.
window.addEventListener('resize', handleResize);

// Call handleResize on initial load to ensure the dropdown is hidden if the menu button is not displayed.
handleResize();
