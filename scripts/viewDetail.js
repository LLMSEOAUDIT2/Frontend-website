// Ambil ID dari URL
const params = new URLSearchParams(window.location.search);
const auditId = params.get("id");

// Redirect jika ID tidak ditemukan
if (!auditId) {
    alert("No audit ID provided");
    window.location.href = "/audit/list-audit.html";
}

// Seleksi elemen untuk mengisi data
const generalInfo = document.getElementById("general-info");
const performanceMetrics = document.getElementById("performance-metrics");
const contentAnalysis = document.getElementById("content-analysis");
const metadata = document.getElementById("metadata");
const technicalSEO = document.getElementById("technical-seo");
const additionalNotes = document.getElementById("additional-notes");

// Fungsi untuk mengisi data ke halaman
function populateAuditDetails(audit) {
    // General Information
    generalInfo.innerHTML = `
        <p><strong>Client Name:</strong> ${audit.clientName}</p>
        <p><strong>Website URL:</strong> <a href="${audit.websiteUrl}" target="_blank">${audit.websiteUrl}</a></p>
        <p><strong>Date:</strong> ${new Date(audit.auditDate).toLocaleDateString()}</p>
    `;

    // Performance Metrics
    performanceMetrics.innerHTML = `
        <p><strong>GTMetrix Grade:</strong> ${audit.gtmetrixGrade}</p>
        <p><strong>GTMetrix Performance:</strong> ${audit.gtmetrixPerformance}%</p>
        <p><strong>GTMetrix Structure:</strong> ${audit.gtmetrixStructure}%</p>
        <p><strong>PageSpeed Performance:</strong> ${audit.pagespeedPerformance}%</p>
        <p><strong>PageSpeed Accessibility:</strong> ${audit.pagespeedAccessibility}%</p>
        <p><strong>PageSpeed Best Practices:</strong> ${audit.pagespeedbestpractices}%</p>
        <p><strong>PageSpeed SEO:</strong> ${audit.pageSpeedSEO}%</p>
    `;

    // Content Analysis
    const brokenLinks = Array.isArray(audit.brokenLinkurl)
        ? audit.brokenLinkurl
        : audit.brokenLinkurl.split(/[\s,]+/).filter(url => url.trim() !== "");

    contentAnalysis.innerHTML = `
        <p><strong>Broken Links Count:</strong> ${brokenLinks.length}</p>
        <p><strong>Broken Links:</strong></p>
        <ul>
         ${brokenLinks.map(url => `<li><a href="${url}" target="_blank">${url}</a></li>`).join("")}
        </ul>
        <p><strong>Duplicate Content Percentage:</strong> ${audit.duplicateContentPercentage}%</p>
        <p><strong>Common Content Percentage:</strong> ${audit.commonContentPercentage}%</p>
        <p><strong>Unique Content Percentage:</strong> ${audit.uniqueContentPercentage}%</p>
        <p><strong>Mobile Friendly:</strong> ${audit.mobileFriendly ? "Yes" : "No"}</p>
`;

    // Metadata
    metadata.innerHTML = `
        <p><strong>Meta Title:</strong> ${audit.metaTitle}</p>
        <p><strong>Meta Title Count:</strong> ${audit.metaTitleCount}</p>
        <p><strong>Meta Description:</strong> ${audit.metaDescription}</p>
        <p><strong>Meta Description Count:</strong> ${audit.metaDescriptionCount}</p>
        <p><strong>H1 Count:</strong> ${audit.H1Count}</p>
        <p><strong>H2 Count:</strong> ${audit.H2Count}</p>
        <p><strong>H3 Count:</strong> ${audit.H3Count}</p>
        <p><strong>H4 Count:</strong> ${audit.H4Count}</p>
        <p><strong>H5 Count:</strong> ${audit.H5Count}</p>
        <p><strong>H6 Count:</strong> ${audit.H6Count}</p>
        <p><strong>Meta Keywords:</strong> ${audit.metaKeywords}</p>
        <p><strong>Open Graph:</strong> ${audit.openGraph}</p>
    `;

    // Technical SEO
    technicalSEO.innerHTML = `
        <p><strong>Meta Robots:</strong> ${audit.metaRobots ? "Yes" : "No"}</p>
        <p><strong>Canonical Tag Present:</strong> ${audit.canonicalTag ? "Yes" : "No"}</p>
        <p><strong>Sitemap Present:</strong> ${audit.sitemapPresent ? "Yes" : "No"}</p>
        <p><strong>Robots.txt Present:</strong> ${audit.robotsTxtPresent ? "Yes" : "No"}</p>
        <p><strong>Google Search Console Connected:</strong> ${audit.googleSearchConsole ? "Yes" : "No"}</p>
        <p><strong>Favicon Present:</strong> ${audit.faviconPresent ? "Yes" : "No"}</p>
    `;

    // Additional Notes
    additionalNotes.innerHTML = `<pre>${audit.notes || "No notes provided."}</pre>`;
}

// Fetch data audit berdasarkan ID
fetchAuditDetails(auditId);
