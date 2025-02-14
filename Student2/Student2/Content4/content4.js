/*Function created to respond when menu button is clicked*/
function menuclicked() {
    //Access the div element with ID "dropdown" using a variable.
    var dropdown = document.getElementById('dropdown');
    //Check if the dropdown element is visible or not.
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        //if not visible making it visible.
        dropdown.style.display = 'block';
    } else {
        //if visible make it invisible.
        dropdown.style.display = 'none';
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

// Attach the handleResize function to the window resize event
window.addEventListener('resize', handleResize);

// Call handleResize on initial load to ensure correct state
handleResize();


