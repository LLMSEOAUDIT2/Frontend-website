// Fungsi untuk menambahkan data ke tabel
function populateAuditTable(auditData) {
    const tableBody = document.getElementById('auditTableBody');
    tableBody.innerHTML = ''; // Bersihkan tabel sebelumnya

    auditData.forEach((audit) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${audit.clientName}</td>
            <td><a href="${audit.websiteUrl}" target="_blank">${audit.websiteUrl}</a></td>
            <td>${new Date(audit.auditDate).toLocaleDateString()}</td>
            <td class="actions">
                <div class="d-flex flex-column flex-md-row gap-2">
                    <a href="/audit/audit-detail.html?id=${audit.id}" class="btn btn-primary btn-sm">View Details</a>
                    <a href="/audit/edit-audit.html?id=${audit.id}" class="btn btn-warning btn-sm">Edit</a>
                    <a href="#" class="btn btn-info btn-sm" id="downloadButton-${audit.id}">Download PDF</a>
                    <a href="#" class="btn btn-danger btn-sm" onclick="confirmDelete('${audit.id}')">Delete</a>
                </div>
            </td>
        `;
        tableBody.appendChild(row);

        // Menambahkan event listener untuk setiap tombol Download PDF
        const downloadButton = document.getElementById(`downloadButton-${audit.id}`);
        if (downloadButton) {
            // Set URL untuk tombol Download PDF
            const downloadUrl = downloadPdfUrl(audit.id); // Fungsi untuk mendapatkan URL berdasarkan ID
            downloadButton.addEventListener('click', function () {
                // Redirect untuk mengunduh PDF
                window.location.href = downloadUrl;
            });
        }

    });
}


// Fungsi untuk mengonfirmasi dan menghapus audit
async function confirmDelete(id) {
    if (confirm('Do you really want to delete this data?')) {
        const success = await deleteAudit(id);
        if (success) {
            alert('Audit deleted successfully');
            loadAuditData('your-id'); // Ganti 'your-id' sesuai dengan kebutuhan
        } else {
            alert('Failed to delete audit');
        }
    }
}

// Fungsi untuk memuat data audit
async function loadAuditData(id) {
    const auditData = await getAuditData(id);
    populateAuditTable(auditData);
}

// Memuat data audit saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const id = 'your-id'; // Ganti dengan ID yang sesuai
    loadAuditData(id);
});
