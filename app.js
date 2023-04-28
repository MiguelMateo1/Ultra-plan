import updateBar from "./progressBar.js";
import getCurrentFormPage from "./getCurrentForm.js";
import startForm from "./startForm.js";
import { formOneValidate, formTwoValidate } from "./formValidate.js";
import calculateResult from "./calculateResult.js";
import saveSkill from "./saveSkill.js"

// empty array, to push into saved skill array once you save a skill
let value = []
//  gets saved skills from localStorage 
let savedSkills = [...JSON.parse(localStorage.getItem("last"))]

// progress bar elements select
const startBtn = document.querySelector('.start-btn');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');
// form validation alert element
const alert = document.querySelector('.alert');
// results area page/ btns elements
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

    // setTimeout to display loader for 2 secound
    // calling results funtion and passing todays date (moment library)
    setTimeout(calculateResult, 2000, moment())
    // gets 'Back to start' and 'Save skill' btn and sets event listener on newly displayed btn's 
    window.onload = setTimeout(displayFormBtn, 2000);
});

// once results are displayed, this will display the 'Back To Start' and 'Save skill' btn
function displayFormBtn () {
    const saveSkillsBtn = document.querySelector('.save-skill');
    const backToStartBtn = document.querySelector('.back-to-start');

    backToStartBtn.addEventListener('click', () => {
    saveSkillsBtn.classList.remove('show');
     window.location.reload()
    });

    // btn to save skill and show on botton of page
    saveSkillsBtn.addEventListener('click', () => {

      if (saveSkillsBtn.classList.contains('show')) {
            return 
        } else {
            saveSkill(moment())
            saveSkillsBtn.classList.add('show');
            // save new skill to local storage
            value = JSON.parse(localStorage.getItem("value"))
            // push new skill to savedSkills array and saves to local storage
            savedSkills.push(value)
            localStorage.setItem("last", JSON.stringify(savedSkills));
            JSON.parse(localStorage.getItem("last"))

            //   create/adds an id to each saved skills (*id will be used to delete from list)
            function setSkillsId () {
                for (var i = 0; i < savedSkills.length; i++) {
                    savedSkills[i].id = i
                } 
                    localStorage.setItem("last", JSON.stringify(savedSkills));
                }
            setSkillsId()
            displaySavedSkill() 
        }
    });
}

// var to get and update the current active btn and form page
let currentActive = 1;

// increase currentActive var
next.addEventListener('click', () => {

    // checks if form is filled out in order to move to next form page
    // form one validation
    if (formOneValidate() && currentActive == 1) {
        currentActive++

        alert.classList.remove('show');
        // current active will not = more then the #'s of circles
        if (currentActive > circles.length) {
            currentActive = circles.length;
        }

        getCurrentFormPage(currentActive)
        updateBar(circles, currentActive, prev, next);
    } else if (formOneValidate() == false) {
        alert.classList.add('show');
    }

    // form two validation
    if (formTwoValidate() && formOneValidate()) { 
        currentActive++

        alert.classList.remove('show');
        // current active will not = more then the #'s of circles
        if (currentActive > circles.length) {
            currentActive = circles.length;
        }

        getCurrentFormPage(currentActive)
        updateBar(circles, currentActive, prev, next);
    } else if (formTwoValidate() == false) {
        alert.classList.add('show');
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
// radio btn is cheked or clears radio btn if their is text in input box
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

// displays saved skills 
function displaySavedSkill () {
    const savedSkillsContainer = document.querySelector('.my-skills');

    const skillsContainer = document.querySelector(".skills-area");
    const skillTitle = document.createElement('h4');
    skillTitle.innerHTML = 'My Skills'

    // if there is skills saved will display the skiils box
    savedSkills[0] ? savedSkillsContainer.classList.add('show') : savedSkillsContainer.classList.remove('show');

    const newSkill = savedSkills.map((skills) => {
        const {id, day, skill, hours} = skills

        return `<div class="show-skill" data-id="${id}">
                    <h5>${skill}</h5>
                    <p>${hours} hours</p>
                    <p>${day}</p>
                    <i class="fa-solid fa-trash-can delete"></i>
                </div>`
    }).join("")

return (
    savedSkillsContainer.prepend(skillTitle)
    ), skillsContainer.innerHTML = newSkill
}
displaySavedSkill()

// delete saved skill function
function deleteSkill () {
    const skillsRibbon = document.querySelector('.skills-ribbon');

    skillsRibbon.addEventListener('click', (e) => {
        // only listes if clicks on the delete icon
        if (e.target.tagName === "I") {
            // seleted skill
            let selected = e.target.parentNode.dataset.id
            // get index of seleted skill
            let index = savedSkills.findIndex(x => x.id == selected)
            // deletes skill based on its index
            savedSkills.splice(index,1)
                
            localStorage.setItem("last", JSON.stringify(savedSkills));
            displaySavedSkill()
        }
    })
}
deleteSkill()

// get days/hours value to diplay once click on check box
const daysInputs = document.querySelector('.total-days-form');
daysInputs.addEventListener('click', (e) => {
        getValue()
});

function getValue(){ 
    const checkboxes = document.getElementsByName('total-days');

        for (var i=0; i<checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                document.querySelector(".days-selected").innerText = checkboxes[i].value;
            }
        }
  };


const hoursInputs = document.querySelector('.total-hours-per');
hoursInputs.addEventListener('click', (e) => {
        getHours()
});

function getHours(){
  
    const checkboxes = document.getElementsByName('daily-hours');
    const halfHour = document.getElementsByName('half-hour');

        for (var i=0; i<checkboxes.length; i++) {
            if (halfHour[0].checked) {
                document.querySelector(".hours-selected").innerText = '.5'
            }

            if (checkboxes[i].checked) {
                document.querySelector(".hours-selected").innerText = checkboxes[i].value;
                if (halfHour[0].checked) {
                    document.querySelector(".hours-selected").innerText = checkboxes[i].value + '.5'
                }
                return
            }
        }
  };

