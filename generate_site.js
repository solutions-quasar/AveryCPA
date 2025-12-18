const { buildPage } = require('./build');
const config = require('./content_config');

function generateSchema(type, data) {
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": type,
        "name": config.brand.name,
        "url": "https://averycpa.ca",
        "telephone": config.brand.phone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": config.brand.address,
            "addressLocality": config.brand.city,
            "addressRegion": "NB",
            "postalCode": config.brand.postal,
            "addressCountry": "CA"
        }
    };
    if (type === 'FAQPage') return JSON.stringify(data); // Direct injection for FAQ
    return `<script type="application/ld+json">${JSON.stringify({ ...baseSchema, ...data })}</script>`;
}

// Helper to generate dense service content
function generateServiceContent(serviceName, url) {
    return `
        <section class="page-hero">
            <div class="container">
                <h1>${serviceName} Services in Moncton</h1>
                <p>Professional, reliable, and compliant ${serviceName.toLowerCase()} solutions for New Brunswick businesses.</p>
                <div class="hero-btns">
                    <a href="/book-consultation/" class="btn-primary">Book Free Consultation</a>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container" style="display: grid; grid-template-columns: 2fr 1fr; gap: 4rem;">
                <div class="main-content">
                    <h2>Expert ${serviceName} for Local Growth</h2>
                    <p>At Avery & Associates, we understand that managing <strong>${serviceName.toLowerCase()}</strong> is one of the most critical yet time-consuming aspects of running a business in Moncton. Whether you are a small contractor or a growing retail business, our team ensures your financials are accurate and CRA-compliant.</p>
                    
                    <h3 style="margin-top: 2rem;">What We Offer</h3>
                    <ul class="check-list" style="margin-bottom: 2rem;">
                        <li><strong>Complete Accuracy:</strong> We double-check every figure to ensure your ${serviceName.toLowerCase()} is error-free.</li>
                        <li><strong>Timely Reporting:</strong> Never miss a deadline with our proactive reminders.</li>
                        <li><strong>Strategic Advice:</strong> We don't just record numbers; we help you understand them.</li>
                    </ul>

                    <h3>Why Choose Avery & Associates?</h3>
                    <p>We have served the Greater Moncton area since 2009. Our team is familiar with New Brunswick specific tax laws and regulations, ensuring you get every deduction you are entitled to.</p>
                    
                    <h3>Frequently Asked Questions</h3>
                    <div class="faq-block">
                        <details>
                            <summary>Why do I need professional ${serviceName.toLowerCase()}?</summary>
                            <p>Professional oversight prevents costly errors, saves you time, and ensures you stay compliant with the CRA.</p>
                        </details>
                        <details>
                            <summary>How much does this service cost?</summary>
                            <p>Our fees are tailored to your business size and complexity. Contact us for a free quote.</p>
                        </details>
                        <details>
                            <summary>Can you handle back-taxes?</summary>
                            <p>Yes, we can help you get caught up and file previous years' returns.</p>
                        </details>
                    </div>
                </div>
                <aside class="sidebar" style="position: sticky; top: 100px; height: fit-content;">
                    <div class="magnet-box">
                        <h4>Free Tax Checklist</h4>
                        <p>Are you missing deductions?</p>
                        <a href="/lead-magnet-checklist/" class="btn-primary full-width">Download PDF</a>
                    </div>
                    <div style="margin-top: 2rem; padding: 2rem; background: #F8FAFC; border-radius: 8px;">
                        <h4>Ready to talk?</h4>
                        <p>Book a free 15-min discovery call.</p>
                        <a href="/book-consultation/" class="btn-outline-dark full-width">Schedule Now</a>
                    </div>
                </aside>
            </div>
        </section>
    `;
}

// Generate Industry Content
function generateIndustryContent(industryName) {
    return `
        <section class="page-hero">
            <div class="container">
                <h1>Accounting for ${industryName}</h1>
                <p>Specialized financial advice for Moncton's ${industryName.toLowerCase()} sector.</p>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <h2>Tailored Solutions for ${industryName}</h2>
                <p>The ${industryName.toLowerCase()} industry has unique financial challenges. From cash flow management to specific tax credits, Avery & Associates has the expertise to guide you.</p>
                <div style="margin-top: 2rem;">
                    <a href="/book-consultation/" class="btn-primary">Get Industry-Specific Advice</a>
                </div>
            </div>
        </section>
    `;
}

