import { Category } from '../../types/todo';

export interface CategorySlice {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (categoryId: string, updates: Partial<Omit<Category, 'id'>>) => void;
  deleteCategory: (categoryId: string) => void;
}

export const createCategorySlice = (set: any): CategorySlice => ({
  categories: [],
  addCategory: (category) =>
    set((state: any) => ({
      categories: [...state.categories, { ...category, id: Math.random().toString() }],
    })),
  updateCategory: (categoryId, updates) =>
    set((state: any) => ({
      categories: state.categories.map((category: Category) =>
        category.id === categoryId ? { ...category, ...updates } : category
      ),
    })),
  deleteCategory: (categoryId) =>
    set((state: any) => ({
      categories: state.categories.filter((category: Category) => category.id !== categoryId),
      tasks: state.tasks.map((task: any) =>
        task.categoryId === categoryId ? { ...task, categoryId: undefined } : task
      ),
    })),
});