//fungsi untuk count otomatis pada meta count
document.addEventListener("DOMContentLoaded", function () {
    // Meta Title Count
    const metaTitle = document.getElementById("metaTitle");
    const metaTitleCount = document.getElementById("metaTitleCount");

    metaTitle.addEventListener("input", function () {
        metaTitleCount.value = metaTitle.value.length;
    });

    // Meta Description Count
    const metaDescription = document.getElementById("metaDescription");
    const metaDescriptionCount = document.getElementById("metaDescriptionCount");

    metaDescription.addEventListener("input", function () {
        metaDescriptionCount.value = metaDescription.value.length;
    });
});

//fungsi untuk count otomatis broken Link
const brokenLinksCountInput = document.getElementById("brokenLinksCount");
const brokenLinkUrlInput = document.getElementById("brokenLinkurl");

brokenLinkUrlInput.addEventListener("input", () => {
    const urls = brokenLinkUrlInput.value.split(",").map(url => url.trim()); // Split by comma and trim spaces
    const validUrls = urls.filter(url => url.length > 0); // Filter out empty strings
    brokenLinksCountInput.value = validUrls.length; // Update the count
});


// Fungsi untuk mengisi form dengan data yang ada
function populateForm(data) {
    document.getElementById('clientName').value = data.clientName || '';
    document.getElementById('websiteUrl').value = data.websiteUrl || '';
    document.getElementById('auditDate').value = data.auditDate || '';
    document.getElementById('gtmetrixGrade').value = data.gtmetrixGrade || '';
    document.getElementById('gtmetrixPerformance').value = data.gtmetrixPerformance || 0;
    document.getElementById('gtmetrixStructure').value = data.gtmetrixStructure || 0;
    document.getElementById('pagespeedPerformance').value = data.pagespeedPerformance || 0;
    document.getElementById('pagespeedAccessibility').value = data.pagespeedAccessibility || 0;
    document.getElementById('pagespeedbestpractices').value = data.pagespeedbestpractices || 0;
    document.getElementById('pageSpeedSEO').value = data.pageSpeedSEO || 0;
    document.getElementById('brokenLinksCount').value = data.brokenLinksCount || 0;
    document.getElementById('brokenLinkurl').value = data.brokenLinkurl || '';
    document.getElementById('duplicateContentPercentage').value = data.duplicateContentPercentage || 0;
    document.getElementById('commonContentPercentage').value = data.commonContentPercentage || 0;
    document.getElementById('uniqueContentPercentage').value = data.uniqueContentPercentage || 0;
    document.getElementById('mobileFriendly').checked = data.mobileFriendly || false;
    document.getElementById('metaTitle').value = data.metaTitle || '';
    document.getElementById('metaTitleCount').value = data.metaTitleCount || 0;
    document.getElementById('metaDescription').value = data.metaDescription || '';
    document.getElementById('metaDescriptionCount').value = data.metaDescriptionCount || 0;
    document.getElementById('H1Count').value = data.H1Count || 0;
    document.getElementById('H2Count').value = data.H2Count || 0;
    document.getElementById('H3Count').value = data.H3Count || 0;
    document.getElementById('H4Count').value = data.H4Count || 0;
    document.getElementById('H5Count').value = data.H5Count || 0;
    document.getElementById('H6Count').value = data.H6Count || 0;
    document.getElementById('metaKeywords').value = data.metaKeywords || '';
    document.getElementById('openGraph').value = data.openGraph || 'not_implemented';
    document.getElementById('metaRobots').checked = data.metaRobots || false;
    document.getElementById('canonicalTag').checked = data.canonicalTag || false;
    document.getElementById('sitemapPresent').checked = data.sitemapPresent || false;
    document.getElementById('robotsTxtPresent').checked = data.robotsTxtPresent || false;
    document.getElementById('googleSearchConsole').checked = data.googleSearchConsole || false;
    document.getElementById('faviconPresent').checked = data.faviconPresent || false;
    document.getElementById('notes').value = data.notes || '';
}

