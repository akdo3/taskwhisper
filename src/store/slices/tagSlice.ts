import { Tag } from '../../types/todo';

export interface TagSlice {
  tags: Tag[];
  addTag: (tag: Omit<Tag, 'id'>) => void;
  updateTag: (tagId: string, updates: Partial<Omit<Tag, 'id'>>) => void;
  deleteTag: (tagId: string) => void;
}

export const createTagSlice = (set: any): TagSlice => ({
  tags: [],
  addTag: (tag) =>
    set((state: any) => ({
      tags: [...state.tags, { ...tag, id: Math.random().toString() }],
    })),
  updateTag: (tagId, updates) =>
    set((state: any) => ({
      tags: state.tags.map((tag: Tag) =>
        tag.id === tagId ? { ...tag, ...updates } : tag
      ),
    })),
  deleteTag: (tagId) =>
    set((state: any) => ({
      tags: state.tags.filter((tag: Tag) => tag.id !== tagId),
    })),
});