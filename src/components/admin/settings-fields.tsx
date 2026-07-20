"use client";

import {
  AdminButton,
  adminInputClass,
  adminTextareaClass,
} from "@/components/admin/admin-ui";
import {
  MediaField,
  ReorderButtons,
  SeoHint,
  moveItem,
} from "@/components/admin/MediaField";
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
          <div className="flex items-end gap-1">
            <ReorderButtons
              index={index}
              total={links.length}
              onMove={(from, to) => onChange(moveItem(links, from, to))}
            />
            <AdminButton
              type="button"
              variant="danger"
              size="sm"
              onClick={() => onChange(links.filter((_, i) => i !== index))}
            >
              Remove
            </AdminButton>
          </div>
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
  | "home"
  | "site"
  | "theme"
  | "navigation"
  | "pages"
  | "listings"
  | "board"
  | "detail"
  | "popup"
  | "cache";


function HomeExtraBlocks({
  settings,
  setSettings,
}: {
  settings: SiteSettings;
  setSettings: (s: SiteSettings) => void;
}) {
  return (
    <>
      <div className="space-y-4">
        <SectionTitle title="Bottom CTA" />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Bottom CTA headline"
            value={settings.home.ctaHeadline}
            onChange={(v) =>
              setSettings({ ...settings, home: { ...settings.home, ctaHeadline: v } })
            }
          />
          <Field
            label="Bottom CTA copy"
            value={settings.home.ctaCopy}
            onChange={(v) => setSettings({ ...settings, home: { ...settings.home, ctaCopy: v } })}
            multiline
          />
        </div>
        <NavLinksEditor
          label="Bottom CTA buttons"
          links={settings.home.ctaButtons}
          onChange={(ctaButtons) =>
            setSettings({ ...settings, home: { ...settings.home, ctaButtons } })
          }
        />
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
            <Field label="View all link" value={settings.home.programsCtaHref} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, programsCtaHref: v } })} />
          </div>
        </div>
        <div className="space-y-4">
          <SectionTitle title="News spotlight" />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" value={settings.home.spotlightEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, spotlightEyebrow: v } })} />
            <Field label="Headline" value={settings.home.spotlightHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, spotlightHeadline: v } })} />
            <Field label="View all label" value={settings.home.spotlightViewAllLabel} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, spotlightViewAllLabel: v } })} />
            <Field label="View all link" value={settings.home.spotlightViewAllHref} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, spotlightViewAllHref: v } })} />
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
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Campaign {index + 1}
                </p>
                <div className="flex items-center gap-2">
                  <ReorderButtons
                    index={index}
                    total={settings.home.campaigns.length}
                    onMove={(from, to) =>
                      setSettings({
                        ...settings,
                        home: { ...settings.home, campaigns: moveItem(settings.home.campaigns, from, to) },
                      })
                    }
                  />
                  <AdminButton
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        home: {
                          ...settings.home,
                          campaigns: settings.home.campaigns.filter((_, i) => i !== index),
                        },
                      })
                    }
                  >
                    Remove
                  </AdminButton>
                </div>
              </div>
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
                <div className="md:col-span-2">
                  <MediaField
                    label="Campaign image"
                    value={campaign.image || ""}
                    onChange={(v) => {
                      const next = [...settings.home.campaigns];
                      next[index] = { ...next[index], image: v || undefined };
                      setSettings({ ...settings, home: { ...settings.home, campaigns: next } });
                    }}
                    folder="campaigns"
                  />
                </div>
              </div>
              <Field label="Copy" value={campaign.copy} onChange={(v) => {
                const next = [...settings.home.campaigns];
                next[index] = { ...next[index], copy: v };
                setSettings({ ...settings, home: { ...settings.home, campaigns: next } });
              }} multiline />
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
          <SectionTitle title="Accreditations & partners" copy="Trust strip — logos optional; upload or paste URL." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Accreditations eyebrow" value={settings.home.accreditationsEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, accreditationsEyebrow: v } })} />
            <Field label="Accreditations headline" value={settings.home.accreditationsHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, accreditationsHeadline: v } })} />
            <Field label="Partners eyebrow" value={settings.home.partnersEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, partnersEyebrow: v } })} />
          </div>
          {settings.home.accreditations.map((item, index) => (
            <div key={index} className="space-y-3 rounded-xl border border-line/70 bg-surface/40 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Accreditation {index + 1}
                </p>
                <div className="flex items-center gap-2">
                  <ReorderButtons
                    index={index}
                    total={settings.home.accreditations.length}
                    onMove={(from, to) =>
                      setSettings({
                        ...settings,
                        home: {
                          ...settings.home,
                          accreditations: moveItem(settings.home.accreditations, from, to),
                        },
                      })
                    }
                  />
                  <AdminButton variant="ghost" size="sm" onClick={() => setSettings({
                    ...settings,
                    home: {
                      ...settings.home,
                      accreditations: settings.home.accreditations.filter((_, i) => i !== index),
                    },
                  })}>Remove</AdminButton>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
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
                  <MediaField
                    label="Logo (optional)"
                    value={item.logo || ""}
                    onChange={(v) => {
                      const next = [...settings.home.accreditations];
                      next[index] = { ...next[index], logo: v || undefined };
                      setSettings({ ...settings, home: { ...settings.home, accreditations: next } });
                    }}
                    folder="trust"
                  />
                </div>
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
            <div key={index} className="space-y-3 rounded-xl border border-line/70 bg-surface/40 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                  Partner {index + 1}
                </p>
                <div className="flex items-center gap-2">
                  <ReorderButtons
                    index={index}
                    total={settings.home.partners.length}
                    onMove={(from, to) =>
                      setSettings({
                        ...settings,
                        home: { ...settings.home, partners: moveItem(settings.home.partners, from, to) },
                      })
                    }
                  />
                  <AdminButton variant="ghost" size="sm" onClick={() => setSettings({
                    ...settings,
                    home: {
                      ...settings.home,
                      partners: settings.home.partners.filter((_, i) => i !== index),
                    },
                  })}>Remove</AdminButton>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
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
                <div className="md:col-span-2">
                  <MediaField
                    label="Logo image (optional)"
                    value={partner.image || ""}
                    onChange={(v) => {
                      const next = [...settings.home.partners];
                      next[index] = { ...next[index], image: v || undefined };
                      setSettings({ ...settings, home: { ...settings.home, partners: next } });
                    }}
                    folder="partners"
                  />
                </div>
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
            </>
  );
}

export function SettingsFormBody({
  section,
  settings,
  setSettings,
}: {
  section: SettingsSection;
  settings: SiteSettings;
  setSettings: (s: SiteSettings) => void;
}) {
  if (section === "home") {
    return (
      <div className="space-y-12">
        <div className="rounded-xl border border-brand/15 bg-brand/5 px-4 py-3 text-sm text-ink-muted">
          Edit the public homepage in one place — hero photo, focus-area images, campaigns, and CTAs.
          Changes go live after you save.
        </div>
        <div className="space-y-4">
          <SectionTitle title="Hero" copy="Full-bleed background image, headline, and primary actions." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Hero headline" value={settings.home.heroHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroHeadline: v } })} />
            <Field label="Hero subhead" value={settings.home.heroSubhead} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroSubhead: v } })} multiline />
            <div className="md:col-span-2">
              <MediaField
                label="Hero image"
                value={settings.home.heroImage}
                onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroImage: v } })}
                folder="home"
              />
            </div>
            <Field label="Hero image alt" value={settings.home.heroImageAlt} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroImageAlt: v } })} />
            <Field label="Primary CTA label" value={settings.home.heroCtaPrimary} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroCtaPrimary: v } })} />
            <Field label="Primary CTA link" value={settings.home.heroCtaPrimaryHref} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroCtaPrimaryHref: v } })} />
            <Field label="Secondary CTA label" value={settings.home.heroCtaSecondary} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroCtaSecondary: v } })} />
            <Field label="Secondary CTA link" value={settings.home.heroCtaSecondaryHref} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, heroCtaSecondaryHref: v } })} />
          </div>

          <SectionTitle title="Focus areas" copy="Image cards under the hero — like an “areas of work” strip. Upload a photo per area." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Focus eyebrow" value={settings.home.focusEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, focusEyebrow: v } })} />
            <Field label="Focus headline" value={settings.home.focusHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, focusHeadline: v } })} />
            <Field label="Focus intro" value={settings.home.focusIntro} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, focusIntro: v } })} multiline />
          </div>
          {settings.home.focusAreas.map((area, index) => (
            <div key={index} className="space-y-3 rounded-xl border border-line/70 bg-surface/40 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">Area {index + 1}</p>
                <div className="flex items-center gap-2">
                  <ReorderButtons
                    index={index}
                    total={settings.home.focusAreas.length}
                    onMove={(from, to) =>
                      setSettings({
                        ...settings,
                        home: { ...settings.home, focusAreas: moveItem(settings.home.focusAreas, from, to) },
                      })
                    }
                  />
                  <AdminButton
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        home: {
                          ...settings.home,
                          focusAreas: settings.home.focusAreas.filter((_, i) => i !== index),
                        },
                      })
                    }
                  >
                    Remove
                  </AdminButton>
                </div>
              </div>
              <Field
                label="Title"
                value={area.title}
                onChange={(v) => {
                  const next = [...settings.home.focusAreas];
                  next[index] = { ...next[index], title: v };
                  setSettings({ ...settings, home: { ...settings.home, focusAreas: next } });
                }}
              />
              <Field
                label="Copy"
                value={area.copy}
                onChange={(v) => {
                  const next = [...settings.home.focusAreas];
                  next[index] = { ...next[index], copy: v };
                  setSettings({ ...settings, home: { ...settings.home, focusAreas: next } });
                }}
                multiline
              />
              <MediaField
                label="Area image"
                value={area.image || ""}
                onChange={(v) => {
                  const next = [...settings.home.focusAreas];
                  next[index] = { ...next[index], image: v || undefined };
                  setSettings({ ...settings, home: { ...settings.home, focusAreas: next } });
                }}
                folder="home"
              />
              <Field
                label="Link (optional)"
                value={area.href || ""}
                onChange={(v) => {
                  const next = [...settings.home.focusAreas];
                  next[index] = { ...next[index], href: v || undefined };
                  setSettings({ ...settings, home: { ...settings.home, focusAreas: next } });
                }}
                hint="e.g. /programs/financial-digital-inclusion"
              />
            </div>
          ))}
          <AdminButton
            variant="secondary"
            size="sm"
            onClick={() =>
              setSettings({
                ...settings,
                home: {
                  ...settings.home,
                  focusAreas: [...settings.home.focusAreas, { title: "New focus area", copy: "", image: "", href: "" }],
                },
              })
            }
          >
            Add focus area
          </AdminButton>

          <label className="flex items-center gap-3 rounded-xl border border-line/70 bg-surface/40 px-4 py-3 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={settings.home.missionBandEnabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  home: { ...settings.home, missionBandEnabled: e.target.checked },
                })
              }
              className="h-4 w-4 rounded border-line"
            />
            Show Mission & Vision band on homepage (uses About page mission/vision copy)
          </label>

          <SectionTitle title="Approach block" />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Approach eyebrow" value={settings.home.approachEyebrow} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, approachEyebrow: v } })} />
            <Field label="Approach headline" value={settings.home.approachHeadline} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, approachHeadline: v } })} />
            <Field label="Approach copy" value={settings.home.approachCopy} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, approachCopy: v } })} multiline />
            <div className="md:col-span-2">
              <MediaField
                label="Approach image"
                value={settings.home.approachImage}
                onChange={(v) => setSettings({ ...settings, home: { ...settings.home, approachImage: v } })}
                folder="home"
              />
            </div>
            <Field label="Approach image alt" value={settings.home.approachImageAlt} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, approachImageAlt: v } })} />
            <Field label="Approach link label" value={settings.home.approachLinkLabel} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, approachLinkLabel: v } })} />
            <Field label="Approach link href" value={settings.home.approachLinkHref} onChange={(v) => setSettings({ ...settings, home: { ...settings.home, approachLinkHref: v } })} />
          </div>
        </div>

        {/* Remaining homepage blocks reused from previous pages section */}
        <HomeExtraBlocks settings={settings} setSettings={setSettings} />
      </div>
    );
  }

  if (section === "popup") {
    return (
      <div className="space-y-6">
        <SectionTitle
          title="Site announcement popup"
          copy="Shows once per session (or per your frequency) when enabled. Toggle quickly from Dashboard too."
        />
        <label className="flex items-center gap-3 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={settings.popup.enabled}
            onChange={(e) =>
              setSettings({
                ...settings,
                popup: { ...settings.popup, enabled: e.target.checked },
              })
            }
            className="h-4 w-4 rounded border-line"
          />
          Popup enabled
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Title"
            value={settings.popup.title}
            onChange={(v) => setSettings({ ...settings, popup: { ...settings.popup, title: v } })}
          />
          <Field
            label="Body"
            value={settings.popup.body}
            onChange={(v) => setSettings({ ...settings, popup: { ...settings.popup, body: v } })}
            multiline
          />
          <div className="md:col-span-2">
            <MediaField
              label="Popup image (optional)"
              value={settings.popup.image}
              onChange={(v) => setSettings({ ...settings, popup: { ...settings.popup, image: v } })}
              folder="popup"
            />
          </div>
          <Field
            label="CTA label"
            value={settings.popup.ctaLabel}
            onChange={(v) => setSettings({ ...settings, popup: { ...settings.popup, ctaLabel: v } })}
          />
          <Field
            label="CTA link"
            value={settings.popup.ctaHref}
            onChange={(v) => setSettings({ ...settings, popup: { ...settings.popup, ctaHref: v } })}
          />
          <Field
            label="Dismiss label"
            value={settings.popup.dismissLabel}
            onChange={(v) => setSettings({ ...settings, popup: { ...settings.popup, dismissLabel: v } })}
          />
          <label className="block">
            <span className="text-sm font-medium text-ink">Show frequency</span>
            <select
              value={settings.popup.frequency}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  popup: {
                    ...settings.popup,
                    frequency: e.target.value as SiteSettings["popup"]["frequency"],
                  },
                })
              }
              className={adminInputClass}
            >
              <option value="session">Once per browser session</option>
              <option value="daily">Once per day</option>
              <option value="once">Once ever (until storage cleared)</option>
            </select>
          </label>
        </div>
      </div>
    );
  }

  if (section === "cache") {
    return (
      <div className="space-y-6">
        <SectionTitle
          title="Cache policy"
          copy="Live mode always fetches fresh content (recommended while editing). Cached mode can speed up traffic using ISR."
        />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-ink">Mode</span>
            <select
              value={settings.cache.mode}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  cache: {
                    ...settings.cache,
                    mode: e.target.value as SiteSettings["cache"]["mode"],
                  },
                })
              }
              className={adminInputClass}
            >
              <option value="live">Live — always fresh</option>
              <option value="cached">Cached — allow page revalidation</option>
            </select>
          </label>
          <Field
            label="Revalidate seconds (cached mode)"
            type="number"
            value={String(settings.cache.revalidateSeconds)}
            onChange={(v) =>
              setSettings({
                ...settings,
                cache: {
                  ...settings.cache,
                  revalidateSeconds: Math.max(10, Number(v) || 60),
                },
              })
            }
            hint="Hint for ISR pages (default 60). Purge anytime from Dashboard."
          />
          <label className="flex items-center gap-3 text-sm font-medium text-ink md:col-span-2">
            <input
              type="checkbox"
              checked={settings.cache.forceLiveChrome}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  cache: { ...settings.cache, forceLiveChrome: e.target.checked },
                })
              }
              className="h-4 w-4 rounded border-line"
            />
            Keep header / navigation refreshed via live chrome API (recommended)
          </label>
          <p className="text-xs text-ink-muted md:col-span-2">
            Use <strong>Live</strong> while editing the site. Switch to <strong>Cached</strong> for
            traffic speed, then use Dashboard → Purge cache after publishing big updates.
          </p>
        </div>
      </div>
    );
  }

  if (section === "site") {
    return (
      <div className="space-y-8">
        <SectionTitle title="Brand & identity" />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Site name" value={settings.general.siteName} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, siteName: v } })} />
          <Field label="Tagline" value={settings.general.tagline} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, tagline: v } })} />
          <div className="md:col-span-2">
            <MediaField
              label="Logo"
              value={settings.general.logoUrl}
              onChange={(v) => setSettings({ ...settings, general: { ...settings.general, logoUrl: v } })}
              hint="Upload a file or paste a public URL /public path"
              folder="brand"
            />
          </div>
          <Field label="Logo alt text" value={settings.general.logoAlt} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, logoAlt: v } })} />
          <Field label="Logo aria label" value={settings.general.logoAriaLabel} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, logoAriaLabel: v } })} />
          <Field label="Contact email" value={settings.general.contactEmail} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, contactEmail: v } })} />
          <Field label="Contact phone" value={settings.general.contactPhone} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, contactPhone: v } })} />
          <Field label="Office address" value={settings.general.officeAddress} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, officeAddress: v } })} multiline />
          <Field label="Response time" value={settings.general.responseTime} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, responseTime: v } })} />
          <div>
            <Field label="SEO title" value={settings.general.seoTitle} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, seoTitle: v } })} />
            <SeoHint value={settings.general.seoTitle} softLimit={60} />
          </div>
          <div>
            <Field label="SEO description" value={settings.general.seoDescription} onChange={(v) => setSettings({ ...settings, general: { ...settings.general, seoDescription: v } })} multiline />
            <SeoHint value={settings.general.seoDescription} softLimit={155} />
          </div>
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
        <div className="rounded-xl border border-brand/15 bg-brand/5 px-4 py-3 text-sm text-ink-muted">
          Homepage images and blocks moved to <strong>Home page</strong> in the sidebar.
        </div>
