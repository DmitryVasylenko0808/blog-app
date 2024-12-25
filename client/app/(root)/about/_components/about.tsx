import { Container, Title } from "@/shared/ui";

const About = () => {
  return (
    <section>
      <Container size="md" className="py-20">
        <Title
          as="h1"
          filledText="Notebook Is A Place"
          normalText="Where You Can Find Your Perfect Blogs"
          className="text-center mb-8"
        />
        <p className="mb-6 text-center">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Ipsum taciti
          porttitor curae massa dictum at. Elit ridiculus mauris purus pretium
          aliquam cursus facilisis sodales aenean. Integer imperdiet ad sed
          libero finibus urna augue. Dolor cursus nec integer odio nisl. Sem
          convallis eget ex sem rutrum. Odio donec dignissim erat sed sed mus.
          Rhoncus suspendisse quis eget rhoncus per finibus proin blandit.
        </p>
        <h2 className="mb-4 text-center">
          Lorem ipsum odor amet, consectetuer adipiscing elit.
        </h2>
        <p className="text-center">
          Maximus consectetur tristique dui faucibus inceptos ultrices. Et ex
          est montes sem ipsum at cursus ultrices. Potenti habitant facilisi
          venenatis platea facilisis aliquam sem. Lobortis ligula gravida turpis
          conubia eu pharetra.
        </p>
      </Container>
    </section>
  );
};

export default About;
