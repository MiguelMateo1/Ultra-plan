const progress = document.getElementById('progress');

function updateBar(circles, currentActive, prev, next) {
    // adds active class to circles
    circles.forEach( (circle, idx) => {
        
        if(idx < currentActive) {
            circle.classList.add('active')
        } else {
            circle.classList.remove('active')
        }
       
        // sets or removes disabled from buttons
        if (currentActive === 1) {
            prev.disabled = true
        } else if (currentActive === 4) {
            next.disabled = true
        } else {
            prev.disabled = false
            next.disabled = false
        }

        // getting how many circles are active
        const actives = document.querySelectorAll('.active');

        // calculates % to add to the sytle.width progress line
        let progressLine = (actives.length - 1) / (4 - 1) * 100 + "%";

        if (progressLine == 100 + "%") {
            // set width when progress line in full/100% 
            progressLine = 97 + "%"
        }
            progress.style.width = progressLine;
        }
    )
}

export default updateBar;