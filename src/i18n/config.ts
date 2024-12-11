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
        }
      }
    },
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;