// Fungsi untuk mengambil ID dari URL
function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Fungsi untuk menangani penyimpanan data
async function saveAuditData() {
    const id = getIdFromURL();
    if (!id) {
        alert('Invalid audit ID');
        return;
    }

    const formData = {
        clientName: document.getElementById('clientName').value,
        websiteUrl: document.getElementById('websiteUrl').value,
        auditDate: document.getElementById('auditDate').value,
        gtmetrixGrade: document.getElementById('gtmetrixGrade').value,
        gtmetrixPerformance: parseInt(document.getElementById('gtmetrixPerformance').value, 10),
        gtmetrixStructure: parseInt(document.getElementById('gtmetrixStructure').value, 10),
        pagespeedPerformance: parseInt(document.getElementById('pagespeedPerformance').value, 10),
        pagespeedAccessibility: parseInt(document.getElementById('pagespeedAccessibility').value, 10),
        pagespeedbestpractices: parseInt(document.getElementById('pagespeedbestpractices').value, 10),
        pageSpeedSEO: parseInt(document.getElementById('pageSpeedSEO').value, 10),
        brokenLinksCount: parseInt(document.getElementById('brokenLinksCount').value, 10),
        brokenLinkurl: document.getElementById('brokenLinkurl').value,
        duplicateContentPercentage: parseInt(document.getElementById('duplicateContentPercentage').value, 10),
        commonContentPercentage: parseInt(document.getElementById('commonContentPercentage').value, 10),
        uniqueContentPercentage: parseInt(document.getElementById('uniqueContentPercentage').value, 10),
        mobileFriendly: document.getElementById('mobileFriendly').checked,
        metaTitle: document.getElementById('metaTitle').value,
        metaTitleCount: parseInt(document.getElementById('metaTitleCount').value, 10),
        metaDescription: document.getElementById('metaDescription').value,
        metaDescriptionCount: parseInt(document.getElementById('metaDescriptionCount').value, 10),
        H1Count: parseInt(document.getElementById('H1Count').value, 10),
        H2Count: parseInt(document.getElementById('H2Count').value, 10),
        H3Count: parseInt(document.getElementById('H3Count').value, 10),
        H4Count: parseInt(document.getElementById('H4Count').value, 10),
        H5Count: parseInt(document.getElementById('H5Count').value, 10),
        H6Count: parseInt(document.getElementById('H6Count').value, 10),
        metaKeywords: document.getElementById('metaKeywords').value,
        openGraph: document.getElementById('openGraph').value,
        metaRobots: document.getElementById('metaRobots').checked,
        canonicalTag: document.getElementById('canonicalTag').checked,
        sitemapPresent: document.getElementById('sitemapPresent').checked,
        robotsTxtPresent: document.getElementById('robotsTxtPresent').checked,
        googleSearchConsole: document.getElementById('googleSearchConsole').checked,
        faviconPresent: document.getElementById('faviconPresent').checked,
        notes: document.getElementById('notes').value,
    };

    const success = await updateAuditById(id, formData);
    if (success) {
        alert('Audit updated successfully!');
        window.location.href = '/audit/list-audit.html'; // Redirect ke halaman list
    } else {
        alert('Some important parameters must not be empty : website url, Audit Date, GTMetrix Grade, Page Speed Performance, Meta Title, Meta Description');
    }
}

// Memuat data audit ke form saat halaman dimuat
document.addEventListener('DOMContentLoaded', async () => {
    const id = getIdFromURL();
    if (!id) {
        alert('Invalid audit ID');
        return;
    }

    try {
        const data = await getAuditById(id);
        populateForm(data);
    } catch (error) {
        alert('Failed to fetch audit data.');
    }
});

// Menambahkan event listener untuk tombol simpan
document.getElementById('saveButton').addEventListener('click', saveAuditData);


