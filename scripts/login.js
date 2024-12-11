document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const isLoginSuccessful = await login(username, password);

    if (isLoginSuccessful) {
        alert('Login successful!');
        // Redirect ke halaman setelah login sukses
        window.location.href = '/audit/list-audit.html';
    }
});