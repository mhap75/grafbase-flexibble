import { NavLinks } from "@/constants";
import { getCurrentUser } from "@/utils/getCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { AuthProviders, ProfileMenu } from "..";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flexStart flex-1 gap-10">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            width={115}
            height={43}
            alt="Home"
            className="sizeAuto"
          />
        </Link>
        <ul className="text-small hidden gap-7 xl:flex">
          {NavLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="hover:text-primary-purple"
            >
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link
              href="/create-project"
              className="rounded-lg bg-purple-100 p-2 text-sm font-semibold text-purple-950 hover:opacity-70"
            >
              Share Work
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
