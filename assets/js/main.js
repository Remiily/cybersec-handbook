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
    },
    
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    
    closeSidebar() {
      this.sidebarOpen = false;
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
            this.updateChecklistProgress(container);
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
});

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
  
  const headings = document.querySelectorAll('article h2, article h3');
  if (headings.length === 0) {
    tocContainer.style.display = 'none';
    return;
  }
  
  let tocHTML = '<ul>';
  headings.forEach((heading, index) => {
    const id = heading.id || `heading-${index}`;
    if (!heading.id) {
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
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('[x-on\\:click*="toggleSidebar"]');
    
    if (sidebar && sidebarToggle && window.innerWidth < 768) {
      if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('open')) {
        // Close sidebar
        Alpine.store('app')?.closeSidebar?.();
      }
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

