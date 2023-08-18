import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const session = {};

  return (
    <nav className="flexBetween navbar">
      <div className="flexStart flex-1 gap-10">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            width={115}
            height={43}
            alt="Home"
          />
        </Link>
        <ul className="text-small hidden gap-7 xl:flex">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session ? (
          <>
            UserPhoto
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
