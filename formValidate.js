

export function formOneValidate() {

    let valid = false;
    const hoursInput = document.querySelectorAll('input[name="total-hours"]');
    const customHour = document.querySelector('input[name="total-hours-custom"]');
    const skillInput = document.querySelector('.skill-input').value;
   
    // for loop - checks if a box is checked or have # in custom input text box.
    // could also use forEach method
    for (var i=0; i < hoursInput.length; i++) {
        if (hoursInput[i].checked || customHour.value >= 50 && customHour.value <= 2000) {
            // if user type in the kill input will return true
            skillInput.length >= 1 && skillInput.length < 20 ?  valid = true : valid = false
            break;
        }
    }

    // when button click if true will go to next from page
    return valid;
}

export function formTwoValidate() {

    let valid = false;
    const totalDays = document.querySelectorAll('input[name="total-days"]');
    const dailyHours = document.querySelectorAll('input[name="daily-hours"]');

    // for loop - checks if a both input fields have a checked box 
    for (var i=0; i < totalDays.length ; i++) {
        if (totalDays[i].checked) {
            dailyHours.forEach( (day) => {
                if (day.checked) {
                    valid = true;
                }
            })
            break;
        }
    }
    
    return valid;
}


