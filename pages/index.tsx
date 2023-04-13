import Link from "next/link";
import { Container } from "../components/Container";

export default function Home() {
  return (
    <Container>
      <Link href='/users'>
        <ion-button>Go to Page Two</ion-button>
      </Link>
    </Container>
  );
}
