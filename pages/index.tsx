import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto flex h-screen flex-col items-center justify-center">
      <div className="btn-group">
        <Link className="btn" href="/task">
          Cryptocurrency List
        </Link>
      </div>
      <p className="mt-5">Mofid securities</p>
    </div>
  );
}
