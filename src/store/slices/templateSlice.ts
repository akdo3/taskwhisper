import { StateCreator } from 'zustand';
import { TaskTemplate } from '@/types/todo';

export interface TemplateSlice {
  templates: TaskTemplate[];
}

export const createTemplateSlice: StateCreator<
  TemplateSlice,
  [],
  [],
  TemplateSlice
> = (set) => ({
  templates: [],
});