<div className="space-y-4">
          <SectionTitle title="About" />
          <PageIntroFields prefix="About" values={settings.about} onChange={(p) => setSettings({ ...settings, about: { ...settings.about, ...p } })} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <MediaField
                label="About hero image"
                value={settings.about.heroImage}
                onChange={(v) => setSettings({ ...settings, about: { ...settings.about, heroImage: v } })}
                folder="about"
              />
            </div>
            <Field label="Hero image alt" value={settings.about.heroImageAlt} onChange={(v) => setSettings({ ...settings, about: { ...settings.about, heroImageAlt: v } })} />
            <Field label="Mission title" value={settings.about.missionTitle} onChange={(v) => setSettings({ ...settings, about: { ...settings.about, missionTitle: v } })} />
            <Field label="Mission copy" value={settings.about.missionCopy} onChange={(v) => setSettings({ ...settings, about: { ...settings.about, missionCopy: v } })} multiline />
            <Field label="How title" value={settings.about.howTitle} onChange={(v) => setSettings({ ...settings, about: { ...settings.about, howTitle: v } })} />
            <Field label="How copy" value={settings.about.howCopy} onChange={(v) => setSettings({ ...settings, about: { ...settings.about, howCopy: v } })} multiline />
            <Field label="Values title" value={settings.about.valuesTitle} onChange={(v) => setSettings({ ...settings, about: { ...settings.about, valuesTitle: v } })} />
            <Field label="Governance title" value={settings.about.governanceTitle} onChange={(v) => setSettings({ ...settings, about: { ...settings.about, governanceTitle: v } })} />
            <Field label="Governance copy" value={settings.about.governanceCopy} onChange={(v) => setSettings({ ...settings, about: { ...settings.about, governanceCopy: v } })} multiline />
            <Field label="Governance link label" value={settings.about.governanceLinkLabel} onChange={(v) => setSettings({ ...settings, about: { ...settings.about, governanceLinkLabel: v } })} />
            <Field label="Programs link label" value={settings.about.programsLinkLabel} onChange={(v) => setSettings({ ...settings, about: { ...settings.about, programsLinkLabel: v } })} />
          </div>
          {settings.about.values.map((value, index) => (
            <div key={index} className="space-y-3 rounded-xl border border-line/70 bg-surface/40 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">Value {index + 1}</p>
                <div className="flex items-center gap-2">
                  <ReorderButtons
                    index={index}
                    total={settings.about.values.length}
                    onMove={(from, to) =>
                      setSettings({
                        ...settings,
                        about: { ...settings.about, values: moveItem(settings.about.values, from, to) },
                      })
                    }
                  />
                  <AdminButton
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        about: {
                          ...settings.about,
                          values: settings.about.values.filter((_, i) => i !== index),
                        },
                      })
                    }
                  >
                    Remove
                  </AdminButton>
                </div>
              </div>
              <Field
                label="Title"
                value={value.title}
                onChange={(v) => {
                  const next = [...settings.about.values];
                  next[index] = { ...next[index], title: v };
                  setSettings({ ...settings, about: { ...settings.about, values: next } });
                }}
              />
              <Field
                label="Copy"
                value={value.copy}
                onChange={(v) => {
                  const next = [...settings.about.values];
                  next[index] = { ...next[index], copy: v };
                  setSettings({ ...settings, about: { ...settings.about, values: next } });
                }}
                multiline
              />
            </div>
          ))}
          <AdminButton
            variant="secondary"
            size="sm"
            onClick={() =>
              setSettings({
                ...settings,
                about: {
                  ...settings.about,
                  values: [...settings.about.values, { title: "New value", copy: "" }],
                },
              })
            }
          >
            Add value
          </AdminButton>
        </div>
        <div className="space-y-4">
          <SectionTitle title="Contact" />
          <PageIntroFields prefix="Contact" values={settings.contact} onChange={(p) => setSettings({ ...settings, contact: { ...settings.contact, ...p } })} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Email label" value={settings.contact.emailLabel} onChange={(v) => setSettings({ ...settings, contact: { ...settings.contact, emailLabel: v } })} />
            <Field label="Phone label" value={settings.contact.phoneLabel} onChange={(v) => setSettings({ ...settings, contact: { ...settings.contact, phoneLabel: v } })} />
            <Field label="Address label" value={settings.contact.addressLabel} onChange={(v) => setSettings({ ...settings, contact: { ...settings.contact, addressLabel: v } })} />
            <Field label="Response time label" value={settings.contact.responseTimeLabel} onChange={(v) => setSettings({ ...settings, contact: { ...settings.contact, responseTimeLabel: v } })} />
          </div>
        </div>
        <div className="space-y-4">
          <SectionTitle title="Get involved" />
          <PageIntroFields prefix="Get involved" values={settings.getInvolved} onChange={(p) => setSettings({ ...settings, getInvolved: { ...settings.getInvolved, ...p } })} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Donate block headline" value={settings.getInvolved.donateHeadline} onChange={(v) => setSettings({ ...settings, getInvolved: { ...settings.getInvolved, donateHeadline: v } })} />
            <Field label="Donate block copy" value={settings.getInvolved.donateCopy} onChange={(v) => setSettings({ ...settings, getInvolved: { ...settings.getInvolved, donateCopy: v } })} multiline />
            <Field label="Donate primary CTA" value={settings.getInvolved.donateCtaPrimary} onChange={(v) => setSettings({ ...settings, getInvolved: { ...settings.getInvolved, donateCtaPrimary: v } })} />
            <Field label="Donate primary link" value={settings.getInvolved.donateCtaPrimaryHref} onChange={(v) => setSettings({ ...settings, getInvolved: { ...settings.getInvolved, donateCtaPrimaryHref: v } })} />
            <Field label="Donate secondary CTA" value={settings.getInvolved.donateCtaSecondary} onChange={(v) => setSettings({ ...settings, getInvolved: { ...settings.getInvolved, donateCtaSecondary: v } })} />
            <Field label="Donate secondary link" value={settings.getInvolved.donateCtaSecondaryHref} onChange={(v) => setSettings({ ...settings, getInvolved: { ...settings.getInvolved, donateCtaSecondaryHref: v } })} />
          </div>
          {settings.getInvolved.ways.map((way, index) => (
            <div key={index} className="space-y-3 rounded-xl border border-line/70 bg-surface/40 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">Way {index + 1}</p>
                <div className="flex items-center gap-2">
                  <ReorderButtons
                    index={index}
                    total={settings.getInvolved.ways.length}
                    onMove={(from, to) =>
                      setSettings({
                        ...settings,
                        getInvolved: {
                          ...settings.getInvolved,
                          ways: moveItem(settings.getInvolved.ways, from, to),
                        },
                      })
                    }
                  />
                  <AdminButton
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        getInvolved: {
                          ...settings.getInvolved,
                          ways: settings.getInvolved.ways.filter((_, i) => i !== index),
                        },
                      })
                    }
                  >
                    Remove
                  </AdminButton>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Field
                  label="Title"
                  value={way.title}
                  onChange={(v) => {
                    const next = [...settings.getInvolved.ways];
                    next[index] = { ...next[index], title: v };
                    setSettings({ ...settings, getInvolved: { ...settings.getInvolved, ways: next } });
                  }}
                />
                <Field
                  label="CTA label"
                  value={way.cta}
                  onChange={(v) => {
                    const next = [...settings.getInvolved.ways];
                    next[index] = { ...next[index], cta: v };
                    setSettings({ ...settings, getInvolved: { ...settings.getInvolved, ways: next } });
                  }}
                />
                <Field
                  label="Link"
                  value={way.href}
                  onChange={(v) => {
                    const next = [...settings.getInvolved.ways];
                    next[index] = { ...next[index], href: v };
                    setSettings({ ...settings, getInvolved: { ...settings.getInvolved, ways: next } });
                  }}
                />
                <Field
                  label="Copy"
                  value={way.copy}
                  onChange={(v) => {
                    const next = [...settings.getInvolved.ways];
                    next[index] = { ...next[index], copy: v };
                    setSettings({ ...settings, getInvolved: { ...settings.getInvolved, ways: next } });
                  }}
                  multiline
                />
              </div>
            </div>
          ))}
          <AdminButton
            variant="secondary"
            size="sm"
            onClick={() =>
              setSettings({
                ...settings,
                getInvolved: {
                  ...settings.getInvolved,
                  ways: [
                    ...settings.getInvolved.ways,
                    { title: "New way", copy: "", href: "/volunteer", cta: "Learn more" },
                  ],
                },
              })
            }
          >
            Add way to get involved
          </AdminButton>
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
        <SectionTitle title="Board members" copy="Add, edit, reorder, or remove. Photos optional." />
        <Field label="Board section title" value={settings.reports.boardTitle} onChange={(v) => setSettings({ ...settings, reports: { ...settings.reports, boardTitle: v } })} />
        {settings.board.map((member, index) => (
          <div key={index} className="space-y-3 rounded-xl border border-line/70 bg-surface/40 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                Member {index + 1}
              </p>
              <div className="flex items-center gap-2">
                <ReorderButtons
                  index={index}
                  total={settings.board.length}
                  onMove={(from, to) =>
                    setSettings({ ...settings, board: moveItem(settings.board, from, to) })
                  }
                />
                <AdminButton
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    setSettings({
                      ...settings,
                      board: settings.board.filter((_, i) => i !== index),
                    })
                  }
                >
                  Remove
                </AdminButton>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Name"
                value={member.name}
                onChange={(v) => {
                  const board = [...settings.board];
                  board[index] = { ...board[index], name: v };
                  setSettings({ ...settings, board });
                }}
              />
              <Field
                label="Role"
                value={member.role}
                onChange={(v) => {
                  const board = [...settings.board];
                  board[index] = { ...board[index], role: v };
                  setSettings({ ...settings, board });
                }}
              />
              <div className="md:col-span-2">
                <MediaField
                  label="Photo"
                  value={member.photo || ""}
                  onChange={(v) => {
                    const board = [...settings.board];
                    board[index] = { ...board[index], photo: v || undefined };
                    setSettings({ ...settings, board });
                  }}
                  folder="board"
                />
              </div>
              <div className="md:col-span-2">
                <Field
                  label="Bio"
                  value={member.bio}
                  onChange={(v) => {
                    const board = [...settings.board];
                    board[index] = { ...board[index], bio: v };
                    setSettings({ ...settings, board });
                  }}
                  multiline
                />
              </div>
            </div>
          </div>
        ))}
        <AdminButton
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            setSettings({
              ...settings,
              board: [...settings.board, { name: "", role: "Board member", bio: "" }],
            })
          }
        >
          Add board member
        </AdminButton>
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
