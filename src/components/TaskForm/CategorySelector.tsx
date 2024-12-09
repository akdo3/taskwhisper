import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTodoStore } from '../../store/todoStore';

interface CategorySelectorProps {
  categoryId?: string;
  setCategoryId: (id: string) => void;
}

export const CategorySelector = ({
  categoryId,
  setCategoryId,
}: CategorySelectorProps) => {
  const { categories } = useTodoStore();

  return (
    <div className="flex-1">
      <Select value={categoryId} onValueChange={setCategoryId}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};