// CyberSec Handbook - Main JavaScript

// Initialize Alpine.js data
document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    sidebarOpen: false,
    darkMode: localStorage.getItem('darkMode') === 'true' || (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches),
    searchQuery: '',
    searchResults: [],
    showSearchResults: false,
    
    init() {
      // Apply dark mode
      this.updateDarkMode();
      
      // Initialize search index (will be populated by search.js)
      if (typeof initSearch !== 'undefined') {
        initSearch();
      }
      
      // Load checklist progress
      this.loadChecklistProgress();
      
      // Close sidebar on mobile when clicking outside
      if (window.innerWidth < 1024) {
        document.addEventListener('click', (e) => {
          const sidebar = document.querySelector('.sidebar');
          const overlay = document.querySelector('.sidebar-overlay');
          if (this.sidebarOpen && sidebar && !sidebar.contains(e.target) && 
              !e.target.closest('[x-on\\:click*="toggleSidebar"]') &&
              !e.target.closest('.sidebar-toggle')) {
            this.sidebarOpen = false;
            if (overlay) overlay.classList.remove('active');
          }
        });
      }
    },
    
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      if (sidebar) {
        if (this.sidebarOpen) {
          sidebar.classList.add('open');
          if (overlay) overlay.classList.add('active');
        } else {
          sidebar.classList.remove('open');
          if (overlay) overlay.classList.remove('active');
        }
      }
    },
    
    closeSidebar() {
      this.sidebarOpen = false;
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
    },
    
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      this.updateDarkMode();
      localStorage.setItem('darkMode', this.darkMode);
    },
    
    updateDarkMode() {
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    
    handleSearch(event) {
      const query = event.target.value.trim();
      this.searchQuery = query;
      
      if (query.length < 2) {
        this.searchResults = [];
        this.showSearchResults = false;
        return;
      }
      
      if (typeof searchContent !== 'undefined') {
        const results = searchContent(query);
        this.searchResults = results.slice(0, 10); // Limit to 10 results
        this.showSearchResults = results.length > 0;
      }
    },
    
    loadChecklistProgress() {
      document.querySelectorAll('.checklist-container').forEach(container => {
        const checklistId = container.dataset.checklistId;
        if (!checklistId) return;
        
        const saved = localStorage.getItem(`checklist-${checklistId}`);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            data.forEach((checked, index) => {
              const checkbox = container.querySelectorAll('input[type="checkbox"]')[index];
              if (checkbox) {
                checkbox.checked = checked;
              }
            });
            updateChecklistProgress(container);
          } catch (e) {
            console.error('Error loading checklist:', e);
          }
        }
      });
    }
  }));
  
  // Copy to clipboard functionality
  Alpine.data('copyCommand', () => ({
    copied: false,
    
    async copy(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }));
});

// Checklist functionality - global functions
window.handleChecklistChange = function(event, container) {
  const checklistId = container.dataset.checklistId;
  if (!checklistId) return;
  
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  const checked = Array.from(checkboxes).map(cb => cb.checked);
  
  localStorage.setItem(`checklist-${checklistId}`, JSON.stringify(checked));
  updateChecklistProgress(container);
};

window.resetChecklist = function(container) {
  const checklistId = container.dataset.checklistId;
  if (!checklistId) return;
  
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = false);
  localStorage.removeItem(`checklist-${checklistId}`);
  updateChecklistProgress(container);
};

window.exportChecklist = function(container) {
  const checklistId = container.dataset.checklistId;
  if (!checklistId) return;
  
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  const items = Array.from(checkboxes).map((cb) => ({
    label: cb.nextElementSibling ? cb.nextElementSibling.textContent.trim() : '',
    checked: cb.checked
  }));
  
  const data = {
    checklistId: checklistId,
    items: items,
    exportedAt: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `checklist-${checklistId}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Update checklist progress
function updateChecklistProgress(container) {
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
  const total = checkboxes.length;
  const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
  
  const progressBar = container.querySelector('.progress-fill');
  const progressText = container.querySelector('.progress-text');
  
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
  
  if (progressText) {
    progressText.textContent = `${checked}/${total} completado (${percentage}%)`;
  }
}

// Generate table of contents from headings
function generateTOC() {
  const tocContainer = document.getElementById('table-of-contents');
  if (!tocContainer) return;
  
  const article = document.querySelector('article');
  if (!article) return;
  
  const headings = article.querySelectorAll('h2, h3');
  if (headings.length === 0) {
    tocContainer.style.display = 'none';
    return;
  }
  
  let tocHTML = '<h3>📋 Tabla de Contenidos</h3><ul>';
  
  headings.forEach((heading) => {
    // Generate ID from text if not present
    let id = heading.id;
    if (!id) {
      id = heading.textContent
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      heading.id = id;
    }
    
    const level = heading.tagName.toLowerCase();
    const text = heading.textContent.trim();
    const levelClass = level === 'h2' ? 'level-2' : 'level-3';
    
    tocHTML += `<li><a href="#${id}" class="${levelClass}">${text}</a></li>`;
  });
  
  tocHTML += '</ul>';
  tocContainer.innerHTML = tocHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  generateTOC();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Close sidebar on mobile after navigation
        if (window.innerWidth < 1024) {
          const app = Alpine.$data(document.querySelector('[x-data="app"]'));
          if (app) app.closeSidebar();
        }
      }
    });
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      if (sidebar) sidebar.classList.add('open');
      if (overlay) overlay.classList.remove('active');
    }
  });
});
