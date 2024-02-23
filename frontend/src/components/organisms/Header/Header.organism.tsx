"use client";

import { HamburgerButton } from "@/components/atoms/HamburgerButton/HamburgerButton.atom";
import { UserIcon } from "@/components/icons/UserIcon/User.icon";
import { CurrentDate } from "@/components/atoms/CarrentDate/CurrentDate.atom";
import { Button } from "@/components/atoms/Button/Button.atom";
import { ArrowIcon } from "@/components/icons/Arrow/Arrow.icon";
import { Logo } from "@/components/atoms/Logo/Logo.atom";

export const Header = () => {
  const handleClick = () => {};
  return (
    <header className="section-base flex items-center justify-between px-12 py-9 rounded-full">
      <div className="flex-center gap-12">
        <HamburgerButton onOpen={false} />
        <UserIcon />
        <CurrentDate date={new Date("2024-12-25")} />
        <Button onClick={handleClick} variant="header">
          今日
        </Button>
        <div className="flex gap-12">
          <Button onClick={handleClick} variant="none">
            <ArrowIcon direction="left" />
          </Button>
          <Button onClick={handleClick} variant="none">
            <ArrowIcon direction="right" />
          </Button>
        </div>
      </div>
      <div>
        <Logo />
      </div>
    </header>
  );
};
