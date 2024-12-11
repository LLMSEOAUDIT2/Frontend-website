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

// Add event listener to detect changes in the Broken Links URL input
brokenLinkUrlInput.addEventListener("input", () => {
    const urls = brokenLinkUrlInput.value.split(",").map(url => url.trim()); // Split by comma and trim spaces
    const validUrls = urls.filter(url => url.length > 0); // Filter out empty strings
    brokenLinksCountInput.value = validUrls.length; // Update the count
});

// Fungsi untuk mengambil data dari form untuk hasil rekomendasi
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
        notes: document.getElementById('notes')?.value
    };
}

// Fungsi untuk menangani klik tombol "Get Recommendations"
document.getElementById('getRecommendationsButton').addEventListener('click', () => {
    const seoData = getFormData();
    sendSeoData(seoData);
});


//fungsi untuk mengirim pakai tombol submit
function getFormDataAudit() {
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
        notes: document.getElementById('notes')?.value
    };
}

// Event listener untuk tombol submit
document.getElementById('submitButton').addEventListener('click', () => {
    const auditData = getFormDataAudit();
    submitAudit(auditData);
});

//ganti pake api project seo 
const apiKey = 'AIzaSyDVel6diRLg7b9qbG2wZCyOqyIOMxz9-Sk';

//fungsi pagespeed otomatis
function fetchPageSpeedData(url) {
    // URLs untuk desktop
    const desktopUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=desktop&category=performance&category=accessibility&category=seo&category=best-practices&key=${apiKey}`;

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

//fungsi animasi analysis
