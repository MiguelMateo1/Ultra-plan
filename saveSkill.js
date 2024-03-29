function saveSkill(date) {
    const skillInput = document.querySelector('.skill-input').value;
    const totalHoursInput = document.querySelector('input[name="total-hours"]:checked');
    const totalDays = document.querySelector('input[name="total-days"]:checked');
    let dailyHours = document.querySelector('input[name="daily-hours"]:checked');
    const customHour = document.querySelector('input[name="total-hours-custom"]');
    const halfHour = document.querySelector('input[name="half-hour"]');

    // getting values *same values from calculateResults.js
    if (dailyHours == null) {
        dailyHours = 0
      } else {
        dailyHours = dailyHours.value
      }
    // custom total hours
    const totalHoursCuston = customHour.value;
    // how many days per week
    const daysPerWeek = totalDays.value
    // how many hours per day
    const hoursPerDay =  halfHour.checked ? dailyHours + halfHour.value : dailyHours;
    // gets which ever have a valut, checked box or custom input
    const totalHours = totalHoursInput ? totalHoursInput.value : totalHoursCuston;

    // calculates estimated completion date
    const hoursPerWeek = daysPerWeek * hoursPerDay;
    const totalWeeks = (totalHours / hoursPerWeek);
    const daysToComplete = Math.round(totalWeeks * 7);

    const completeDay = date.add(daysToComplete, 'days');

    const month = completeDay.format('MMM')
    const day = completeDay.format('D');
    const year = completeDay.format('YYYY');

    var name = {day: `${month} ${day}, ${year}`, hours: totalHours, skill: skillInput}
    // localStorage.setItem("value", JSON.stringify(name));

        return (
             name
            ), localStorage.setItem("value", JSON.stringify(name));
    }

export default saveSkill;