//Fungsi untuk mengambil data dari form untuk hasil rekomendasi
function getFormData() {
    return {
        clientName: document.getElementById('clientName').value,
        websiteUrl: document.getElementById('websiteUrl').value,
        auditDate: document.getElementById('auditDate').value,
        gtmetrixGrade: document.getElementById('gtmetrixGrade').value,
        gtmetrixPerformance: Number(document.getElementById('gtmetrixPerformance').value),
        gtmetrixStructure: Number(document.getElementById('gtmetrixStructure').value),
        pagespeedPerformance: Number(document.getElementById('pagespeedPerformance').value),
        pagespeedAccessibility: Number(document.getElementById('pagespeedAccessibility').value),
        pagespeedbestpractices: Number(document.getElementById('pagespeedbestpractices').value),
        pageSpeedSEO: Number(document.getElementById('pageSpeedSEO').value),
        brokenLinksCount: Number(document.getElementById('brokenLinksCount').value),
        brokenLinkurl: document.getElementById('brokenLinkurl').value,
        commonContentPercentage: Number(document.getElementById('commonContentPercentage').value),
        duplicateContentPercentage: Number(document.getElementById('duplicateContentPercentage').value),
        uniqueContentPercentage: Number(document.getElementById('uniqueContentPercentage').value),
        mobileFriendly: document.getElementById('faviconPresent').checked ? 'Yes' : 'No',
        metaTitle: document.getElementById('metaTitle').value,
        metaTitleCount: Number(document.getElementById('metaTitleCount').value),
        metaDescription: document.getElementById('metaDescription').value,
        metaDescriptionCount: Number(document.getElementById('metaDescriptionCount').value),
        H1Count: Number(document.getElementById('H1Count').value),
        H2Count: Number(document.getElementById('H2Count').value),
        H3Count: Number(document.getElementById('H3Count').value),
        H4Count: Number(document.getElementById('H4Count').value),
        H5Count: Number(document.getElementById('H5Count').value),
        H6Count: Number(document.getElementById('H6Count').value),
        metaKeywords: document.getElementById('metaKeywords').value,
        openGraph: document.getElementById('openGraph').value,
        metaRobots: document.getElementById('metaRobots').checked ? 'Yes' : 'No',
        canonicalTag: document.getElementById('canonicalTag').checked ? 'Yes' : 'No',
        sitemapPresent: document.getElementById('sitemapPresent').checked ? 'Yes' : 'No',
        robotsTxtPresent: document.getElementById('robotsTxtPresent').checked ? 'Yes' : 'No',
        googleSearchConsole: document.getElementById('googleSearchConsole').checked ? 'Yes' : 'No',
        faviconPresent: document.getElementById('faviconPresent').checked ? 'Yes' : 'No',
    };
}

// Fungsi untuk menangani klik tombol "Get Recommendations"
document.getElementById('getRecommendationsButton').addEventListener('click', () => {
    const seoData = getFormData();
    sendSeoData(seoData);
});


//ganti pake api project seo 
const apiKey = '';

function fetchPageSpeedData(url) {
    // URLs untuk desktop
    const desktopUrl = ``;

    // Fetch Desktop Results
    fetch(desktopUrl)
        .then(response => response.json())
        .then(data => {
            // Mengisi nilai ke input Desktop Performance, Desktop Accessibility, dll
            document.getElementById('pagespeedPerformance').value = Math.round(data.lighthouseResult.categories.performance.score * 100);
            document.getElementById('pagespeedAccessibility').value = Math.round(data.lighthouseResult.categories.accessibility.score * 100);
            document.getElementById('pageSpeedSEO').value = Math.round(data.lighthouseResult.categories.seo.score * 100);
            document.getElementById('pagespeedbestpractices').value = Math.round(data.lighthouseResult.categories['best-practices'].score * 100);
        })
        .catch(error => console.error('Error fetching desktop data:', error));
}

document.getElementById('fetchMetrics').addEventListener('click', () => {
    const url = document.getElementById('websiteUrl').value;
    if (url) {
        fetchPageSpeedData(url);
    }
});


// Fungsi untuk menampilkan dan menyembunyikan animasi loading
function showLoading() {
    document.getElementById("loadingOverlay").classList.remove("d-none");
}

function hideLoading() {
    document.getElementById("loadingOverlay").classList.add("d-none");
}

// Fungsi untuk mendapatkan rekomendasi
async function getRecommendations() {
    showLoading(); // Menampilkan animasi loading
    const formData = getFormData();

    try {
        // Simulasikan request API
        const result = await new Promise((resolve) => {
            setTimeout(() => resolve({ success: true, data: "SEO audit done successfully" }), 15000);
        });

        if (result.success) {
            alert(result.data); // Ganti dengan logika yang sesuai
        }
    } catch (error) {
        console.error("Error: ", error);
    } finally {
        hideLoading(); // Sembunyikan animasi loading
    }
}

// Tambahkan event listener ke tombol Get Recommendations
document.getElementById("getRecommendationsButton").addEventListener("click", getRecommendations);
