function saveSkill(date) {
    const skillInput = document.querySelector('.skill-input').value;
    const totalHoursInput = document.querySelector('input[name="total-hours"]:checked');
    const totalDays = document.querySelector('input[name="total-days"]:checked');
    const dailyHours = document.querySelector('input[name="daily-hours"]:checked');
    const customHour = document.querySelector('input[name="total-hours-custom"]');

    const savedSkillsContainer = document.querySelector('.my-skills');

    // getting values *same values from calculateResults.js
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

    const skillsContainer = document.querySelector(".skills-container");
    const skillTitle = document.createElement('h4');
    skillTitle.innerHTML = 'My Skills'


    const newSkill = `<aside class="skills-ribbon">
        <div class="skills-area">
            <div class="show-skill">
                <h5>${skillInput}</h5>
                <p>${daysToComplete} days left</p>
                <h5 class="view-more">view skill</h5>
            </div>
        </div>
        </aside>`

    return (
        savedSkillsContainer.prepend(skillTitle)
        ), skillsContainer.innerHTML = newSkill
    }

export default saveSkill;
