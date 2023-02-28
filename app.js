import updateBar from "./progressBar.js";
import getCurrentFormPage from "./getCurrentForm.js";
import startForm from "./startForm.js";
import { formOneValidate, formTwoValidate } from "./formValidate.js";
import calculateResult from "./calculateResult.js";
import saveSkill from "./saveSkill.js"

// progress bar 
const startBtn = document.querySelector('.start-btn');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');
// form validation alert
const alert = document.querySelector('.alert');
// results area page/ btns
const calculateBtn = document.querySelector('.calculate-btn');
const resultsContainer = document.querySelector('.results-area');


//============ btn event listeners
// will display first form and hides landing page when cliked
startBtn.addEventListener("click", startForm);

// calculates and displays results
calculateBtn.addEventListener('click', () => {
    prev.disabled = true
    calculateBtn.disabled = true

    loadingIcon();

    // setTimeout to display loader for 3 secound
    // calling results funtion and passing todays date (moment library)
    setTimeout(calculateResult, 2000, moment())
    // gets 'Back to start' and 'Save skill' btn and sets event listener on newly displayed btn's 
    window.onload = setTimeout(displayResetBtn, 2000);
});

// once results are displayed, this will display the 'Back To Start' and 'Save skill' btn
function displayResetBtn () {
    const backToStartBtn = document.querySelector('.back-to-start');
    const saveSkillsBtn = document.querySelector('.save-skill');

    backToStartBtn.addEventListener('click', () => {
     window.location.reload()
    });
    // btn to save skill and show on botton of page
    saveSkillsBtn.addEventListener('click', () => {
      saveSkill(moment())
    });
}

// var to update the current active btn and form page
let currentActive = 1;

// increase currentActive var
next.addEventListener('click', () => {

    // checks if form is filled out in order to move to next form page
    // form one validation
    if (formOneValidate() && currentActive == 1) {
        currentActive++

        alert.classList.remove('active');
        // current active will not = more then the #'s of circles
        if (currentActive > circles.length) {
            currentActive = circles.length;
        }

        getCurrentFormPage(currentActive)
        updateBar(circles, currentActive, prev, next);
    } else if (formOneValidate() == false) {
        alert.classList.add('active');
    }

    // form two validation
    if (formTwoValidate() && formOneValidate()) {
        currentActive++

        alert.classList.remove('active');
        // current active will not = more then the #'s of circles
        if (currentActive > circles.length) {
            currentActive = circles.length;
        }

        getCurrentFormPage(currentActive)
        updateBar(circles, currentActive, prev, next);
    } else if (formTwoValidate() == false) {
        alert.classList.add('active');
    }
});

// drecrease currentActive var
prev.addEventListener('click', () => {
    currentActive--
    // current active cant be < 1
    if (currentActive < 1) {
        currentActive = 1;
    }
    getCurrentFormPage(currentActive)
    updateBar(circles, currentActive, prev, next);
});
//============= END btn event listeners


// for form 1,, this will clear input field if
// radio btn is cheked or clear radio btn if their is text in input
const hoursInput = [...document.querySelectorAll('input[name="total-hours"]')];
const customHour = document.querySelector('input[name="total-hours-custom"]');

hoursInput.forEach( (input) => {
     input.addEventListener("change", () => {
        customHour.value = null
    })
})

customHour.addEventListener("change", () => {
    hoursInput.forEach( (input) => {
        input.checked = false
    })
})

function loadingIcon() {
    return resultsContainer.innerHTML = `<div class="robot-loading-gif"></div>`
}