"use client";

import type { NavLink, SiteSettings } from "@/lib/site-settings-defaults";

export function Field({
  label,
  value,
  onChange,
  multiline,
  hint,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-ink-muted">{hint}</span>}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
        />
      )}
    </label>
  );
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-2 flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 cursor-pointer border border-line bg-white"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border border-line bg-white px-3 py-2.5 font-mono text-sm outline-none focus:border-brand"
        />
      </div>
    </label>
  );
}

export function SectionTitle({ title, copy }: { title: string; copy?: string }) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      {copy && <p className="mt-1 text-sm text-ink-muted">{copy}</p>}
    </div>
  );
}

export function NavLinksEditor({
  label,
  links,
  onChange,
}: {
  label: string;
  links: NavLink[];
  onChange: (links: NavLink[]) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-ink">{label}</p>
      {links.map((link, index) => (
        <div
          key={index}
          className="grid gap-3 border border-line bg-white/60 p-4 md:grid-cols-[1fr_1fr_auto]"
        >
          <Field
            label="Label"
            value={link.label}
            onChange={(v) => {
              const next = [...links];
              next[index] = { ...next[index], label: v };
              onChange(next);
            }}
          />
          <Field
            label="Link"
            value={link.href}
            onChange={(v) => {
              const next = [...links];
              next[index] = { ...next[index], href: v };
              onChange(next);
            }}
          />
          <button
            type="button"
            className="self-end text-sm font-semibold text-accent"
            onClick={() => onChange(links.filter((_, i) => i !== index))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="border border-line px-4 py-2 text-sm font-semibold"
        onClick={() => onChange([...links, { label: "", href: "/" }])}
      >
        Add link
      </button>
    </div>
  );
}

export function BulletsEditor({
  label,
  bullets,
  onChange,
}: {
  label: string;
  bullets: string[];
  onChange: (bullets: string[]) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-ink">{label}</p>
      {bullets.map((bullet, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={bullet}
            onChange={(e) => {
              const next = [...bullets];
              next[index] = e.target.value;
              onChange(next);
            }}
            className="flex-1 border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
          />
          <button
            type="button"
            className="px-3 text-sm font-semibold text-accent"
            onClick={() => onChange(bullets.filter((_, i) => i !== index))}
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        className="border border-line px-4 py-2 text-sm font-semibold"
        onClick={() => onChange([...bullets, ""])}
      >
        Add bullet
      </button>
    </div>
  );
}

export function PageIntroFields({
  prefix,
  values,
  onChange,
}: {
  prefix: string;
  values: {
    eyebrow: string;
    headline: string;
    intro?: string;
    seoTitle: string;
    seoDescription: string;
  };
  onChange: (patch: Partial<typeof values>) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label={`${prefix} eyebrow`} value={values.eyebrow} onChange={(v) => onChange({ eyebrow: v })} />
      <Field label={`${prefix} headline`} value={values.headline} onChange={(v) => onChange({ headline: v })} />
      {values.intro !== undefined && (
        <Field label={`${prefix} intro`} value={values.intro} onChange={(v) => onChange({ intro: v })} multiline />
      )}
      <Field label={`${prefix} SEO title`} value={values.seoTitle} onChange={(v) => onChange({ seoTitle: v })} />
      <Field
        label={`${prefix} SEO description`}
        value={values.seoDescription}
        onChange={(v) => onChange({ seoDescription: v })}
        multiline
      />
    </div>
  );
}

export type SettingsSection =
  | "site"
  | "theme"
  | "navigation"
  | "pages"
  | "listings"
  | "board"
  | "detail";

export function SettingsFormBody({
  section,
  settings,
  setSettings,
}: {
  section: SettingsSection;
  settings: SiteSettings;
  setSettings: (s: SiteSettings) => void;
}) {
  if (section === "site") {
    return (
      <div className="space-y-8">
        <SectionTitle title="Brand & identity" />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Site name" value={settings.general.siteName} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, siteName: v } })} />
          <Field label="Tagline" value={settings.general.tagline} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, tagline: v } })} />
          <Field label="Logo URL" value={settings.general.logoUrl} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, logoUrl: v } })} hint="Path under public/ or full image URL" />
          <Field label="Logo alt text" value={settings.general.logoAlt} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, logoAlt: v } })} />
          <Field label="Contact email" value={settings.general.contactEmail} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, contactEmail: v } })} />
          <Field label="Response time" value={settings.general.responseTime} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, responseTime: v } })} />
          <Field label="SEO title" value={settings.general.seoTitle} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, seoTitle: v } })} />
          <Field label="SEO description" value={settings.general.seoDescription} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, seoDescription: v } })} multiline />
          <Field label="Footer blurb" value={settings.general.footerBlurb} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, footerBlurb: v } })} multiline />
          <Field label="Newsletter blurb" value={settings.general.newsletterBlurb} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, newsletterBlurb: v } })} multiline />
          <Field label="Copyright note" value={settings.general.copyrightNote} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, copyrightNote: v } })} />
        </div>
      </div>
    );
  }

  if (section === "theme") {
    return (
      <div className="space-y-6">
        <SectionTitle title="Brand colors" copy="Applied site-wide via CSS variables." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(settings.theme) as Array<keyof SiteSettings["theme"]>).map((key) => (
            <ColorField
              key={key}
              label={key}
              value={settings.theme[key]}
              onChange={(v) => setSettings({ ...settings, theme: { ...settings.theme, [key]: v } })}
            />
          ))}
        </div>
      </div>
    );
  }

  if (section === "navigation") {
    return (
      <div className="space-y-10">
        <SectionTitle title="Header navigation" />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Donate button label" value={settings.navigation.donateLabel} onChange={(v) => setSettings({ ...settings, navigation: { ...settings.navigation, donateLabel: v } })} />
          <Field label="Donate button link" value={settings.navigation.donateHref} onChange={(v) => setSettings({ ...settings, navigation: { ...settings.navigation, donateHref: v } })} />
        </div>
        <NavLinksEditor label="Primary nav links" links={settings.navigation.primaryLinks} onChange={(links) => setSettings({ ...settings, navigation: { ...settings.navigation, primaryLinks: links } })} />
        <SectionTitle title="Footer navigation" />
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Explore heading" value={settings.footer.exploreHeading} onChange={(v) => setSettings({ ...settings, footer: { ...settings.footer, exploreHeading: v } })} />
          <Field label="Take part heading" value={settings.footer.takePartHeading} onChange={(v) => setSettings({ ...settings, footer: { ...settings.footer, takePartHeading: v } })} />
          <Field label="Newsletter heading" value={settings.footer.newsletterHeading} onChange={(v) => setSettings({ ...settings, footer: { ...settings.footer, newsletterHeading: v } })} />
        </div>
        <NavLinksEditor label="Explore links" links={settings.footer.exploreLinks} onChange={(links) => setSettings({ ...settings, footer: { ...settings.footer, exploreLinks: links } })} />
        <NavLinksEditor label="Take part links" links={settings.footer.takePartLinks} onChange={(links) => setSettings({ ...settings, footer: { ...settings.footer, takePartLinks: links } })} />
      </div>
    );
  }

  if (section === "pages") {
    return (
      <div className="space-y-12">
        <div className="space-y-4">
          <SectionTitle title="Home page" />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Hero headline" value={settings.home.heroHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroHeadline: v } })} />
            <Field label="Hero subhead" value={settings.home.heroSubhead} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroSubhead: v } })} multiline />
            <Field label="Hero image URL" value={settings.home.heroImage} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroImage: v } })} />
            <Field label="Focus headline" value={settings.home.focusHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, focusHeadline: v } })} />
            <Field label="Approach headline" value={settings.home.approachHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, approachHeadline: v } })} />
            <Field label="Bottom CTA headline" value={settings.home.ctaHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, ctaHeadline: v } })} />
          </div>
          <NavLinksEditor label="Bottom CTA buttons" links={settings.home.ctaButtons} onChange={(ctaButtons) => setSettings({ ...settings, home: { ...settings.home, ctaButtons } })} />
        </div>
        <div className="space-y-4">
          <SectionTitle title="About" />
          <PageIntroFields prefix="About" values={settings.about} onChange={(p) => setSettings({ ...settings, about: { ...settings.about, ...p } })} />
        </div>
        <div className="space-y-4">
          <SectionTitle title="Contact" />
          <PageIntroFields prefix="Contact" values={settings.contact} onChange={(p) => setSettings({ ...settings, contact: { ...settings.contact, ...p } })} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Email label" value={settings.contact.emailLabel} onChange={(v) => setSettings({ ...settings, contact: { ...settings.contact, emailLabel: v } })} />
            <Field label="Response time label" value={settings.contact.responseTimeLabel} onChange={(v) => setSettings({ ...settings, contact: { ...settings.contact, responseTimeLabel: v } })} />
          </div>
        </div>
        <div className="space-y-4">
          <SectionTitle title="Get involved" />
          <PageIntroFields prefix="Get involved" values={settings.getInvolved} onChange={(p) => setSettings({ ...settings, getInvolved: { ...settings.getInvolved, ...p } })} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Donate block headline" value={settings.getInvolved.donateHeadline} onChange={(v) => setSettings({ ...settings, getInvolved: { ...settings.getInvolved, donateHeadline: v } })} />
            <Field label="Donate block copy" value={settings.getInvolved.donateCopy} onChange={(v) => setSettings({ ...settings, getInvolved: { ...settings.getInvolved, donateCopy: v } })} multiline />
          </div>
        </div>
      </div>
    );
  }

  if (section === "listings") {
  const listingPages = [
    { key: "donate" as const, label: "Donate" },
    { key: "donateThanks" as const, label: "Donate thank-you" },
    { key: "volunteer" as const, label: "Volunteer" },
    { key: "programs" as const, label: "Programs list" },
    { key: "events" as const, label: "Events list" },
    { key: "news" as const, label: "News list" },
    { key: "impact" as const, label: "Impact" },
    { key: "reports" as const, label: "Reports" },
  ];

    return (
      <div className="space-y-12">
        {listingPages.map(({ key, label }) => {
          const page = settings[key];
          return (
            <div key={key} className="space-y-4 border-t border-line pt-8 first:border-t-0 first:pt-0">
              <SectionTitle title={label} />
              <PageIntroFields
                prefix={label}
                values={page}
                onChange={(p) => setSettings({ ...settings, [key]: { ...page, ...p } })}
              />
              {"bullets" in page && (
                <BulletsEditor
                  label="Bullets"
                  bullets={page.bullets}
                  onChange={(bullets) => setSettings({ ...settings, [key]: { ...page, bullets } })}
                />
              )}
              {"footerNote" in page && (
                <Field label="Footer note" value={page.footerNote} onChange={(v) => setSettings({ ...settings, [key]: { ...page, footerNote: v } })} multiline />
              )}
              {"receiptNote" in page && (
                <Field label="Receipt note" value={page.receiptNote} onChange={(v) => setSettings({ ...settings, [key]: { ...page, receiptNote: v } })} />
              )}
              {"ctaPrimary" in page && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Primary CTA label" value={page.ctaPrimary} onChange={(v) => setSettings({ ...settings, [key]: { ...page, ctaPrimary: v } })} />
                  <Field label="Primary CTA link" value={page.ctaPrimaryHref} onChange={(v) => setSettings({ ...settings, [key]: { ...page, ctaPrimaryHref: v } })} />
                  <Field label="Secondary CTA label" value={page.ctaSecondary} onChange={(v) => setSettings({ ...settings, [key]: { ...page, ctaSecondary: v } })} />
                  <Field label="Secondary CTA link" value={page.ctaSecondaryHref} onChange={(v) => setSettings({ ...settings, [key]: { ...page, ctaSecondaryHref: v } })} />
                </div>
              )}
              {"bottomCtaLabel" in page && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Bottom CTA label" value={page.bottomCtaLabel} onChange={(v) => setSettings({ ...settings, [key]: { ...page, bottomCtaLabel: v } })} />
                  <Field label="Bottom CTA link" value={page.bottomCtaHref} onChange={(v) => setSettings({ ...settings, [key]: { ...page, bottomCtaHref: v } })} />
                </div>
              )}
              {"registerOpenCta" in page && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Open registration CTA" value={page.registerOpenCta} onChange={(v) => setSettings({ ...settings, [key]: { ...page, registerOpenCta: v } })} />
                  <Field label="Closed registration CTA" value={page.registerClosedCta} onChange={(v) => setSettings({ ...settings, [key]: { ...page, registerClosedCta: v } })} />
                </div>
              )}
              {"itemCtaLabel" in page && (
                <Field label="Item CTA label" value={page.itemCtaLabel} onChange={(v) => setSettings({ ...settings, [key]: { ...page, itemCtaLabel: v } })} />
              )}
              {"mapHeadline" in page && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Map eyebrow" value={page.mapEyebrow} onChange={(v) => setSettings({ ...settings, [key]: { ...page, mapEyebrow: v } })} />
                  <Field label="Map headline" value={page.mapHeadline} onChange={(v) => setSettings({ ...settings, [key]: { ...page, mapHeadline: v } })} />
                  <Field label="Story CTA label" value={page.storyCtaLabel} onChange={(v) => setSettings({ ...settings, [key]: { ...page, storyCtaLabel: v } })} />
                </div>
              )}
              {"annualReportsTitle" in page && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Annual reports title" value={page.annualReportsTitle} onChange={(v) => setSettings({ ...settings, [key]: { ...page, annualReportsTitle: v } })} />
                  <Field label="Download button label" value={page.downloadLabel} onChange={(v) => setSettings({ ...settings, [key]: { ...page, downloadLabel: v } })} />
                  <Field label="Admin note" value={page.adminNote} onChange={(v) => setSettings({ ...settings, [key]: { ...page, adminNote: v } })} multiline />
                  <Field label="Contact prompt" value={page.contactPrompt} onChange={(v) => setSettings({ ...settings, [key]: { ...page, contactPrompt: v } })} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (section === "board") {
    return (
      <div className="space-y-6">
        <SectionTitle title="Board members" />
        <Field label="Board section title" value={settings.reports.boardTitle} onChange={(v) => setSettings({ ...settings, reports: { ...settings.reports, boardTitle: v } })} />
        {settings.board.map((member, index) => (
          <div key={index} className="grid gap-3 border border-line bg-white/60 p-4 md:grid-cols-2">
            <Field label="Name" value={member.name} onChange={(v) => { const board = [...settings.board]; board[index] = { ...board[index], name: v }; setSettings({ ...settings, board }); }} />
            <Field label="Role" value={member.role} onChange={(v) => { const board = [...settings.board]; board[index] = { ...board[index], role: v }; setSettings({ ...settings, board }); }} />
            <div className="md:col-span-2">
              <Field label="Bio" value={member.bio} onChange={(v) => { const board = [...settings.board]; board[index] = { ...board[index], bio: v }; setSettings({ ...settings, board }); }} multiline />
            </div>
            <button type="button" className="text-sm font-semibold text-accent" onClick={() => setSettings({ ...settings, board: settings.board.filter((_, i) => i !== index) })}>Remove member</button>
          </div>
        ))}
        <button type="button" className="border border-line px-4 py-2 text-sm font-semibold" onClick={() => setSettings({ ...settings, board: [...settings.board, { name: "", role: "Board member", bio: "" }] })}>Add board member</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SectionTitle title="Detail page chrome" copy="Back links and CTAs on individual program, event, and news pages." />
      <div className="grid gap-4 md:grid-cols-2">
        {(Object.keys(settings.detailPages) as Array<keyof SiteSettings["detailPages"]>).map((key) => (
          <Field
            key={key}
            label={key}
            value={settings.detailPages[key]}
            onChange={(v) => setSettings({ ...settings, detailPages: { ...settings.detailPages, [key]: v } })}
          />
        ))}
      </div>
    </div>
  );
}
