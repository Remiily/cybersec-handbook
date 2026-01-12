// Navigation Menu Generator
// Generates consistent navigation menu for all pages

function getBasePath() {
    const path = window.location.pathname;
    
    // Detectar si estamos en GitHub Pages con subdirectorio del repositorio
    // Ejemplo: /cybersec-handbook/hardening/cloud-hardening/aws-guide.html
    const repoName = 'cybersec-handbook';
    
    // Limpiar la ruta
    let cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
    
    // Si hay ruta del repositorio, extraerla
    if (cleanPath.startsWith(repoName + '/')) {
        cleanPath = cleanPath.substring(repoName.length + 1);
    } else if (cleanPath.includes('/' + repoName + '/')) {
        const repoIndex = cleanPath.indexOf('/' + repoName + '/');
        cleanPath = cleanPath.substring(repoIndex + repoName.length + 2);
    }
    
    // Si estamos en la raíz o index.html
    if (!cleanPath || cleanPath === 'index.html' || cleanPath.endsWith('/index.html')) {
        return './';
    }
    
    // Contar niveles de profundidad (número de directorios antes del archivo)
    const parts = cleanPath.split('/').filter(p => p && p !== 'index.html');
    // Si el último elemento es un archivo HTML, no cuenta como directorio
    const depth = parts.length > 0 && parts[parts.length - 1].endsWith('.html') 
        ? parts.length - 1 
        : parts.length;
    
    // Si depth es 0, estamos en la raíz
    if (depth === 0) {
        return './';
    }
    
    // Generar ruta relativa
    return '../'.repeat(depth);
}

