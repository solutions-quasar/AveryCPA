const fs = require('fs');
const path = require('path');
const config = require('./content_config');

// Helper to ensure directory exists
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Read template
const layout = fs.readFileSync(path.join(__dirname, 'src/layouts/MainLayout.html'), 'utf-8');

// Generate Links for Footer
const servicesLinks = config.services_list.map(s => `<li><a href="${s.url}">${s.name}</a></li>`).join('\n');
const industriesLinks = config.industries_list.map(s => `<li><a href="${s.url}">${s.name}</a></li>`).join('\n');

// Mobile Bar Partial
const mobileBar = `
<div class="mobile-sticky-bar">
    <a href="${config.brand.phone_url}" class="sticky-btn call">
        <i class="ph-fill ph-phone-call"></i>
        <span>Call</span>
    </a>
    <a href="/book-consultation/" class="sticky-btn book">
        <i class="ph-fill ph-calendar-check"></i>
        <span>Book</span>
    </a>
    <a href="/lead-magnet-checklist/" class="sticky-btn magnet">
        <i class="ph-fill ph-download-simple"></i>
        <span>Checklist</span>
    </a>
</div>`;

// Build Function
function buildPage(pageData, outputPath) {
    let html = layout;

    // Calculate Relative Path for Assets
    const depth = outputPath.split('/').length - 2; // e.g. /index.html -> 0, /about/index.html -> 1
    const relativeRoot = depth > 0 ? '../'.repeat(depth).slice(0, -1) : '.';

    // Global Replacements
    html = html.replace(/{{title}}/g, pageData.title);
    html = html.replace(/{{description}}/g, pageData.description);
    html = html.replace(/{{path}}/g, pageData.path);
    html = html.replace(/{{base_path}}/g, relativeRoot);
    html = html.replace('{{schema}}', pageData.schema || '');
    html = html.replace('{{mobile_bar}}', mobileBar);
    html = html.replace('{{content}}', pageData.content);

    // Footer Replacements
    html = html.replace('{{services_links}}', servicesLinks);
    html = html.replace('{{industries_links}}', industriesLinks);
    html = html.replace('{{phone}}', config.brand.phone);
    html = html.replace('{{phone_url}}', config.brand.phone_url);
    html = html.replace(/{{email}}/g, config.brand.email);
    html = html.replace('{{address}}', config.brand.address);
    html = html.replace('{{city}}', config.brand.city);

    // Save
    const fullPath = path.join(__dirname, 'dist', outputPath);
    ensureDir(path.dirname(fullPath));
    fs.writeFileSync(fullPath, html);
    console.log(`Generated: ${outputPath}`);
}

// Read Content Files and Build
const contentDir = path.join(__dirname, 'src/content');
// Temporarily mock reading files for first pass, will implement actual file reading loop later
// For now, we'll manually define the pages in a list to iterate or read from JSONs
// In a real run, we read all .json files in src/content

// Just ensuring dist exists
ensureDir(path.join(__dirname, 'dist'));
ensureDir(path.join(__dirname, 'dist/assets/css'));
ensureDir(path.join(__dirname, 'dist/assets/js'));

// Header
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Copy All Assets
if (fs.existsSync(path.join(__dirname, 'src/assets'))) {
    copyRecursiveSync(
        path.join(__dirname, 'src/assets'),
        path.join(__dirname, 'dist/assets')
    );
}

module.exports = { buildPage };
