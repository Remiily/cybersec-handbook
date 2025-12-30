// Búsqueda con Lunr.js

let lunrIndex = null;
let searchData = [];

// Inicializar búsqueda
async function initSearch() {
  // Cargar Lunr.js si no está disponible
  if (typeof lunr === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lunr@2.3.9/lunr.min.js';
    script.onload = buildSearchIndex;
    document.head.appendChild(script);
  } else {
    buildSearchIndex();
  }
}

function buildSearchIndex() {
  // Datos de búsqueda - en producción, esto podría cargarse desde un JSON
  searchData = getSearchData();
  
  // Construir índice Lunr
  lunrIndex = lunr(function () {
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('content', { boost: 5 });
    this.field('category');
    this.field('tags');
    
    searchData.forEach((doc) => {
      this.add(doc);
    });
  });
}

function getSearchData() {
  // Extraer datos de búsqueda de la página actual y estructura del sitio
  const data = [];
  
  // Agregar páginas principales
  const pages = [
    { id: 'index', title: 'Inicio', content: 'Guía profesional de ciberseguridad', category: 'General', path: '/' },
    { id: 'hardening', title: 'System Hardening', content: 'Guía completa de hardening de sistemas', category: 'Hardening', path: '/hardening/' },
    { id: 'hardening-fundamentals', title: 'Fundamentos de Hardening', content: 'Conceptos básicos y fundamentos teóricos', category: 'Hardening', path: '/hardening/fundamentals/' },
    { id: 'hardening-windows', title: 'Hardening de Windows', content: 'Guía de hardening para Windows 10, 11 y Server', category: 'Hardening', path: '/hardening/os/windows/' },
    { id: 'hardening-linux', title: 'Hardening de Linux', content: 'Guía de hardening para distribuciones Linux', category: 'Hardening', path: '/hardening/os/linux/' },
    { id: 'hardening-benchmarks', title: 'Benchmarks y Estándares', content: 'CIS, NIST, DISA STIG, ANSI/ISA', category: 'Hardening', path: '/hardening/benchmarks/' },
    { id: 'hardening-tools', title: 'Herramientas de Hardening', content: 'Lynis, OpenSCAP, Ansible, Chef InSpec', category: 'Hardening', path: '/hardening/tools/' },
  ];
  
  data.push(...pages);
  
  return data;
}

function performSearch(query) {
  if (!lunrIndex || !query || query.length < 2) {
    return [];
  }
  
  try {
    const results = lunrIndex.search(query);
    return results.map(result => {
      const doc = searchData.find(d => d.id === result.ref);
      return {
        ...doc,
        score: result.score
      };
    }).filter(doc => doc !== undefined);
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return [];
  }
}

function displaySearchResults(results, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (results.length === 0) {
    container.innerHTML = '<p class="p-4 text-center text-gray-500">No se encontraron resultados</p>';
    return;
  }
  
  let html = '<div class="space-y-2">';
  results.slice(0, 10).forEach(result => {
    html += `
      <a href="${result.path}" class="block p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <div class="font-semibold text-blue-600 dark:text-blue-400">${result.title}</div>
        <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">${result.category}</div>
      </a>
    `;
  });
  html += '</div>';
  
  container.innerHTML = html;
}

// Event listener para búsqueda
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (searchInput && searchResults) {
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        searchResults.innerHTML = '';
        searchResults.classList.add('hidden');
        return;
      }
      
      searchTimeout = setTimeout(() => {
        const results = performSearch(query);
        displaySearchResults(results, 'search-results');
        searchResults.classList.remove('hidden');
      }, 300);
    });
    
    // Cerrar resultados al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
      }
    });
  }
});

// Exportar funciones
window.performSearch = performSearch;
window.displaySearchResults = displaySearchResults;
