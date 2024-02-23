import Link from "next/link";

const LogoTitle = "GrowthGrid";

export const Logo = () => {
  return (
    <Link className="text-[2.5rem]" href="/calendar">
      {LogoTitle}
    </Link>
  );
};
