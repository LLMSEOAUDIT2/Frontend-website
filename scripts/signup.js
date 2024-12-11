document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    await signup(username, password);
});