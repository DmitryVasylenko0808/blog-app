import Button from "@/shared/ui/button";
import Loader from "@/shared/ui/loader";
import TextArea from "@/shared/ui/textarea";
import TextField from "@/shared/ui/textfield";

export default function Home() {
  return (
    <div className="py-5">
      <Button variant="primary" size="md">
        <Loader color="white" size="sm" />
      </Button>
      <TextField />
      <TextArea rows={2} />
      <Loader color="primary" size="md" />
    </div>
  );
}
