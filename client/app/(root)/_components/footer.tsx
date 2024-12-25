import { CategoriesService } from "@/services/categories/categories.service";
import { Category } from "@/services/categories/dto/get.categories.dto";
import { Logo } from "@/shared/components";
import { Container } from "@/shared/ui";
import Link from "next/link";

const Footer = async () => {
  const categories = await CategoriesService.getCategories();

  return (
    <footer className="bg-primary-200">
      <Container className="py-24 flex items-center">
        <div className="w-full flex justify-around gap-x-36">
          <div className="flex-1">
            <div className="mb-6">
              <Logo />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              tempora natus nobis laudantium qui provident aut magni quaerat
              delectus enim voluptas dicta temporibus pariatur sequi dolore
              repellat, architecto nihil autem!
            </p>
          </div>
          <div className="flex-1">
            <h4 className="mb-6">Categories</h4>
            <nav>
              <ul className="flex flex-col space-y-4">
                {categories.map((cat: Category) => (
                  <li key={cat.id}>
                    <Link href={`/categories/${cat.id}/articles`}>
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex-1">
            <h4 className="mb-6">Quick Links</h4>
            <nav>
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
