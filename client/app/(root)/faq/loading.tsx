import { Loader } from "@/shared/ui";

export default function LoadingFAQPage() {
  return (
    <section className="w-full h-full py-64 flex justify-center">
      <Loader color="primary" size="lg" />
    </section>
  );
}
