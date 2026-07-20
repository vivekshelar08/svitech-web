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
  const [scrolled, setScrolled] = useState(false);
  const [nav, setNav] = useState(navigation);
  const [logo, setLogo] = useState({
    logoUrl: general.logoUrl,
    logoAlt: general.logoAlt,
    logoAriaLabel: general.logoAriaLabel,
  });
  const [programList, setProgramList] = useState(programs);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Keep in sync if the server layout re-renders with new props
  useEffect(() => {
    setNav(navigation);
  }, [navigation]);

  useEffect(() => {
    setLogo({
      logoUrl: general.logoUrl,
      logoAlt: general.logoAlt,
      logoAriaLabel: general.logoAriaLabel,
    });
  }, [general.logoUrl, general.logoAlt, general.logoAriaLabel]);

  useEffect(() => {
    setProgramList(programs);
  }, [programs]);

  // Refresh chrome from a no-store API so first paint never stays on a stale/short nav.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/site-chrome", { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const json = (await res.json()) as {
          general?: {
            logoUrl?: string;
            logoAlt?: string;
            logoAriaLabel?: string;
          };
          navigation?: SiteSettings["navigation"];
          programs?: NavProgram[];
        };
        if (cancelled) return;
        if (json.navigation?.primaryLinks?.length) {
          setNav(json.navigation);
        }
        if (json.general?.logoUrl) {
          setLogo({
            logoUrl: json.general.logoUrl,
            logoAlt: json.general.logoAlt || "",
            logoAriaLabel: json.general.logoAriaLabel || "",
          });
        }
        if (Array.isArray(json.programs)) {
          setProgramList(json.programs);
        }
      } catch {
        // Keep server-rendered props
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const programsActive =
    pathname === PROGRAMS_HREF || pathname.startsWith(`${PROGRAMS_HREF}/`);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setProgramsOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProgramsOpen(false);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    setProgramsOpen(false);
    setOpen(false);
    setMobileProgramsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const links = nav.primaryLinks || [];

  function renderNavLink(link: { label: string; href: string }, index: number) {
    if (link.href === PROGRAMS_HREF && programList.length > 0) {
      return (
        <div key={`nav-${index}-${link.href}`} ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            className="nav-link"
            data-active={programsActive || programsOpen ? "true" : "false"}
            aria-expanded={programsOpen}
            aria-haspopup="true"
            onClick={() => setProgramsOpen((v) => !v)}
            onMouseEnter={() => setProgramsOpen(true)}
          >
            {link.label}
            <svg
              className={`h-3 w-3 transition-transform duration-300 ${programsOpen ? "rotate-180" : ""}`}
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M2.5 4.5L6 8l3.5-3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </button>

          {programsOpen && (
            <div
              className="animate-dropdown absolute left-1/2 top-full z-50 mt-4 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden border border-line/80 bg-white/95 shadow-[0_24px_60px_-20px_rgba(12,46,47,0.35)] backdrop-blur-xl"
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <div className="h-1 w-full bg-gradient-to-r from-brand via-brand-bright to-accent" />
              <div className="flex items-center justify-between border-b border-line bg-surface/80 px-5 py-3.5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                    Explore
                  </p>
                  <p className="mt-0.5 font-display text-sm font-bold text-ink">
                    Our programmes
                  </p>
                </div>
                <Link
                  href={PROGRAMS_HREF}
                  className="link-underline text-xs"
                  onClick={() => setProgramsOpen(false)}
                >
                  View all
                </Link>
              </div>
              <ul className="max-h-[22rem] overflow-y-auto p-2">
                {programList.map((program, programIndex) => (
                  <li key={program.slug}>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="group flex gap-3 px-3 py-3 transition hover:bg-brand/[0.06]"
                      onClick={() => setProgramsOpen(false)}
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-line bg-surface font-display text-[11px] font-bold text-brand transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                        {String(programIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink group-hover:text-brand">
                          {program.name}
                        </span>
                        <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                          {program.summary}
                        </span>
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
        key={`nav-${index}-${link.href}`}
        href={link.href}
        className="nav-link shrink-0"
        data-active={active ? "true" : "false"}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] shadow-[0_8px_30px_-18px_rgba(12,46,47,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-5 md:px-8 md:py-3.5">
        <div className="min-w-0 shrink">
          <SiteLogo
            {...logo}
            size="sm"
            priority
            onClick={() => setOpen(false)}
          />
        </div>

        <nav
          className="nav-scroll hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto rounded-sm border border-line/60 bg-white/55 px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm md:flex lg:gap-1 xl:gap-2 xl:px-4"
          aria-label="Primary"
        >
          {links.map((link, index) => renderNavLink(link, index))}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex">
          <Link href={nav.donateHref} className="btn-primary !min-h-10 !px-4 !py-2 text-sm lg:!px-5 lg:!py-2.5">
            {nav.donateLabel}
          </Link>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 md:hidden">
          <Link
            href={nav.donateHref}
            className="btn-primary !min-h-10 !w-auto !px-3 !py-2 text-sm sm:!px-4"
          >
            <span className="sm:hidden">Give</span>
            <span className="hidden sm:inline">{nav.donateLabel}</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-line bg-white/70 text-ink transition hover:border-brand/40 hover:bg-white"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative flex h-4 w-5 flex-col justify-between">
              <span
                className={`block h-0.5 w-full origin-center bg-ink transition duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-ink transition duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full origin-center bg-ink transition duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-bg-deep/40 backdrop-blur-[2px] md:hidden"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav"
            className="animate-dropdown absolute inset-x-0 top-full z-50 max-h-[min(85svh,36rem)] overflow-y-auto overscroll-contain border-t border-line bg-white/98 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 shadow-2xl backdrop-blur-xl sm:px-5 md:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col">
              {links.map((link, index) => {
                if (link.href === PROGRAMS_HREF && programList.length > 0) {
                  return (
                    <li
                      key={`mnav-${index}-${link.href}`}
                      className="border-b border-line/60"
                    >
                      <button
                        type="button"
                        className="flex min-h-12 w-full items-center justify-between py-3.5 font-display text-lg font-semibold text-ink"
                        aria-expanded={mobileProgramsOpen}
                        onClick={() => setMobileProgramsOpen((v) => !v)}
                      >
                        {link.label}
                        <span
                          className={`text-brand transition ${mobileProgramsOpen ? "rotate-180" : ""}`}
                        >
                          ▾
                        </span>
                      </button>
                      {mobileProgramsOpen && (
                        <ul className="mb-3 space-y-0.5 border-l-2 border-brand/30 pl-4">
                          <li>
                            <Link
                              href={PROGRAMS_HREF}
                              className="block py-3 text-sm font-semibold text-brand"
                              onClick={() => setOpen(false)}
                            >
                              All programmes →
                            </Link>
                          </li>
                          {programList.map((program) => (
                            <li key={program.slug}>
                              <Link
                                href={`/programs/${program.slug}`}
                                className="block py-3 text-sm text-ink-muted transition hover:text-ink"
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

                const active =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={`mnav-${index}-${link.href}`}>
                    <Link
                      href={link.href}
                      className={`flex min-h-12 items-center border-b border-line/40 py-3.5 font-display text-lg font-semibold transition ${
                        active ? "text-brand" : "text-ink hover:text-brand"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={nav.donateHref}
              className="btn-primary mt-5 w-full"
              onClick={() => setOpen(false)}
            >
              {nav.donateLabel}
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}
