#!/usr/bin/env node
/**
 * Script para sincronizar el menú de navegación con los archivos HTML existentes
 * 
 * Uso: node scripts/sync-menu.js
 * 
 * Este script:
 * 1. Escanea todos los archivos HTML del proyecto
 * 2. Compara con los enlaces en navigation.js
 * 3. Reporta archivos faltantes o extra
 * 4. Sugiere actualizaciones al menú
 */

const fs = require('fs');
const path = require('path');

// Colores para la salida
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function findHtmlFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) {
        return fileList;
    }
    
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        
        try {
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                // Ignorar directorios comunes
                if (!['node_modules', '.git', 'assets', 'scripts'].includes(file)) {
                    findHtmlFiles(filePath, fileList);
                }
            } else if (file.endsWith('.html')) {
                // Incluir index.html en subdirectorios, pero no el index.html raíz
                const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
                if (relativePath !== 'index.html') {
                    fileList.push(relativePath);
                }
            }
        } catch (err) {
            // Ignorar errores de acceso
        }
    });
    
    return fileList;
}

function extractMenuLinks(navContent) {
    const links = [];
    const regex = /href="\$\{base\}([^"]+)"/g;
    let match;
    
    while ((match = regex.exec(navContent)) !== null) {
        links.push(match[1]);
    }
    
    return new Set(links);
}

function main() {
    console.log(`${colors.cyan}📊 Verificando sincronización del menú...${colors.reset}\n`);
    
    // Encontrar todos los archivos HTML
    const htmlFiles = findHtmlFiles('.');
    const htmlFilesSet = new Set(htmlFiles);
    
    // Leer navigation.js
    const navPath = path.join('assets', 'js', 'navigation.js');
    if (!fs.existsSync(navPath)) {
        console.log(`${colors.red}❌ No se encontró navigation.js${colors.reset}`);
        process.exit(1);
    }
    
    const navContent = fs.readFileSync(navPath, 'utf-8');
    const menuLinks = extractMenuLinks(navContent);
    
    // Comparar
    const missingInMenu = htmlFiles.filter(f => !menuLinks.has(f));
    const extraInMenu = Array.from(menuLinks).filter(l => !htmlFilesSet.has(l));
    
    // Reportar resultados
    console.log(`${colors.blue}📁 Archivos HTML encontrados: ${colors.reset}${htmlFiles.length}`);
    console.log(`${colors.blue}📋 Enlaces en el menú: ${colors.reset}${menuLinks.size}\n`);
    
    if (missingInMenu.length > 0) {
        console.log(`${colors.yellow}⚠️  Archivos que NO están en el menú (${missingInMenu.length}):${colors.reset}`);
        missingInMenu.forEach(file => {
            console.log(`   ${colors.red}- ${file}${colors.reset}`);
        });
        console.log(`\n${colors.yellow}💡 Agrega estos archivos al menú en assets/js/navigation.js${colors.reset}\n`);
    }
    
    if (extraInMenu.length > 0) {
        console.log(`${colors.yellow}⚠️  Enlaces en el menú que NO existen (${extraInMenu.length}):${colors.reset}`);
        extraInMenu.forEach(link => {
            console.log(`   ${colors.red}- ${link}${colors.reset}`);
        });
        console.log(`\n${colors.yellow}💡 Elimina estos enlaces del menú o crea los archivos faltantes${colors.reset}\n`);
    }
    
    if (missingInMenu.length === 0 && extraInMenu.length === 0) {
        console.log(`${colors.green}✅ El menú está completamente sincronizado!${colors.reset}\n`);
        console.log(`${colors.green}   Todos los archivos HTML están en el menú${colors.reset}`);
        console.log(`${colors.green}   Todos los enlaces del menú apuntan a archivos existentes${colors.reset}\n`);
    } else {
        console.log(`${colors.yellow}📝 Recuerda actualizar también index.html con los mismos cambios${colors.reset}\n`);
        process.exit(1);
    }
}

main();
