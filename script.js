
    const container = document.getElementById('form-container');
    const showSignup = document.getElementById('show-signup');
    const showSignin = document.getElementById('show-signin');

    showSignup.addEventListener('click', () => {
      container.classList.add('show-signup');
    });

    showSignin.addEventListener('click', () => {
      container.classList.remove('show-signup');
    });
    function changePage() {

window.location="index.html";

}