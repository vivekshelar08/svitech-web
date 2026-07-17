"use client";

import {
  AdminButton,
  adminInputClass,
  adminTextareaClass,
} from "@/components/admin/admin-ui";
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
          className={adminTextareaClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={adminInputClass}
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
          className="h-10 w-14 cursor-pointer rounded-lg border border-line bg-white shadow-sm"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${adminInputClass} mt-0 flex-1 font-mono`}
        />
      </div>
    </label>
  );
}

export function SectionTitle({ title, copy }: { title: string; copy?: string }) {
  return (
    <div className="border-b border-line/60 pb-4">
      <h2 className="font-display text-lg font-bold tracking-tight text-ink">{title}</h2>
      {copy && <p className="mt-1 text-sm leading-relaxed text-ink-muted">{copy}</p>}
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
          className="grid gap-3 rounded-xl border border-line/70 bg-surface/40 p-4 md:grid-cols-[1fr_1fr_auto]"
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
          <AdminButton
            type="button"
            variant="danger"
            size="sm"
            className="self-end"
            onClick={() => onChange(links.filter((_, i) => i !== index))}
          >
            Remove
          </AdminButton>
        </div>
      ))}
      <AdminButton
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => onChange([...links, { label: "", href: "/" }])}
      >
        Add link
      </AdminButton>
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
            className={`${adminInputClass} mt-0 flex-1`}
          />
          <AdminButton
            type="button"
            variant="danger"
            size="sm"
            onClick={() => onChange(bullets.filter((_, i) => i !== index))}
          >
            ×
          </AdminButton>
        </div>
      ))}
      <AdminButton
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => onChange([...bullets, ""])}
      >
        Add bullet
      </AdminButton>
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
        <SectionTitle title="Sticky donate bar" copy="Appears after scrolling — like Seva.org. Hidden on donate and admin pages." />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex items-center gap-3 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={settings.navigation.stickyDonate.enabled}
              onChange={(e) => setSettings({
                ...settings,
                navigation: {
                  ...settings.navigation,
                  stickyDonate: { ...settings.navigation.stickyDonate, enabled: e.target.checked },
                },
              })}
              className="h-4 w-4 rounded border-line"
            />
            Enabled
          </label>
          <Field label="CTA label" value={settings.navigation.stickyDonate.ctaLabel} onChange={(v) => setSettings({
            ...settings,
            navigation: {
              ...settings.navigation,
              stickyDonate: { ...settings.navigation.stickyDonate, ctaLabel: v },
            },
          })} />
          <Field label="CTA link" value={settings.navigation.stickyDonate.ctaHref} onChange={(v) => setSettings({
            ...settings,
            navigation: {
              ...settings.navigation,
              stickyDonate: { ...settings.navigation.stickyDonate, ctaHref: v },
            },
          })} />
          <Field label="Message" value={settings.navigation.stickyDonate.message} onChange={(v) => setSettings({
            ...settings,
            navigation: {
              ...settings.navigation,
              stickyDonate: { ...settings.navigation.stickyDonate, message: v },
            },
          })} multiline />
        </div>
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
          <SectionTitle title="Impact stats band" copy="Large counters shown below the hero — inspired by Smile Foundation and Pratham." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" value={settings.home.impactStatsEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, impactStatsEyebrow: v } })} />
            <Field label="Headline" value={settings.home.impactStatsHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, impactStatsHeadline: v } })} />
          </div>
          {settings.home.impactStats.map((stat, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-line/70 bg-surface/40 p-4 md:grid-cols-[1fr_1fr_2fr_auto]">
              <Field label="Value" value={stat.value} onChange={(v) => {
                const next = [...settings.home.impactStats];
                next[index] = { ...next[index], value: v };
                setSettings({ ...settings, home: { ...settings.home, impactStats: next } });
              }} />
              <Field label="Suffix" value={stat.suffix || ""} onChange={(v) => {
                const next = [...settings.home.impactStats];
                next[index] = { ...next[index], suffix: v || undefined };
                setSettings({ ...settings, home: { ...settings.home, impactStats: next } });
              }} hint="e.g. + or Lac+" />
              <Field label="Label" value={stat.label} onChange={(v) => {
                const next = [...settings.home.impactStats];
                next[index] = { ...next[index], label: v };
                setSettings({ ...settings, home: { ...settings.home, impactStats: next } });
              }} />
              <div className="flex items-end">
                <AdminButton variant="ghost" onClick={() => {
                  const next = settings.home.impactStats.filter((_, i) => i !== index);
                  setSettings({ ...settings, home: { ...settings.home, impactStats: next } });
                }}>Remove</AdminButton>
              </div>
            </div>
          ))}
          <AdminButton variant="secondary" onClick={() => setSettings({
            ...settings,
            home: {
              ...settings.home,
              impactStats: [...settings.home.impactStats, { value: "0", label: "New stat" }],
            },
          })}>Add stat</AdminButton>
        </div>
        <div className="space-y-4">
          <SectionTitle title="Programmes preview" copy="Card grid pulled from your Programs content." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" value={settings.home.programsEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, programsEyebrow: v } })} />
            <Field label="Headline" value={settings.home.programsHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, programsHeadline: v } })} />
            <Field label="Intro" value={settings.home.programsIntro} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, programsIntro: v } })} multiline />
            <Field label="View all label" value={settings.home.programsCtaLabel} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, programsCtaLabel: v } })} />
          </div>
        </div>
        <div className="space-y-4">
          <SectionTitle title="News spotlight" />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" value={settings.home.spotlightEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, spotlightEyebrow: v } })} />
            <Field label="Headline" value={settings.home.spotlightHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, spotlightHeadline: v } })} />
            <Field label="View all label" value={settings.home.spotlightViewAllLabel} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, spotlightViewAllLabel: v } })} />
          </div>
        </div>
        <div className="space-y-4">
          <SectionTitle title="Partner quote" copy="Testimonial strip — similar to Seva Foundation endorsements." />
          <div className="grid gap-4">
            <Field label="Eyebrow" value={settings.home.quoteEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, quoteEyebrow: v } })} />
            <Field label="Quote" value={settings.home.quote.text} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, quote: { ...settings.home.quote, text: v } } })} multiline />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Attribution" value={settings.home.quote.attribution} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, quote: { ...settings.home.quote, attribution: v } } })} />
              <Field label="Role / location" value={settings.home.quote.role || ""} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, quote: { ...settings.home.quote, role: v } } })} />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <SectionTitle title="Donate strip" copy="Quick-give band with preset amounts — like Seva.org." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Headline" value={settings.home.donateStripHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, donateStripHeadline: v } })} />
            <Field label="Copy" value={settings.home.donateStripCopy} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, donateStripCopy: v } })} multiline />
            <Field label="Button label" value={settings.home.donateStripLabel} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, donateStripLabel: v } })} />
            <Field label="Preset amounts (comma-separated)" value={settings.home.donateStripAmounts.join(", ")} onChange={(v) => {
              const amounts = v.split(",").map((n) => Number(n.trim())).filter((n) => Number.isFinite(n) && n > 0);
              setSettings({ ...settings, home: { ...settings.home, donateStripAmounts: amounts } });
            }} hint="e.g. 500, 1000, 2500, 5000" />
          </div>
        </div>
        <div className="space-y-4">
          <SectionTitle title="Campaign cards" copy="Support-a-cause grid — like Smile Foundation campaigns." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" value={settings.home.campaignsEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, campaignsEyebrow: v } })} />
            <Field label="Headline" value={settings.home.campaignsHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, campaignsHeadline: v } })} />
          </div>
          {settings.home.campaigns.map((campaign, index) => (
            <div key={index} className="space-y-3 rounded-xl border border-line/70 bg-surface/40 p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Title" value={campaign.title} onChange={(v) => {
                  const next = [...settings.home.campaigns];
                  next[index] = { ...next[index], title: v };
                  setSettings({ ...settings, home: { ...settings.home, campaigns: next } });
                }} />
                <Field label="Link" value={campaign.href} onChange={(v) => {
                  const next = [...settings.home.campaigns];
                  next[index] = { ...next[index], href: v };
                  setSettings({ ...settings, home: { ...settings.home, campaigns: next } });
                }} />
                <Field label="CTA label" value={campaign.cta} onChange={(v) => {
                  const next = [...settings.home.campaigns];
                  next[index] = { ...next[index], cta: v };
                  setSettings({ ...settings, home: { ...settings.home, campaigns: next } });
                }} />
                <Field label="Image URL" value={campaign.image || ""} onChange={(v) => {
                  const next = [...settings.home.campaigns];
                  next[index] = { ...next[index], image: v || undefined };
                  setSettings({ ...settings, home: { ...settings.home, campaigns: next } });
                }} />
              </div>
              <Field label="Copy" value={campaign.copy} onChange={(v) => {
                const next = [...settings.home.campaigns];
                next[index] = { ...next[index], copy: v };
                setSettings({ ...settings, home: { ...settings.home, campaigns: next } });
              }} multiline />
              <AdminButton variant="ghost" onClick={() => setSettings({
                ...settings,
                home: {
                  ...settings.home,
                  campaigns: settings.home.campaigns.filter((_, i) => i !== index),
                },
              })}>Remove campaign</AdminButton>
            </div>
          ))}
          <AdminButton variant="secondary" onClick={() => setSettings({
            ...settings,
            home: {
              ...settings.home,
              campaigns: [
                ...settings.home.campaigns,
                { title: "New campaign", copy: "", href: "/programs", cta: "Know more →" },
              ],
            },
          })}>Add campaign</AdminButton>
        </div>
        <div className="space-y-4">
          <SectionTitle title="Accreditations & partners" copy="Trust strip — like Smile Foundation empanelment section." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Accreditations eyebrow" value={settings.home.accreditationsEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, accreditationsEyebrow: v } })} />
            <Field label="Accreditations headline" value={settings.home.accreditationsHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, accreditationsHeadline: v } })} />
            <Field label="Partners eyebrow" value={settings.home.partnersEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, partnersEyebrow: v } })} />
          </div>
          {settings.home.accreditations.map((item, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-line/70 bg-surface/40 p-4 md:grid-cols-2">
              <Field label="Name" value={item.name} onChange={(v) => {
                const next = [...settings.home.accreditations];
                next[index] = { ...next[index], name: v };
                setSettings({ ...settings, home: { ...settings.home, accreditations: next } });
              }} />
              <Field label="Description" value={item.description} onChange={(v) => {
                const next = [...settings.home.accreditations];
                next[index] = { ...next[index], description: v };
                setSettings({ ...settings, home: { ...settings.home, accreditations: next } });
              }} multiline />
              <div className="md:col-span-2">
                <AdminButton variant="ghost" onClick={() => setSettings({
                  ...settings,
                  home: {
                    ...settings.home,
                    accreditations: settings.home.accreditations.filter((_, i) => i !== index),
                  },
                })}>Remove accreditation</AdminButton>
              </div>
            </div>
          ))}
          <AdminButton variant="secondary" onClick={() => setSettings({
            ...settings,
            home: {
              ...settings.home,
              accreditations: [
                ...settings.home.accreditations,
                { name: "New accreditation", description: "" },
              ],
            },
          })}>Add accreditation</AdminButton>
          {settings.home.partners.map((partner, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-line/70 bg-surface/40 p-4 md:grid-cols-[1fr_1fr_auto]">
              <Field label="Partner name" value={partner.name} onChange={(v) => {
                const next = [...settings.home.partners];
                next[index] = { ...next[index], name: v };
                setSettings({ ...settings, home: { ...settings.home, partners: next } });
              }} />
              <Field label="Link (optional)" value={partner.href || ""} onChange={(v) => {
                const next = [...settings.home.partners];
                next[index] = { ...next[index], href: v || undefined };
                setSettings({ ...settings, home: { ...settings.home, partners: next } });
              }} />
              <div className="flex items-end">
                <AdminButton variant="ghost" onClick={() => setSettings({
                  ...settings,
                  home: {
                    ...settings.home,
                    partners: settings.home.partners.filter((_, i) => i !== index),
                  },
                })}>Remove</AdminButton>
              </div>
            </div>
          ))}
          <AdminButton variant="secondary" onClick={() => setSettings({
            ...settings,
            home: {
              ...settings.home,
              partners: [...settings.home.partners, { name: "New partner" }],
            },
          })}>Add partner</AdminButton>
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
          <div key={index} className="grid gap-3 rounded-xl border border-line/70 bg-surface/40 p-4 md:grid-cols-2">
            <Field label="Name" value={member.name} onChange={(v) => { const board = [...settings.board]; board[index] = { ...board[index], name: v }; setSettings({ ...settings, board }); }} />
            <Field label="Role" value={member.role} onChange={(v) => { const board = [...settings.board]; board[index] = { ...board[index], role: v }; setSettings({ ...settings, board }); }} />
            <div className="md:col-span-2">
              <Field label="Bio" value={member.bio} onChange={(v) => { const board = [...settings.board]; board[index] = { ...board[index], bio: v }; setSettings({ ...settings, board }); }} multiline />
            </div>
            <AdminButton type="button" variant="danger" size="sm" onClick={() => setSettings({ ...settings, board: settings.board.filter((_, i) => i !== index) })}>Remove member</AdminButton>
          </div>
        ))}
        <AdminButton type="button" variant="secondary" size="sm" onClick={() => setSettings({ ...settings, board: [...settings.board, { name: "", role: "Board member", bio: "" }] })}>Add board member</AdminButton>
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
