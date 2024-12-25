import { Category } from "@/services/categories/dto/get.categories.dto";

type CategoriesRadioGroupProps = {
  categories: Category[];
  defaultCheckedCategoryId?: number;
  error?: string;
};

const CategoriesRadioGroup = ({
  categories,
  defaultCheckedCategoryId,
  error,
}: CategoriesRadioGroupProps) => {
  return (
    <div className="mb-6">
      <label className="block mb-1 text-sm">Category</label>
      <ul className="flex gap-x-4">
        {categories.map((cat) => (
          <li key={cat.id}>
            <input
              type="radio"
              id={cat.title}
              name="categoryId"
              value={cat.id}
              defaultChecked={cat.id === defaultCheckedCategoryId}
              className="hidden peer"
            />
            <label
              htmlFor={cat.title}
              className="inline-block px-5 py-2.5 text-primary-250 border border-primary-250 rounded-md cursor-pointer
      peer-checked:bg-primary-300 peer-checked:border-primary-300 peer-checked:text-white"
            >
              {cat.title}
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-1 text-xs text-text-error">{error}</p>
    </div>
  );
};

export default CategoriesRadioGroup;
