const BASE_URL = 'http://localhost:3000';

//fungsi login
async function login(username, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        // Simpan token di localStorage untuk penggunaan selanjutnya
        localStorage.setItem('token', data.token);
        return true; // Login berhasil
    } else {
        const errorData = await response.json();
        alert(errorData.message); // Tampilkan pesan error
        return false; // Login gagal
    }
}

//fungsi signup
async function signup(username, password) {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Signup successful! Please login.');
        window.location.href = 'login.html'; // Redirect ke halaman login
    } else {
        const errorData = await response.json();
        alert(errorData.message); // Tampilkan pesan error
    }
}

// Fungsi untuk mengirim data seo ke open ai key
async function sendSeoData(seoData) {
    try {
        const response = await fetch(`${BASE_URL}/api/send-seo-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seoData),
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('notes').value = result.recommendations;
        } else {
            const errorData = await response.json();
            document.getElementById('notes').value = `Error: ${errorData.message}`;
        }
    } catch (error) {
        document.getElementById('notes').value = `Error: ${error.message}`;
    }
}

// Fungsi untuk mengirim data seo yang telah diinput dan rekomendasi openai ke backend
async function submitAudit() {
    const formData = getFormData();

    try {
        const response = await fetch(`${BASE_URL}/seoAudit/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            alert('Audit berhasil dikirim!');
            // Redirect atau tindakan lain jika diperlukan
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error submitting audit:', error);
        alert('Terjadi kesalahan saat mengirim audit. Silakan coba lagi.');
    }
}

// Fungsi untuk mendapatkan data untuk list audit
async function getAuditData() {
    try {
        const response = await fetch(`${BASE_URL}/seoAudit/get`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching audit data:', error);
        return [];
    }
}

// Fungsi untuk menghapus data dari list audit
async function deleteAudit(id) {
    try {
        const response = await fetch(`${BASE_URL}/seoAudit/delete/${id}`, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting audit:', error);
        return false;
    }
}

// Mendapatkan data audit berdasarkan ID untuk di edit
async function getAuditById(id) {
    try {
        const response = await fetch(`${BASE_URL}/seoAudit/get/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching audit data:', error);
        throw error;
    }
}

// Memperbarui data audit hasil edit berdasarkan ID
async function updateAuditById(id, data) {
    try {
        const response = await fetch(`${BASE_URL}/seoAudit/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.ok;
    } catch (error) {
        console.error('Error updating audit data:', error);
        return false;
    }
}

// Fungsi untuk mengambil data detail audit berdasarkan ID
async function fetchAuditDetails(id) {
    try {
        const response = await fetch(`${BASE_URL}/seoAudit/get/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const audit = await response.json();
        populateAuditDetails(audit);
    } catch (error) {
        console.error(error);
        alert("Failed to fetch audit details.");
    }
}

//fungsi downloadPdf
function downloadPdfUrl(id) {
    return `${BASE_URL}/seoAudit/download-pdf?id=${id}`;
}