// Main JavaScript para Cybersec Handbook

// Gestión del tema oscuro/claro
function initTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeToggle(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.innerHTML = theme === 'dark' 
      ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>'
      : '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>';
  }
}

// Gestión del sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) {
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

// Cerrar sidebar al hacer click fuera (móvil)
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  
  if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !sidebarToggle?.contains(e.target)) {
      closeSidebar();
    }
  }
});

// Copiar al portapapeles
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
    button.classList.add('text-green-500');
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('text-green-500');
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar:', err);
  });
}

// Agregar botones de copiar a todos los bloques de código
function initCopyButtons() {
  document.querySelectorAll('pre code').forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    if (!pre.querySelector('.copy-btn')) {
      const button = document.createElement('button');
      button.className = 'copy-btn bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 dark:hover:bg-gray-600';
      button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
      button.onclick = () => copyToClipboard(codeBlock.textContent, button);
      pre.style.position = 'relative';
      pre.appendChild(button);
    }
  });
}

// Generar tabla de contenidos automáticamente
function generateTOC() {
  const tocContainer = document.getElementById('table-of-contents');
  if (!tocContainer) return;

  const headings = document.querySelectorAll('article h2, article h3');
  if (headings.length === 0) {
    tocContainer.style.display = 'none';
    return;
  }

  let tocHTML = '<ul class="space-y-1">';
  headings.forEach((heading, index) => {
    const id = heading.id || `heading-${index}`;
    if (!heading.id) heading.id = id;
    
    const level = heading.tagName === 'H2' ? '' : 'ml-4';
    const text = heading.textContent;
    tocHTML += `<li class="${level}"><a href="#${id}" class="hover:text-blue-500 transition-colors">${text}</a></li>`;
  });
  tocHTML += '</ul>';
  
  tocContainer.innerHTML = tocHTML;
}

// Breadcrumbs dinámicos
function generateBreadcrumbs() {
  const breadcrumbContainer = document.getElementById('breadcrumbs');
  if (!breadcrumbContainer) return;

  const path = window.location.pathname;
  const parts = path.split('/').filter(p => p && p !== 'index.html');
  
  // Calcular nivel de profundidad para rutas relativas
  const depth = parts.length - (parts[parts.length - 1] && parts[parts.length - 1].endsWith('.html') ? 1 : 0);
  const basePath = depth > 0 ? '../'.repeat(depth) : './';
  
  // Si está en la raíz, usar ruta absoluta
  const homePath = depth === 0 ? '/' : basePath.replace(/\.\.\//g, '').replace(/\.\//, '/');
  
  let breadcrumbHTML = `<a href="${homePath}" class="hover:underline">Inicio</a>`;
  
  // Si no hay partes adicionales, no mostrar más breadcrumbs
  if (parts.length === 0 || (parts.length === 1 && parts[0].endsWith('.html'))) {
    breadcrumbContainer.innerHTML = breadcrumbHTML;
    return;
  }
  
  // Construir breadcrumbs para cada nivel
  let currentRelativePath = basePath;
  parts.forEach((part, index) => {
    if (part.endsWith('.html')) {
      // Último elemento, mostrar sin enlace
      const label = part.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      breadcrumbHTML += ` <span class="mx-2">/</span> <span class="text-gray-600 dark:text-gray-400">${label}</span>`;
    } else {
      const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
      const isLast = index === parts.length - 1;
      
      breadcrumbHTML += ` <span class="mx-2">/</span> `;
      
      if (isLast && !parts[index + 1]) {
        breadcrumbHTML += `<span class="text-gray-600 dark:text-gray-400">${label}</span>`;
      } else {
        // Calcular ruta relativa para este nivel
        const relPath = '../'.repeat(parts.length - index - 1) + part + '/';
        breadcrumbHTML += `<a href="${relPath}" class="hover:underline">${label}</a>`;
      }
    }
  });
  
  breadcrumbContainer.innerHTML = breadcrumbHTML;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCopyButtons();
  generateTOC();
  generateBreadcrumbs();
  
  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          closeSidebar();
        }
      }
    });
  });
});

// Exportar funciones globales
window.toggleTheme = toggleTheme;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.copyToClipboard = copyToClipboard;
