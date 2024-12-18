import { CategoriesService } from "@/services/categories/categories.service";
import { Title } from "@/shared/ui";
import SearchWithTags from "./search.with.tags";

const Categories = async () => {
  const categories = await CategoriesService.getCategories();

  return (
    <div>
      <Title
        as="h2"
        filledText="Search"
        normalText="With Tags"
        className="mb-10"
      />
      <SearchWithTags tags={categories} />
    </div>
  );
};

export default Categories;
