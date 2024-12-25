import { Accordion } from "@/shared/ui";

const QuestionsList = () => {
  return (
    <ul className="flex flex-col space-y-4">
      <li>
        <Accordion
          title="Nullam id nulla sed penatibus mollis elit malesuada?"
          content="Finibus ultricies erat netus mi libero sed augue. Mattis per eget odio mus hac facilisi viverra. Porta dolor adipiscing nam neque at nullam."
        />
      </li>
      <li>
        <Accordion
          title="Dis diam luctus aliquet velit mus ac lobortis?"
          content="Odio dui turpis curabitur proin dapibus praesent ligula in."
        />
      </li>
      <li>
        <Accordion
          title="Lacus porta lacinia malesuada urna fusce dapibus velit at? Lacus porta lacinia malesuada urna fusce dapibus velit at?"
          content="Venenatis nisi tincidunt quis proin lobortis sollicitudin tellus. Magna eget gravida quis; finibus porta pretium. Non curabitur velit netus mollis lectus interdum et."
        />
      </li>
      <li>
        <Accordion
          title="Eget magna phasellus bibendum tristique scelerisque diam hendrerit?"
          content="Et iaculis curae sociosqu augue integer placerat vel."
        />
      </li>
      <li>
        <Accordion
          title="Inceptos dignissim ultrices cras vulputate vestibulum pharetra quam?"
          content="Posuere nunc habitasse est imperdiet facilisi ex vel. Curabitur vestibulum aliquam natoque conubia scelerisque ligula. Porttitor sed ultrices mus himenaeos iaculis parturient nullam. Mauris mattis risus augue posuere tortor risus proin pulvinar."
        />
      </li>
    </ul>
  );
};

export default QuestionsList;
