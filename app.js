import updateBar from "./progressBar.js";
import getCurrentFormPage from "./getCurrentForm.js";
import startForm from "./startForm.js";
import { fomrOneValidate, formTwoValidate} from "./fromValidate.js";


const startBtn = document.querySelector('.start-btn');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');
const alert = document.querySelector('.alert');


// will display first form and hides landing page when cliked
startBtn.addEventListener("click", startForm);

// var to update the current active btn and form page
let currentActive = 1;

// increase currentActive var
next.addEventListener('click', () => {

    // checks if from is filled out in order to move to next form page
    // form one validation
    if (fomrOneValidate() && currentActive == 1) {
        currentActive++

        alert.classList.remove('active');

        if (currentActive > circles.length) {
            currentActive = circles.length;
        }

        getCurrentFormPage(currentActive)
        updateBar(circles, currentActive, prev, next);
    } else {
        alert.classList.add('active');
    }

    // form two validation
    if (formTwoValidate() && fomrOneValidate()) {
        currentActive++

        alert.classList.remove('active');

        if (currentActive > circles.length) {
            currentActive = circles.length;
        }

        getCurrentFormPage(currentActive)
        updateBar(circles, currentActive, prev, next);
    } else {
        alert.classList.add('active');
    }
});

// drecrease currentActive var
prev.addEventListener('click', () => {
    currentActive--

    if (currentActive < 1) {
        currentActive = 1;
    }

    console.log("back btn", currentActive)
    getCurrentFormPage(currentActive)
    updateBar(circles, currentActive, prev, next);
});


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
