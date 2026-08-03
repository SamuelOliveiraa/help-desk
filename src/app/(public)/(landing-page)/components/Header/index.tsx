"use client";

import Button from "@/components/common/Button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="p-4 md:px-0 bg-white sticky top-0 z-50 shadow-md"
      ref={headerRef}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/">
          <Image
            alt="Logo do site HelpDesk"
            src={"/logo-help-desk.png"}
            width={170}
            height={170}
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-2">
            <li>
              <Link href="/#features">Recursos</Link>
            </li>
            <li>
              <Link href="/#services">Como Funciona</Link>
            </li>
            <li>
              <Link href="/#plans">Planos</Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button variant="link">Acessar conta</Button>
          </Link>
          <Link href="/register">
            <Button>Cadastra-se</Button>
          </Link>
        </div>

        <div className="block md:hidden">
          <Hamburger
            toggled={isMenuOpen}
            toggle={setIsMenuOpen}
            size={24}
            duration={0.3}
            rounded
            label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          />
        </div>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 w-full bg-white border-y md:hidden p-4 pb-6 flex flex-col gap-4 transition-all duration-300 ease-in-out"
          >
            <nav>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="/#features">Recursos</Link>
                </li>
                <li>
                  <Link href="/#services">Como Funciona</Link>
                </li>
                <li>
                  <Link href="/#plans">Planos</Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="link">Acessar conta</Button>
              </Link>
              <Link href="/register">
                <Button>Cadastra-se</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
