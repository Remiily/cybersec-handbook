// CyberSec Handbook - Search functionality using MiniSearch

let searchIndex = null;

// Initialize search index
async function initSearch() {
  try {
    // Load search data (will be populated from pages)
    const response = await fetch('/cybersec-handbook/search-data.json');
    if (response.ok) {
      const searchData = await response.json();
      
      // Initialize MiniSearch from CDN
      if (typeof MiniSearch !== 'undefined') {
        searchIndex = new MiniSearch({
          fields: ['title', 'content', 'category', 'tags'],
          storeFields: ['title', 'url', 'category', 'excerpt']
        });
        
        searchIndex.addAll(searchData);
      }
    }
  } catch (e) {
    console.log('Search data not available, search will be limited');
    // Fallback: create empty index
    if (typeof MiniSearch !== 'undefined') {
      searchIndex = new MiniSearch({
        fields: ['title', 'content', 'category', 'tags'],
        storeFields: ['title', 'url', 'category', 'excerpt']
      });
    }
  }
}

// Search function
function searchContent(query) {
  if (!searchIndex) {
    // Fallback: simple client-side search
    return simpleSearch(query);
  }
  
  try {
    const results = searchIndex.search(query, {
      fuzzy: 0.2,
      prefix: true,
      boost: { title: 2, category: 1.5 }
    });
    
    return results.map(result => ({
      title: result.title,
      url: result.url,
      category: result.category,
      excerpt: result.excerpt || ''
    }));
  } catch (e) {
    console.error('Search error:', e);
    return simpleSearch(query);
  }
}

// Simple fallback search
function simpleSearch(query) {
  const results = [];
  const lowerQuery = query.toLowerCase();
  
  // Search in current page headings
  document.querySelectorAll('h1, h2, h3').forEach(heading => {
    if (heading.textContent.toLowerCase().includes(lowerQuery)) {
      const id = heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-');
      results.push({
        title: heading.textContent.trim(),
        url: `#${id}`,
        category: 'Página actual',
        excerpt: ''
      });
    }
  });
  
  return results;
}

// Build search data from pages (can be run during build)
function extractSearchData(content, url, title) {
  // Extract text content (strip HTML)
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const textContent = tempDiv.textContent || tempDiv.innerText || '';
  
  // Extract headings for excerpt
  const headings = Array.from(tempDiv.querySelectorAll('h2, h3')).slice(0, 3).map(h => h.textContent).join(' | ');
  
  return {
    id: url,
    title: title,
    url: url,
    content: textContent.substring(0, 5000), // Limit content size
    category: url.split('/')[0] || 'General',
    excerpt: headings || textContent.substring(0, 150),
    tags: [] // Can be extracted from meta tags
  };
}

