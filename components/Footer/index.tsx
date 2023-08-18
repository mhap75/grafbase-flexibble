import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

type ColumnProps = {
  title: string;
  links: string[];
};

const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div className="flexCol w-full gap-12">
        <div className="flexCol items-start">
          <Image
            src="/assets/images/logo-purple.svg"
            width={115}
            height={38}
            alt="Flexibble"
            className="sizeAuto"
          />

          <p className="mt-5 max-w-xs text-start text-sm">
            Flexibble is the World leading community for creative for creatives
            to share, grow and get hired.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
          {footerLinks.map((link) => (
            <FooterColumn key={link.title} link={link} />
          ))}
        </div>
      </div>

      <div className="flexBetween footer_copyright text-gray">
        <p>@2023 Flexibble. All rights reserved.</p>
        <p>
          <span className="font-bold text-black">10,200</span> projects
          submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;

const FooterColumn = ({ link }: { link: ColumnProps }) => (
  <div className={`footer_column ${link.links.length > 7 && "row-span-2"}`}>
    <h4 className="font-semibold">{link.title}</h4>
    <ul className="flexCol gap-2">
      {link.links.map((l) => (
        <Link key={l} href={"/"}>
          {l}
        </Link>
      ))}
    </ul>
  </div>
);
