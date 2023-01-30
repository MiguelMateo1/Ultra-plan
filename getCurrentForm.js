const formPage = [...document.querySelectorAll(`.form-page`)];


// function to get current form page to display, invoke when btn is clicked
function getCurrentFormPage(currentActive) {
    formPage.forEach((page) => {
        // gets the form # from the element class list name (slice to get the last letter)
       let currentPage = page.classList.value.slice(5,6)

       if (currentActive == currentPage) {
           page.setAttribute('data-active', true);
       } else {
           page.setAttribute('data-active', false);
       }

       if (currentActive == currentPage) {
           page.setAttribute('data-active', true);
       } else {
           page.setAttribute('data-active', false);
       }   
   })
}

export default getCurrentFormPage;