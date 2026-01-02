# 🛡️ CyberSec Handbook

Mi guía práctica y profesional de ciberseguridad, diseñada como un recurso personal que me acompaña en toda mi carrera, desde proyectos iniciales como hardening hasta roles de liderazgo.

## 📖 Descripción

Este handbook es un manual estructurado con:
- ✅ Guías paso a paso detalladas
- ✅ Comandos con parámetros explicados
- ✅ Checklists interactivos con persistencia
- ✅ Herramientas esenciales y recomendaciones
- ✅ Cheatsheets integrados para cada tema
- ✅ Enfoque hands-on y escalable

## 🚀 Características

- **100% Estático**: Compatible con GitHub Pages
- **Diseño Moderno**: Tailwind CSS + Alpine.js
- **Modo Oscuro/Claro**: Toggle automático con preferencia del sistema
- **Búsqueda Global**: Búsqueda local con MiniSearch
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Checklists Interactivos**: Con progreso, persistencia en localStorage y exportación JSON
- **Tabla de Contenidos**: Generada automáticamente en cada página
- **Botones de Copiar**: Para comandos con feedback visual

## 📁 Estructura

```
/
├── index.html                          # Página principal
├── assets/                             # CSS, JS, icons, images
│   ├── css/main.css
│   └── js/
│       ├── main.js                     # Funcionalidad principal
│       └── search.js                   # Búsqueda local
├── career-development/                 # Desarrollo de carrera
├── governance-risk-compliance/         # GRC
├── security-architecture/              # Arquitectura de seguridad
├── hardening/                          # Hardening (OS, Cloud, Containers)
├── vulnerability-management/           # Gestión de vulnerabilidades
├── pentesting-offensive/               # Pentesting y ofensivo
├── red-team/                           # Red Team
├── blue-team-defense/                  # Blue Team y defensa
├── incident-response-forensics/        # IR y forensics
├── cloud-devsecops/                    # Cloud y DevSecOps
├── emerging-threats/                   # Amenazas emergentes
└── resources/                          # Recursos y cheatsheets
    ├── cheatsheets-collection/
    ├── tools-recommendations.html
    └── templates-library/
```

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **Tailwind CSS**: Framework CSS utility-first (vía CDN)
- **Alpine.js**: Framework JavaScript ligero para interactividad
- **MiniSearch**: Búsqueda local en el cliente
- **GitHub Pages**: Hosting estático

## 📦 Instalación y Uso Local

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/cybersec-handbook.git
cd cybersec-handbook
```

2. Sirve localmente (opciones):
```bash
# Con Python 3
python3 -m http.server 8000

# Con Node.js (http-server)
npx http-server -p 8000

# Con PHP
php -S localhost:8000
```

3. Abre en el navegador:
```
http://localhost:8000
```

## 🌐 Despliegue en GitHub Pages

1. Haz push del repositorio a GitHub
2. Ve a Settings > Pages en tu repositorio
3. Selecciona la rama `main` y la carpeta `/ (root)`
4. Tu sitio estará disponible en: `https://tu-usuario.github.io/cybersec-handbook/`

### Nota importante sobre rutas

GitHub Pages puede requerir ajustes en las rutas si el repositorio no está en la raíz. Si tu repositorio está en `username.github.io/cybersec-handbook/`, puedes necesitar:

- Actualizar rutas relativas o
- Usar la base URL en las configuraciones

## 📝 Contenido

### Hardening
- Linux (Ubuntu/RHEL)
- Windows Server
- AWS, Azure, GCP
- Containers (Docker/Kubernetes)
- Benchmarks CIS/STIG

### Desarrollo de Carrera
- Trayectorias profesionales
- Guías de certificaciones (OSCP, CISSP)
- Habilidades blandas
- Preparación para entrevistas

### Gobierno, Riesgo y Cumplimiento
- Roadmap a CISO
- Frameworks (NIST, ISO)
- Evaluación de riesgos
- Compliance (GDPR, PCI-DSS)

### Y mucho más...

## 🤝 Contribuciones

Este es un proyecto personal, pero si encuentras errores o tienes sugerencias:

1. Fork el proyecto
2. Crea una rama para tu cambio (`git checkout -b feature/nueva-guia`)
3. Commit tus cambios (`git commit -am 'Añade nueva guía'`)
4. Push a la rama (`git push origin feature/nueva-guia`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de usar el código como referencia para tus propios proyectos.

## 🔗 Enlaces Útiles

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Tailwind CSS](https://tailwindcss.com/)
- [Alpine.js](https://alpinejs.dev/)
- [MiniSearch](https://lucaong.github.io/minisearch/)

## 📧 Contacto

Para sugerencias o preguntas sobre el contenido, puedes abrir un issue en GitHub.

---

**Última actualización**: Enero 2026

