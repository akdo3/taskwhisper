import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          welcome: 'Welcome to TaskWhisper',
          addTask: 'Add Task',
          tasks: 'Tasks',
          settings: 'Settings',
          projects: 'Projects',
          analytics: 'Analytics',
          theme: 'Theme',
          quickHelp: 'Quick Help',
          helpText: 'Create and manage tasks, switch between different views, and track your progress.',
          listView: 'List',
          kanbanView: 'Kanban',
          calendarView: 'Calendar',
          searchPlaceholder: 'Search tasks...',
          filterByPriority: 'Filter by priority',
          noTasks: 'No tasks found',
          addNewTask: 'Add New Task',
          taskTitle: 'Task Title',
          taskDescription: 'Description',
          dueDate: 'Due Date',
          priority: 'Priority',
          category: 'Category',
          project: 'Project',
          tags: 'Tags',
          subtasks: 'Subtasks',
          attachments: 'Attachments',
          save: 'Save',
          cancel: 'Cancel',
          delete: 'Delete',
          edit: 'Edit',
          complete: 'Complete',
          incomplete: 'Incomplete'
        }
      },
      es: {
        translation: {
          welcome: 'Bienvenido a TaskWhisper',
          addTask: 'Añadir Tarea',
          tasks: 'Tareas',
          settings: 'Configuración',
          projects: 'Proyectos',
          analytics: 'Análisis',
          theme: 'Tema',
          quickHelp: 'Ayuda Rápida',
          helpText: 'Crea y gestiona tareas, cambia entre diferentes vistas y sigue tu progreso.',
          listView: 'Lista',
          kanbanView: 'Kanban',
          calendarView: 'Calendario',
          searchPlaceholder: 'Buscar tareas...',
          filterByPriority: 'Filtrar por prioridad',
          noTasks: 'No se encontraron tareas',
          addNewTask: 'Añadir Nueva Tarea',
          taskTitle: 'Título de la Tarea',
          taskDescription: 'Descripción',
          dueDate: 'Fecha de Vencimiento',
          priority: 'Prioridad',
          category: 'Categoría',
          project: 'Proyecto',
          tags: 'Etiquetas',
          subtasks: 'Subtareas',
          attachments: 'Archivos Adjuntos',
          save: 'Guardar',
          cancel: 'Cancelar',
          delete: 'Eliminar',
          edit: 'Editar',
          complete: 'Completada',
          incomplete: 'Incompleta'
        }
      },
      fr: {
        translation: {
          welcome: 'Bienvenue à TaskWhisper',
          addTask: 'Ajouter une tâche',
          tasks: 'Tâches',
          settings: 'Paramètres',
          projects: 'Projets',
          analytics: 'Analytique',
          theme: 'Thème',
          quickHelp: 'Aide rapide',
          helpText: 'Créez et gérez des tâches, passez d\'une vue à l\'autre et suivez vos progrès.',
          listView: 'Liste',
          kanbanView: 'Kanban',
          calendarView: 'Calendrier',
          searchPlaceholder: 'Rechercher des tâches...',
          filterByPriority: 'Filtrer par priorité',
          noTasks: 'Aucune tâche trouvée',
          addNewTask: 'Ajouter une nouvelle tâche',
          taskTitle: 'Titre de la tâche',
          taskDescription: 'Description',
          dueDate: 'Date d\'échéance',
          priority: 'Priorité',
          category: 'Catégorie',
          project: 'Projet',
          tags: 'Étiquettes',
          subtasks: 'Sous-tâches',
          attachments: 'Pièces jointes',
          save: 'Enregistrer',
          cancel: 'Annuler',
          delete: 'Supprimer',
          edit: 'Éditer',
          complete: 'Complète',
          incomplete: 'Incomplète'
        }
      },
      de: {
        translation: {
          welcome: 'Willkommen bei TaskWhisper',
          addTask: 'Aufgabe hinzufügen',
          tasks: 'Aufgaben',
          settings: 'Einstellungen',
          projects: 'Projekte',
          analytics: 'Analytik',
          theme: 'Thema',
          quickHelp: 'Schnelle Hilfe',
          helpText: 'Erstellen und verwalten Sie Aufgaben, wechseln Sie zwischen verschiedenen Ansichten und verfolgen Sie Ihren Fortschritt.',
          listView: 'Liste',
          kanbanView: 'Kanban',
          calendarView: 'Kalender',
          searchPlaceholder: 'Aufgaben suchen...',
          filterByPriority: 'Nach Priorität filtern',
          noTasks: 'Keine Aufgaben gefunden',
          addNewTask: 'Neue Aufgabe hinzufügen',
          taskTitle: 'Aufgabentitel',
          taskDescription: 'Beschreibung',
          dueDate: 'Fälligkeitsdatum',
          priority: 'Priorität',
          category: 'Kategorie',
          project: 'Projekt',
          tags: 'Tags',
          subtasks: 'Unteraufgaben',
          attachments: 'Anhänge',
          save: 'Speichern',
          cancel: 'Abbrechen',
          delete: 'Löschen',
          edit: 'Bearbeiten',
          complete: 'Vollständig',
          incomplete: 'Unvollständig'
        }
      }
    },
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
