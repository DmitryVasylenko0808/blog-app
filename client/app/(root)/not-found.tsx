import { Container } from "@/shared/ui";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <section>
      <Container className="py-24">
        <div className="mb-3 text-center text-[200px] text-primary-300 font-bold">
          404
        </div>
        <p className="mb-8 text-xl text-center text-text-secondary">
          Page is not found
        </p>
        <div className="text-lg text-center text-primary-300 font-semibold">
          <Link href="/">
            <MoveLeft className="inline" size={28} /> Back To Homepage
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;
