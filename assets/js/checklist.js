// Checklist interactivo con localStorage

class ChecklistManager {
  constructor(checklistId) {
    this.checklistId = checklistId;
    this.storageKey = `checklist_${checklistId}`;
    this.init();
  }

  init() {
    this.loadProgress();
    this.attachEventListeners();
    this.updateProgress();
  }

  attachEventListeners() {
    const checkboxes = document.querySelectorAll(`#${this.checklistId} input[type="checkbox"]`);
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => {
        this.saveItem(checkbox.id, checkbox.checked);
        this.updateProgress();
        this.updateItemStyle(checkbox);
      });
    });

    // Botón reset
    const resetBtn = document.getElementById(`${this.checklistId}-reset`);
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.reset());
    }

    // Botón exportar JSON
    const exportJsonBtn = document.getElementById(`${this.checklistId}-export-json`);
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', () => this.exportJSON());
    }

    // Botón exportar PDF (usando html2pdf.js si está disponible)
    const exportPdfBtn = document.getElementById(`${this.checklistId}-export-pdf`);
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', () => this.exportPDF());
    }
  }

  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const progress = JSON.parse(saved);
      Object.keys(progress).forEach((itemId) => {
        const checkbox = document.getElementById(itemId);
        if (checkbox) {
          checkbox.checked = progress[itemId];
          this.updateItemStyle(checkbox);
        }
      });
    }
  }

  saveItem(itemId, checked) {
    const saved = localStorage.getItem(this.storageKey);
    const progress = saved ? JSON.parse(saved) : {};
    progress[itemId] = checked;
    localStorage.setItem(this.storageKey, JSON.stringify(progress));
  }

  updateItemStyle(checkbox) {
    const item = checkbox.closest('.checklist-item');
    if (item) {
      if (checkbox.checked) {
        item.classList.add('completed');
      } else {
        item.classList.remove('completed');
      }
    }
  }

  updateProgress() {
    const checkboxes = document.querySelectorAll(`#${this.checklistId} input[type="checkbox"]`);
    const total = checkboxes.length;
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Actualizar barra de progreso
    const progressBar = document.getElementById(`${this.checklistId}-progress`);
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }

    // Actualizar texto de progreso
    const progressText = document.getElementById(`${this.checklistId}-progress-text`);
    if (progressText) {
      progressText.textContent = `${completed} de ${total} completados (${percentage}%)`;
    }

    // Guardar progreso general
    const saved = localStorage.getItem(this.storageKey);
    const progress = saved ? JSON.parse(saved) : {};
    progress._metadata = { completed, total, percentage, lastUpdated: new Date().toISOString() };
    localStorage.setItem(this.storageKey, JSON.stringify(progress));
  }

  reset() {
    if (confirm('¿Estás seguro de que quieres resetear el progreso de este checklist?')) {
      localStorage.removeItem(this.storageKey);
      const checkboxes = document.querySelectorAll(`#${this.checklistId} input[type="checkbox"]`);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        this.updateItemStyle(checkbox);
      });
      this.updateProgress();
    }
  }

  exportJSON() {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) {
      alert('No hay progreso guardado para exportar');
      return;
    }

    const data = JSON.parse(saved);
    const checklistName = document.querySelector(`#${this.checklistId} h2, #${this.checklistId} h3`)?.textContent || 'checklist';
    const filename = `${this.checklistId}_${new Date().toISOString().split('T')[0]}.json`;

    // Agregar metadatos
    data._export = {
      checklistId: this.checklistId,
      checklistName,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  exportPDF() {
    // Nota: Esto requiere html2pdf.js o similar
    // Por ahora, mostrar mensaje de que se puede usar la función de imprimir del navegador
    const checklistElement = document.getElementById(this.checklistId);
    if (checklistElement) {
      window.print();
    } else {
      alert('Funcionalidad de PDF no disponible. Usa la opción de imprimir del navegador.');
    }
  }
}

// Inicializar checklists en la página
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-checklist]').forEach((element) => {
    const checklistId = element.id || element.getAttribute('data-checklist');
    new ChecklistManager(checklistId);
  });
});