// Define Pages
const pages = [
    {
        path: "/index.html",
        title: "CPA Moncton | Avery & Associates",
        description: "Expert CPA firm in Moncton offering accounting, bookkeeping, and tax services for small businesses.",
        schema: generateSchema('AccountingService', {
            "image": "https://averycpa.ca/assets/images/office.jpg",
            "priceRange": "$$"
        }),
        content: `
            <section class="page-hero">
                <div class="container">
                    <h1>Avery & Associates CPA</h1>
                    <p class="lead">Professional Accounting & Tax Services in Moncton, NB</p>
                    <div class="hero-btns">
                        <a href="/book-consultation/" class="btn-primary">Book Free Consultation</a>
                        <a href="/lead-magnet-checklist/" class="btn-outline-light" style="margin-left: 1rem; border: 1px solid rgba(255,255,255,0.3); padding: 0.75rem 1.5rem; border-radius: 4px; color: white; backdrop-filter: blur(5px);">Get Tax Checklist</a>
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container text-center">
                    <h2>Our Services</h2>
                    <p style="max-width: 600px; margin: 0 auto 2rem;">We provide comprehensive financial solutions tailored to your business needs.</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; text-align: left;">
                        ${config.services_list.map(s => `
                            <div style="padding: 2rem; border: 1px solid #E2E8F0; border-radius: 8px; background: white; transition: 0.2s;" onmouseover="this.style.borderColor='#D4AF37'" onmouseout="this.style.borderColor='#E2E8F0'">
                                <h3 style="font-size: 1.5rem;">${s.name}</h3>
                                <p style="font-size: 0.9rem; color: #64748B;">Professional ${s.name.toLowerCase()} services tailored for Moncton businesses.</p>
                                <a href="${s.url}" style="color: #D4AF37; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;">Learn More <i class="ph-bold ph-arrow-right"></i></a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            <section class="section bg-light" style="background: #F8FAFC;">
                <div class="container">
                    <div class="magnet-box">
                        <h2>Free Small Business Tax Checklist</h2>
                        <p>Don't miss a deduction. Download our detailed New Brunswick checklist.</p>
                        <a href="/lead-magnet-checklist/" class="btn-primary">Download Now</a>
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                        <div>
                            <h2>More Than Just Accountants</h2>
                            <p>At Avery & Associates, we build lasting relationships. Located in the heart of Moncton, our team is dedicated to providing personalized financial advice that goes beyond the spreadsheet.</p>
                            
                            <ul class="check-list" style="margin: 2rem 0;">
                                <li><strong>Over 15 years</strong> of local experience</li>
                                <li><strong>Personalized,</strong> one-on-one service</li>
                                <li><strong>Proactive</strong> tax saving strategies</li>
                            </ul>
                            
                            <p style="font-weight: 500; color: #0F172A; margin-top: 2rem;">Joe Avery <span style="font-weight: 400; color: #64748B;">Principal CPA</span></p>
                        </div>
                        <div style="position: relative;">
                            <!-- Placeholder grey box replaced with actual image -->
                            <img src="/assets/images/portrait.png" alt="Joe Avery, Principal CPA" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        </div>
                    </div>
                </div>
            </section>
        `
    },
    // Service Pages
    ...config.services_list.map(s => ({
        path: `${s.url}index.html`,
        title: `${s.name} Moncton | Avery CPA`,
        description: `Professional ${s.name} services in Moncton, New Brunswick. Contact Avery & Associates for a consultation.`,
        schema: generateSchema('Service', { "serviceType": s.name }),
        content: generateServiceContent(s.name, s.url)
    })),
    // Industry Pages
    ...config.industries_list.map(i => ({
        path: `${i.url}index.html`,
        title: `Accounting for ${i.name} Moncton | Avery CPA`,
        description: `Specialized accounting services for ${i.name} in Moncton. maximizing deductions and compliance.`,
        schema: generateSchema('Service', { "serviceType": `Accounting for ${i.name}` }),
        content: generateIndustryContent(i.name)
    })),
    // Core Pages
    {
        path: "/about/index.html",
        title: "About Us | Avery & Associates CPA",
        description: "Learn about Avery & Associates, a team of Chartered Professional Accountants in Moncton dedicated to your business growth.",
        content: `
            <section class="page-hero">
                <div class="container"><h1>About Us</h1></div>
            </section>
            <section class="section">
                <div class="container">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                        <div>
                            <h2>Serving Greater Moncton since 2009</h2>
                            <p>Avery & Associates was founded with a simple mission: to provide big-firm expertise with the personal touch of a local partner. We understand that behind every financial statement is a family, a business, and a dream.</p>
                            <p>Our team of Chartered Professional Accountants brings decades of experience in tax planning, business advisory, and financial reporting.</p>
                            
                            <h3 style="margin-top: 2rem;">Meet the Principal</h3>
                            <p><strong>Joe Avery, CPA</strong> leads the firm with a focus on proactive tax strategies. He believes in meeting clients where they are and guiding them to financial stability.</p>
                        </div>
                        <div style="text-align: center;">
                            <img src="/assets/images/joe_avery.jpg" alt="Joe Avery, CPA" style="border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); max-width: 100%; height: auto;">
                        </div>
                    </div>
                </div>
            </section>
        `
    },
    {
        path: "/contact/index.html",
        title: "Contact Us | Avery CPA Moncton",
        description: "Get in touch with Avery & Associates. 101 – 50 Cameron Street, Moncton.",
        content: `
            <section class="page-hero"><div class="container"><h1>Contact Us</h1></div></section>
            <section class="section">
                <div class="container">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;">
                        <div>
                            <h2>Get in Touch</h2>
                            <p><strong>Phone:</strong> <a href="tel:5068542199">(506) 854-2199</a></p>
                            <p><strong>Email:</strong> info@averycga.ca</p>
                            <p><strong>Address:</strong> 101 – 50 Cameron Street, Moncton, NB</p>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1774.921609356372!2d-64.7951166838967!3d46.08945699824673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0b92e10555555%3A0x1234567890!2s50%20Cameron%20St%2C%20Moncton%2C%20NB%20E1C%205Y3!5e0!3m2!1sen!2sca!4v1625686000000!5m2!1sen!2sca" width="100%" height="300" style="border:0; margin-top: 1rem;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                        <div class="contact-form-card" style="padding: 2rem; border: 1px solid #E2E8F0; border-radius: 8px;">
                            <h3>Send a Message</h3>
                            <form>
                                <input type="text" placeholder="Name" style="width: 100%; margin-bottom: 1rem; padding: 0.5rem;">
                                <input type="email" placeholder="Email" style="width: 100%; margin-bottom: 1rem; padding: 0.5rem;">
                                <textarea rows="4" placeholder="Message" style="width: 100%; margin-bottom: 1rem; padding: 0.5rem;"></textarea>
                                <button class="btn-primary full-width">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `
    },
    {
        path: "/lead-magnet-checklist/index.html",
        title: "Free Tax Checklist Download",
        description: "Download our essential Small Business Tax & Bookkeeping Checklist for New Brunswick businesses.",
        content: `
             <section class="page-hero">
                <div class="container"><h1>Download Your Free Tax Checklist</h1></div>
            </section>
            <section class="section">
                <div class="container" style="max-width: 600px;">
                    <div class="magnet-box">
                        <h3>Get the PDF instantly</h3>
                        <form style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
                            <input type="text" placeholder="Your Name" style="padding: 0.75rem; border: 1px solid #CBD5E1; border-radius: 4px;">
                            <input type="email" placeholder="Your Email" style="padding: 0.75rem; border: 1px solid #CBD5E1; border-radius: 4px;">
                            <select style="padding: 0.75rem; border: 1px solid #CBD5E1; border-radius: 4px;">
                                <option>Incorporated Business</option>
                                <option>Sole Proprietor</option>
                                <option>Personal Only</option>
                            </select>
                            <button type="button" onclick="alert('Checklist sent!')" class="btn-primary">Send Me the Checklist</button>
                        </form>
                    </div>
                </div>
            </section>
        `
    },
    // Legal Pages
    { path: "/privacy-policy/index.html", title: "Privacy Policy", content: "<section class='section'><div class='container'><h1>Privacy Policy</h1><p>Standard privacy policy placeholder.</p></div></section>" },
    { path: "/terms-of-service/index.html", title: "Terms of Service", content: "<section class='section'><div class='container'><h1>Terms of Service</h1><p>Standard terms placeholder.</p></div></section>" },
    { path: "/accessibility/index.html", title: "Accessibility", content: "<section class='section'><div class='container'><h1>Accessibility</h1><p>We are committed to accessibility.</p></div></section>" },
    // Book Consultation
    {
        path: "/book-consultation/index.html",
        title: "Book Consultation",
        content: `
            <section class="page-hero"><div class="container"><h1>Book a Free Consultation</h1></div></section>
            <section class="section text-center">
                <div class="container">
                    <p>Schedule your 30-minute discovery call below.</p>
                    <div style="background: #F1F5F9; padding: 4rem; width: 100%; height: 600px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: #64748B;">[Calendly Embed Code Would Go Here]</span>
                    </div>
                </div>
            </section>
        `
    }
];

// Generate Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(p => `
    <url>
        <loc>https://averycpa.ca${p.path.replace('index.html', '')}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
    </url>`).join('')}
</urlset>`;

// Generate Robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: https://averycpa.ca/sitemap.xml`;

// Execute Build
pages.forEach(page => buildPage(page, page.path));
require('fs').writeFileSync(require('path').join(__dirname, 'dist/sitemap.xml'), sitemap);
require('fs').writeFileSync(require('path').join(__dirname, 'dist/robots.txt'), robots);
console.log('Build Complete: Pages, Sitemap, Robots.txt generated.');
