import { Container, Title } from "@/shared/ui";
import QuestionsList from "./questions.list";

const FAQ = () => {
  return (
    <Container size="md" className="py-20">
      <Title
        as="h1"
        filledText="Frequently"
        normalText="Asked Questions"
        className="mb-4 text-center"
      />
      <p className="mb-10 text-center">
        Consectetur enim mauris curae dignissim massa duis dui. Eget magna
        phasellus bibendum tristique scelerisque diam hendrerit.
      </p>
      <QuestionsList />
    </Container>
  );
};

export default FAQ;
