import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* vertical and horizontal center */}
      <div className="flex flex-col items-center justify-center h-screen">
        <Link href="/resume.pdf">My resume</Link>
        <Link href="https://github.com/harryt04?tab=repositories">
          My Github
        </Link>
        <Link href="https://www.linkedin.com/in/harrison-thomas04/">
          My LinkedIn
        </Link>
      </div>
      More wiki pages coming soon...
    </>
  );
}