function generateNavigation(currentPage = '') {
    const base = getBasePath();
    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    
    return `
        <nav class="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
            <a href="${isIndex ? 'index.html' : base + 'index.html'}" class="nav-link ${isIndex ? 'active' : ''} block px-3 py-2 rounded-lg ${isIndex ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}">
                🏠 Inicio
            </a>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Desarrollo de Carrera</h3>
                <a href="${base}career-development/career-paths.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Trayectorias Profesionales</a>
                <a href="${base}career-development/certifications-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Guía de Certificaciones</a>
                <a href="${base}career-development/soft-skills.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Habilidades Blandas</a>
                <a href="${base}career-development/interview-prep.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Preparación para Entrevistas</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Hardening (Curso Completo 0 a Experto)</h3>
                <a href="${base}hardening/fundamentos-hardening.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">📚 Módulo 1: Fundamentos</a>
                <a href="${base}hardening/os-hardening/linux-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">🐧 Módulo 2: Linux Hardening</a>
                <a href="${base}hardening/os-hardening/windows-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">🪟 Módulo 3: Windows Hardening</a>
                <a href="${base}hardening/servicios-hardening.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">🔧 Módulo 4: Servicios</a>
                <a href="${base}hardening/network-hardening.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">🌐 Módulo 5: Redes</a>
                <a href="${base}hardening/aplicaciones-hardening.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">📱 Módulo 6: Aplicaciones</a>
                <a href="${base}hardening/automatizacion-hardening.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">🤖 Módulo 7: Automatización</a>
                <a href="${base}hardening/benchmarks-application.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">✅ Módulo 8: Compliance</a>
                <a href="${base}hardening/cloud-hardening/aws-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">☁️ AWS Hardening</a>
                <a href="${base}hardening/cloud-hardening/azure-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">☁️ Azure Hardening</a>
                <a href="${base}hardening/cloud-hardening/gcp-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">☁️ GCP Hardening</a>
                <a href="${base}hardening/containers-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">🐳 Containers (Docker/K8s)</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Gobierno, Riesgo y Cumplimiento</h3>
                <a href="${base}governance-risk-compliance/ciso-roadmap.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Roadmap a CISO</a>
                <a href="${base}governance-risk-compliance/frameworks-implementation.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Implementación de Frameworks</a>
                <a href="${base}governance-risk-compliance/risk-assessment-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Evaluación de Riesgos</a>
                <a href="${base}governance-risk-compliance/compliance-checks.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Verificación de Cumplimiento</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Sistemas Operativos</h3>
                <a href="${base}operating-systems/linux/linux-essentials.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Linux Esencial</a>
                <a href="${base}operating-systems/ubuntu/ubuntu-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Ubuntu</a>
                <a href="${base}operating-systems/fedora/fedora-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Fedora</a>
                <a href="${base}operating-systems/rhel/rhel-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">RHEL/CentOS</a>
                <a href="${base}operating-systems/debian/debian-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Debian</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Programación</h3>
                <a href="${base}programming/python/python-security-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Python</a>
                <a href="${base}programming/javascript/javascript-security-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">JavaScript</a>
                <a href="${base}programming/go/go-security-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Go</a>
                <a href="${base}programming/powershell/powershell-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">PowerShell</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Desarrollo Seguro</h3>
                <a href="${base}secure-development/owasp/owasp-top-10-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">OWASP Top 10</a>
                <a href="${base}secure-development/secure-coding-practices/secure-coding-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Prácticas de Código Seguro</a>
                <a href="${base}secure-development/code-review/code-review-checklist.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Checklist Code Review</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Bases de Datos</h3>
                <a href="${base}databases/mysql/mysql-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">MySQL</a>
                <a href="${base}databases/postgresql/postgresql-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">PostgreSQL</a>
                <a href="${base}databases/mongodb/mongodb-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">MongoDB</a>
                <a href="${base}databases/redis/redis-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Redis</a>
                <a href="${base}databases/elasticsearch/elasticsearch-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Elasticsearch</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Security Architecture</h3>
                <a href="${base}security-architecture/zero-trust-setup.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Zero Trust Setup</a>
                <a href="${base}security-architecture/iam-implementation.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">IAM Implementation</a>
                <a href="${base}security-architecture/network-segmentation-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Network Segmentation</a>
                <a href="${base}security-architecture/design-best-practices.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Design Best Practices</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Vulnerability Management</h3>
                <a href="${base}vulnerability-management/scanning-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Vulnerability Scanning</a>
                <a href="${base}vulnerability-management/patching-process.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Patching Process</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Pentesting</h3>
                <a href="${base}pentesting-offensive/web-security-quick-check.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Pentesting Rápido Web</a>
                <a href="${base}pentesting-offensive/methodology-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Metodología Pentesting</a>
                <a href="${base}pentesting-offensive/tools-setup.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Herramientas</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Red Team</h3>
                <a href="${base}red-team/tactics-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Tactics Guide</a>
                <a href="${base}red-team/c2-setup.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">C2 Setup</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Blue Team Defense</h3>
                <a href="${base}blue-team-defense/soc-setup.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">SOC Setup</a>
                <a href="${base}blue-team-defense/siem-config.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">SIEM Configuration</a>
                <a href="${base}blue-team-defense/threat-hunting.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Threat Hunting</a>
                <a href="${base}blue-team-defense/detection-rules.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Detection Rules</a>
                <a href="${base}blue-team-defense/hunting-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Hunting Guide</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Incident Response & Forensics</h3>
                <a href="${base}incident-response-forensics/ir-process.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">IR Process</a>
                <a href="${base}incident-response-forensics/forensics-tools.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Forensics Tools</a>
                <a href="${base}incident-response-forensics/forensics-tools-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Forensics Tools Guide</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Cloud & DevSecOps</h3>
                <a href="${base}cloud-devsecops/iac-secure-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">IaC Secure Guide</a>
                <a href="${base}cloud-devsecops/pipeline-security.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Pipeline Security</a>
                <a href="${base}cloud-devsecops/sbom-management.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">SBOM Management</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Emerging Threats</h3>
                <a href="${base}emerging-threats/ai-security-guide.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">AI Security</a>
                <a href="${base}emerging-threats/supply-chain-defense.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Supply Chain Defense</a>
            </div>
            
            <div class="mt-4">
                <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Recursos</h3>
                <a href="${base}resources/cheatsheets-collection/index.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Colección de Cheatsheets</a>
                <a href="${base}resources/tools-recommendations.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Herramientas Recomendadas</a>
                <a href="${base}resources/quick-guides.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Guías Rápidas</a>
                <a href="${base}resources/exam-preparation.html" class="nav-link block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">Preparación Exámenes</a>
            </div>
        </nav>
    `;
}

// Function to highlight current page in navigation
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath.endsWith(href) || currentPath.includes(href.replace('../', '').replace('./', '')))) {
            link.classList.add('bg-blue-50', 'dark:bg-blue-900/20', 'text-blue-700', 'dark:text-blue-300', 'font-medium');
            link.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-800');
        }
    });
}
