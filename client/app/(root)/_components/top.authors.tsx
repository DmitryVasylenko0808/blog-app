import { UsersService } from "@/services/users/users.service";
import { Title } from "@/shared/ui";
import TopAuthorItem from "./top.author.item";
import { TopUser } from "@/services/users/dto/get.top.users.dto";

const TopAuthors = async () => {
  const topAuthors = await UsersService.getTop();

  return (
    <div className="mb-16">
      <Title as="h2" filledText="Top" normalText="Authors" className="mb-11" />
      <ul className="flex flex-col space-y-11">
        {topAuthors.map((author: TopUser) => (
          <TopAuthorItem author={author} key={author.id} />
        ))}
      </ul>
    </div>
  );
};

export default TopAuthors;
