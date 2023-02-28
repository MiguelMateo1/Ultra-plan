function calculateResult(date) {
    const skillInput = document.querySelector('.skill-input').value;
    const totalHoursInput = document.querySelector('input[name="total-hours"]:checked');
    const totalDays = document.querySelector('input[name="total-days"]:checked');
    const dailyHours = document.querySelector('input[name="daily-hours"]:checked');
    const customHour = document.querySelector('input[name="total-hours-custom"]');
  
    const resultsContainer = document.querySelector('.results-area');

    // getting values
    // custom total hours
    const totalHoursCuston = customHour.value;
    // how many days per week
    const daysPerWeek = totalDays.value
    // how many hours per day
    const hoursPerDay = dailyHours.value;
    // gets which ever have a valut, checked box or custom input
    const totalHours = totalHoursInput ? totalHoursInput.value : totalHoursCuston;

    // calculates estimated completion date
    const hoursPerWeek = daysPerWeek * hoursPerDay;
    const totalWeeks = (totalHours / hoursPerWeek);
    const daysToComplete = Math.round(totalWeeks * 7);

    const completeDay = date.add(daysToComplete, 'days');
    // to display in calendar div

    const month = completeDay.format('MMMM')
    const day = completeDay.format('D');
    const year = completeDay.format('YYYY');

    return resultsContainer.innerHTML = `<div class="results-area-1">
                  <button class="btn back-to-start">Back to start</button>
                  <button class="btn save-skill">Save Skill</button>
                  <aside class="results-container">
                      <h5>Your new skill is: <span class="my-skill">${skillInput}</span></h5>
                      <h6>Total hours - <span>${totalHours}</span></h6>
                      <h6>Days per week - <span>${daysPerWeek}</span></h6>
                      <h6>Hours per day - <span>${hoursPerDay}</span></h6>
                  </aside>
                </div>

                <div class="results-area-2">
                    <aside class="calendar-container">
                    <h6 class="eta">Estimated completion date</h6>
                        <div class="calendar">
                        <h5 class="month">${month}</h5>
                        <h5 class="day">${day}</h5>
                        <h6 class="year">${year}</h6>
                    </div>
                    <h6>Thats ${daysToComplete} days from now!!</h6>
              </aside>
                </div>

                <div class="results-area-3">
                  <aside class="text-container">
                    <p>Studying/learning ${daysPerWeek} days per week and dedicating ${hoursPerDay} hours per day you should achieve your goal around ${completeDay.format('MMMM Do YYYY')}.</p>
                  </aside>
                </div>`
}

export default calculateResult;
