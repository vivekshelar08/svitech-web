"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
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

function isProgramsLink(href: string) {
  const path = href.split("?")[0]?.replace(/\/$/, "") || "";
  return path === PROGRAMS_HREF || path === "/programmes";
}

export function Header({ general, navigation, programs }: HeaderProps) {
  const pathname = usePathname();
  const programsMenuId = useId();
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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  function openProgramsMenu() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setProgramsOpen(true);
  }

  function scheduleCloseProgramsMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setProgramsOpen(false);
      closeTimer.current = null;
    }, 160);
  }

  const links = nav.primaryLinks || [];

  function renderNavLink(link: { label: string; href: string }, index: number) {
    if (isProgramsLink(link.href)) {
      return (
        <div
          key={`nav-${index}-${link.href}`}
          ref={dropdownRef}
          className="relative shrink-0"
          onMouseEnter={openProgramsMenu}
          onMouseLeave={scheduleCloseProgramsMenu}
        >
          <button
            type="button"
            className="nav-link"
            data-active={programsActive || programsOpen ? "true" : "false"}
            aria-expanded={programsOpen}
            aria-haspopup="true"
            aria-controls={programsMenuId}
            onClick={() => setProgramsOpen((v) => !v)}
          >
            {link.label}
            <svg
              className={`h-2.5 w-2.5 opacity-70 transition-transform duration-200 ${programsOpen ? "rotate-180" : ""}`}
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden
            >
              <path d="M2.2 4.2 6 8l3.8-3.8L8.6 3 6 5.6 3.4 3z" />
            </svg>
          </button>

          {programsOpen && (
            <div
              id={programsMenuId}
              role="menu"
              className="absolute left-0 top-full z-[60] min-w-[15rem] pt-2"
            >
              <div className="animate-dropdown overflow-hidden bg-white shadow-[0_10px_28px_rgba(0,0,0,0.12)]">
                <ul className="py-2">
                  <li>
                    <Link
                      href={PROGRAMS_HREF}
                      role="menuitem"
                      className="block px-5 py-3 text-[0.95rem] text-[#333] transition hover:bg-[#f7f7f7] hover:text-brand"
                      onClick={() => setProgramsOpen(false)}
                    >
                      {nav.programsMenuAllLabel || "All programmes"}
                    </Link>
                  </li>
                  {programList.map((program) => (
                    <li key={program.slug}>
                      <Link
                        href={`/programs/${program.slug}`}
                        role="menuitem"
                        className="block px-5 py-3 text-[0.95rem] text-[#333] transition hover:bg-[#f7f7f7] hover:text-brand"
                        onClick={() => setProgramsOpen(false)}
                      >
                        {program.name}
                      </Link>
                    </li>
                  ))}
                  {programList.length === 0 && (
                    <li className="px-5 py-3 text-sm text-ink-muted">
                      {nav.programsMenuEmpty || "No programmes published yet"}
                    </li>
                  )}
                </ul>
              </div>
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-white/95 shadow-[0_8px_30px_-18px_rgba(12,46,47,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/90 backdrop-blur-md"
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
          className="hidden min-w-0 flex-1 items-center justify-end gap-0.5 overflow-visible lg:justify-center lg:gap-1 xl:gap-2 md:flex"
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
            <span className="sm:hidden">{nav.donateShortLabel || "Give"}</span>
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
            className="absolute inset-x-0 top-full z-50 max-h-[min(85svh,36rem)] overflow-y-auto overscroll-contain border-t border-line bg-white px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 shadow-2xl md:hidden sm:px-5"
            aria-label="Mobile"
          >
            <ul className="flex flex-col">
              {links.map((link, index) => {
                if (isProgramsLink(link.href)) {
                  return (
                    <li
                      key={`mnav-${index}-${link.href}`}
                      className="border-b border-line/60"
                    >
                      <button
                        type="button"
                        className="flex min-h-12 w-full items-center justify-between py-3.5 text-[1.05rem] font-medium text-ink"
                        aria-expanded={mobileProgramsOpen}
                        onClick={() => setMobileProgramsOpen((v) => !v)}
                      >
                        {link.label}
                        <svg
                          className={`h-3 w-3 text-ink-muted transition ${mobileProgramsOpen ? "rotate-180" : ""}`}
                          viewBox="0 0 12 12"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M2.2 4.2 6 8l3.8-3.8L8.6 3 6 5.6 3.4 3z" />
                        </svg>
                      </button>
                      {mobileProgramsOpen && (
                        <ul className="mb-2 bg-[#fafafa]">
                          <li>
                            <Link
                              href={PROGRAMS_HREF}
                              className="block px-4 py-3.5 text-[0.95rem] text-[#333]"
                              onClick={() => setOpen(false)}
                            >
                              {nav.programsMenuAllLabel || "All programmes"}
                            </Link>
                          </li>
                          {programList.map((program) => (
                            <li key={program.slug}>
                              <Link
                                href={`/programs/${program.slug}`}
                                className="block px-4 py-3.5 text-[0.95rem] text-[#333]"
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
                      className={`flex min-h-12 items-center border-b border-line/40 py-3.5 text-[1.05rem] font-medium transition ${
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
