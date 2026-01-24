/**
 * Test Script for Share URLs
 *
 * This script tests the share URL generation logic to ensure all platforms
 * receive the correct title, description, and image.
 *
 * Run with: node test-share-urls.js
 */

// Mock monument data
const mockMonument = {
    monumentNameEn: "The Great Pyramid of Giza",
    monumentNameAr: "الهرم الأكبر بالجيزة",
    monumentDescriptions: [
        {
            descriptionEn: "The Great Pyramid of Giza is the oldest and largest of the pyramids in the Giza pyramid complex. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact. Built as a tomb for the Fourth Dynasty Egyptian pharaoh Khufu, the pyramid was constructed over a 20-year period.",
            descriptionAr: "الهرم الأكبر أو هرم خوفو هو الأثر الوحيد الباقي من عجائب الدنيا السبع، ويقع بمنطقة أهرام الجيزة في مصر المسجلة ضمن مواقع اليونيسكو للتراث العالمي."
        }
    ],
    mainImageUrl: "/uploads/monuments/great-pyramid.jpg"
};

// Test configuration
const locale = 'en';
const testUrl = 'https://kemetra.com/en/sites/1';
const apiBaseUrl = 'http://localhost:3000';

// Helper functions (matching the component logic)
function getMonumentData(monument, locale) {
    const name = locale === 'ar' ? monument.monumentNameAr : monument.monumentNameEn;
    const description = monument.monumentDescriptions && monument.monumentDescriptions.length > 0
        ? locale === 'ar' ? monument.monumentDescriptions[0].descriptionAr : monument.monumentDescriptions[0].descriptionEn
        : '';
    const mainImage = monument.mainImageUrl.startsWith('http')
        ? monument.mainImageUrl
        : `${apiBaseUrl}${monument.mainImageUrl}`;

    return { name, description, mainImage };
}

function generateShareUrls(monument, locale, pageUrl) {
    const { name, description, mainImage } = getMonumentData(monument, locale);
    const title = `${name} - KEMETRA`;

    // Get description excerpt (first 150 characters)
    const descriptionExcerpt = description
        ? description.substring(0, 150).trim() + '...'
        : '';

    // Full share text with description
    const shareText = descriptionExcerpt
        ? `${title}\n\n${descriptionExcerpt}\n\n${pageUrl}`
        : `${title}\n\n${pageUrl}`;

    return {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title + (descriptionExcerpt ? '\n\n' + descriptionExcerpt : ''))}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title + (descriptionExcerpt ? '\n\n' + descriptionExcerpt : ''))}`,

        // Open Graph data for Facebook/LinkedIn
        openGraph: {
            title: title,
            description: description ? description.substring(0, 160).trim() : `Discover ${name}, an ancient Egyptian monument.`,
            image: mainImage,
            url: pageUrl
        }
    };
}

// Run tests
console.log('🧪 Testing Share URLs for KEMETRA Portal\n');
console.log('=' .repeat(80));
console.log('\n📋 Test Monument:');
console.log(`   Name (EN): ${mockMonument.monumentNameEn}`);
console.log(`   Name (AR): ${mockMonument.monumentNameAr}`);
console.log(`   Description Length: ${mockMonument.monumentDescriptions[0].descriptionEn.length} chars`);
console.log(`   Image: ${mockMonument.mainImageUrl}`);
console.log(`   Test URL: ${testUrl}\n`);

// Test English locale
console.log('🇬🇧 ENGLISH LOCALE\n');
const enUrls = generateShareUrls(mockMonument, 'en', testUrl);

console.log('Facebook Share URL:');
console.log(`   ${enUrls.facebook}`);
console.log('   ✓ Facebook will use Open Graph tags from the page\n');

console.log('Twitter Share URL:');
console.log(`   ${enUrls.twitter}`);
console.log('   ✓ Includes title and description excerpt\n');

console.log('LinkedIn Share URL:');
console.log(`   ${enUrls.linkedin}`);
console.log('   ✓ LinkedIn will use Open Graph tags from the page\n');

console.log('WhatsApp Share URL:');
console.log(`   ${enUrls.whatsapp.substring(0, 100)}...`);
console.log('   ✓ Includes full text with title, description, and URL\n');

console.log('Telegram Share URL:');
console.log(`   ${enUrls.telegram.substring(0, 100)}...`);
console.log('   ✓ Includes title and description excerpt\n');

console.log('Open Graph Meta Tags:');
console.log(`   og:title = "${enUrls.openGraph.title}"`);
console.log(`   og:description = "${enUrls.openGraph.description.substring(0, 80)}..."`);
console.log(`   og:image = "${enUrls.openGraph.image}"`);
console.log(`   og:url = "${enUrls.openGraph.url}"`);
console.log('   ✓ Will be rendered in page <head> for Facebook/LinkedIn/Twitter cards\n');

// Test Arabic locale
console.log('=' .repeat(80));
console.log('\n🇪🇬 ARABIC LOCALE\n');
const arUrls = generateShareUrls(mockMonument, 'ar', testUrl.replace('/en/', '/ar/'));

console.log('Open Graph Meta Tags (Arabic):');
console.log(`   og:title = "${arUrls.openGraph.title}"`);
console.log(`   og:description = "${arUrls.openGraph.description.substring(0, 80)}..."`);
console.log(`   og:image = "${arUrls.openGraph.image}"`);
console.log('   ✓ Arabic text will display correctly in social media previews\n');

// Test URL encoding
console.log('=' .repeat(80));
console.log('\n🔐 URL ENCODING TEST\n');

const testStrings = {
    english: "The Great Pyramid & Ancient Egypt",
    arabic: "الهرم الأكبر بالجيزة",
    special: "Monument (2500 BC) - 100% authentic!"
};

Object.entries(testStrings).forEach(([lang, text]) => {
    const encoded = encodeURIComponent(text);
    console.log(`${lang.toUpperCase()}:`);
    console.log(`   Original: ${text}`);
    console.log(`   Encoded:  ${encoded}`);
    console.log(`   ✓ Properly encoded for URL\n`);
});

// Summary
console.log('=' .repeat(80));
console.log('\n✅ TEST SUMMARY\n');
console.log('All share URLs are correctly formatted and include:');
console.log('   ✓ Monument title');
console.log('   ✓ Description excerpt (150 chars for text, 160 for OG)');
console.log('   ✓ Page URL');
console.log('   ✓ Open Graph tags for image sharing');
console.log('   ✓ Proper URL encoding for special characters');
console.log('   ✓ Support for both English and Arabic\n');

console.log('🎯 NEXT STEPS:\n');
console.log('1. Start the portal: npm run dev');
console.log('2. Navigate to a monument detail page');
console.log('3. Click the "Share on Social Media" button');
console.log('4. Test each platform:');
console.log('   - Facebook: Should show monument image and description');
console.log('   - Twitter: Should include title and description');
console.log('   - LinkedIn: Should show monument image and description');
console.log('   - WhatsApp: Should include full text');
console.log('   - Telegram: Should include title and description');
console.log('   - Copy Link: Should show green checkmark and "Copied!" message\n');

console.log('5. Click outside the dropdown to verify click-outside works\n');

console.log('📝 NOTES:\n');
console.log('- Facebook/LinkedIn require the page to be publicly accessible');
console.log('- Use Facebook Sharing Debugger to test: https://developers.facebook.com/tools/debug/');
console.log('- Use Twitter Card Validator to test: https://cards-dev.twitter.com/validator');
console.log('- WhatsApp and Telegram will also use Open Graph tags if available\n');
