"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import type { SiteSettings } from "@/lib/site-settings-defaults";

export type NavProgram = {
  slug: string;
  name: string;
  summary: string;
};

type HeaderProps = {
  general: SiteSettings["general"];
  navigation: SiteSettings["navigation"];
  programs: NavProgram[];
};

const PROGRAMS_HREF = "/programs";

export function Header({ general, navigation, programs }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logoProps = {
    logoUrl: general.logoUrl,
    logoAlt: general.logoAlt,
    logoAriaLabel: general.logoAriaLabel,
  };

  const programsActive =
    pathname === PROGRAMS_HREF || pathname.startsWith(`${PROGRAMS_HREF}/`);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setProgramsOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    setProgramsOpen(false);
    setOpen(false);
    setMobileProgramsOpen(false);
  }, [pathname]);

  function renderNavLink(link: { label: string; href: string }) {
    if (link.href === PROGRAMS_HREF && programs.length > 0) {
      return (
        <div key={link.href} ref={dropdownRef} className="relative">
          <button
            type="button"
            className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
              programsActive ? "text-brand" : "text-ink-muted hover:text-ink"
            }`}
            aria-expanded={programsOpen}
            aria-haspopup="true"
            onClick={() => setProgramsOpen((v) => !v)}
          >
            {link.label}
            <span
              className={`text-[10px] transition ${programsOpen ? "rotate-180" : ""}`}
              aria-hidden
            >
              ▾
            </span>
          </button>

          {programsOpen && (
            <div className="absolute left-1/2 top-full z-50 mt-3 w-[22rem] -translate-x-1/2 border border-line bg-white p-2 shadow-xl">
              <div className="border-b border-line px-3 py-2">
                <Link
                  href={PROGRAMS_HREF}
                  className="text-sm font-semibold text-brand hover:text-brand-bright"
                  onClick={() => setProgramsOpen(false)}
                >
                  All programmes →
                </Link>
              </div>
              <ul className="max-h-[18rem] overflow-y-auto py-1">
                {programs.map((program) => (
                  <li key={program.slug}>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="block px-3 py-2.5 transition hover:bg-surface"
                      onClick={() => setProgramsOpen(false)}
                    >
                      <span className="block text-sm font-semibold text-ink">
                        {program.name}
                      </span>
                      <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                        {program.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }

    const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`text-sm font-medium transition-colors ${
          active ? "text-brand" : "text-ink-muted hover:text-ink"
        }`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3 md:px-8">
        <SiteLogo
          {...logoProps}
          size="sm"
          priority
          onClick={() => setOpen(false)}
        />

        <nav className="hidden items-center gap-5 xl:gap-6 lg:flex" aria-label="Primary">
          {navigation.primaryLinks.map((link) => renderNavLink(link))}
          <Link
            href={navigation.donateHref}
            className="bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {navigation.donateLabel}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={navigation.donateHref}
            className="bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            {navigation.donateLabel}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-surface px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navigation.primaryLinks.map((link) => {
              if (link.href === PROGRAMS_HREF && programs.length > 0) {
                return (
                  <li key={link.href}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-3 text-base font-medium text-ink"
                      aria-expanded={mobileProgramsOpen}
                      onClick={() => setMobileProgramsOpen((v) => !v)}
                    >
                      {link.label}
                      <span className={`text-xs ${mobileProgramsOpen ? "rotate-180" : ""}`}>▾</span>
                    </button>
                    {mobileProgramsOpen && (
                      <ul className="mb-2 ml-3 border-l border-line pl-4">
                        <li>
                          <Link
                            href={PROGRAMS_HREF}
                            className="block py-2 text-sm font-semibold text-brand"
                            onClick={() => setOpen(false)}
                          >
                            All programmes
                          </Link>
                        </li>
                        {programs.map((program) => (
                          <li key={program.slug}>
                            <Link
                              href={`/programs/${program.slug}`}
                              className="block py-2 text-sm text-ink-muted"
                              onClick={() => setOpen(false)}
                            >
                              {program.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-base font-medium text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
