const landingScreen = document.querySelector('.landing-screen');
const formScreen = document.querySelector('.form-screen');

// start btn,, will display first form and hides landing page when cliked
function startForm() {
    const visibility = landingScreen.getAttribute('data-visible');

    if (visibility == "true") {
        landingScreen.setAttribute('data-visible', false);
        formScreen.setAttribute('data-visible', true);
    } else {
        landingScreen.setAttribute('data-visible', true);
        formScreen.setAttribute('data-visible', false);
    }
}

export default startForm;
