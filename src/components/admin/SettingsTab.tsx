"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { SiteSettings } from "@/lib/site-settings-defaults";
import { defaultSiteSettings } from "@/lib/site-settings-defaults";

type SettingsSection = "site" | "pages" | "board";

function Field({
  label,
  value,
  onChange,
  multiline,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
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
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full border border-line bg-white px-3 py-2.5 outline-none focus:border-brand"
        />
      )}
    </label>
  );
}

export function SettingsTab({ section }: { section: SettingsSection }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      setLoading(false);
      if (!res.ok) {
        setStatus("Could not load settings");
        return;
      }
      const json = (await res.json()) as { settings: SiteSettings };
      setSettings(json.settings);
      setStatus("");
    })();
  }, [section]);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    });
    setSaving(false);
    if (!res.ok) {
      const json = (await res.json()) as { error?: string };
      setStatus(json.error || "Save failed");
      return;
    }
    const json = (await res.json()) as { settings: SiteSettings };
    setSettings(json.settings);
    setStatus("Saved — live on the public site.");
  }

  if (loading) {
    return <p className="text-sm text-ink-muted">Loading settings…</p>;
  }

  return (
    <form onSubmit={onSave} className="space-y-8">
      {section === "site" && (
        <div className="space-y-6">
          <SectionTitle
            title="General & SEO"
            copy="Shown in the footer, contact page, browser title, and search snippets."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Site name"
              value={settings.general.siteName}
              onChange={(v) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, siteName: v },
                })
              }
            />
            <Field
              label="Tagline"
              value={settings.general.tagline}
              onChange={(v) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, tagline: v },
                })
              }
            />
            <Field
              label="Contact email"
              value={settings.general.contactEmail}
              onChange={(v) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, contactEmail: v },
                })
              }
            />
            <Field
              label="Response time note"
              value={settings.general.responseTime}
              onChange={(v) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, responseTime: v },
                })
              }
            />
            <Field
              label="SEO title"
              value={settings.general.seoTitle}
              onChange={(v) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, seoTitle: v },
                })
              }
            />
            <Field
              label="SEO description"
              value={settings.general.seoDescription}
              onChange={(v) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, seoDescription: v },
                })
              }
              multiline
            />
            <Field
              label="Footer blurb"
              value={settings.general.footerBlurb}
              onChange={(v) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, footerBlurb: v },
                })
              }
              multiline
            />
            <Field
              label="Newsletter blurb"
              value={settings.general.newsletterBlurb}
              onChange={(v) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, newsletterBlurb: v },
                })
              }
              multiline
            />
            <Field
              label="Copyright note"
              value={settings.general.copyrightNote}
              onChange={(v) =>
                setSettings({
                  ...settings,
                  general: { ...settings.general, copyrightNote: v },
                })
              }
            />
          </div>
        </div>
      )}

      {section === "pages" && (
        <div className="space-y-10">
          <div className="space-y-6">
            <SectionTitle title="Home — hero" copy="First-viewport headline and CTAs." />
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Headline"
                value={settings.home.heroHeadline}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, heroHeadline: v },
                  })
                }
              />
              <Field
                label="Supporting sentence"
                value={settings.home.heroSubhead}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, heroSubhead: v },
                  })
                }
                multiline
              />
              <Field
                label="Hero image URL"
                value={settings.home.heroImage}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, heroImage: v },
                  })
                }
              />
              <Field
                label="Hero image alt"
                value={settings.home.heroImageAlt}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, heroImageAlt: v },
                  })
                }
              />
              <Field
                label="Primary CTA label"
                value={settings.home.heroCtaPrimary}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, heroCtaPrimary: v },
                  })
                }
              />
              <Field
                label="Primary CTA link"
                value={settings.home.heroCtaPrimaryHref}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, heroCtaPrimaryHref: v },
                  })
                }
              />
              <Field
                label="Secondary CTA label"
                value={settings.home.heroCtaSecondary}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, heroCtaSecondary: v },
                  })
                }
              />
              <Field
                label="Secondary CTA link"
                value={settings.home.heroCtaSecondaryHref}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, heroCtaSecondaryHref: v },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-6">
            <SectionTitle title="Home — focus areas" copy="Three pillars under “What we do”." />
            <div className="grid gap-4">
              <Field
                label="Section eyebrow"
                value={settings.home.focusEyebrow}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, focusEyebrow: v },
                  })
                }
              />
              <Field
                label="Section headline"
                value={settings.home.focusHeadline}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, focusHeadline: v },
                  })
                }
              />
              <Field
                label="Section intro"
                value={settings.home.focusIntro}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, focusIntro: v },
                  })
                }
                multiline
              />
              {settings.home.focusAreas.map((area, index) => (
                <div
                  key={index}
                  className="grid gap-3 border border-line bg-white/60 p-4 md:grid-cols-2"
                >
                  <Field
                    label={`Area ${index + 1} title`}
                    value={area.title}
                    onChange={(v) => {
                      const focusAreas = [...settings.home.focusAreas];
                      focusAreas[index] = { ...focusAreas[index], title: v };
                      setSettings({
                        ...settings,
                        home: { ...settings.home, focusAreas },
                      });
                    }}
                  />
                  <Field
                    label={`Area ${index + 1} copy`}
                    value={area.copy}
                    onChange={(v) => {
                      const focusAreas = [...settings.home.focusAreas];
                      focusAreas[index] = { ...focusAreas[index], copy: v };
                      setSettings({
                        ...settings,
                        home: { ...settings.home, focusAreas },
                      });
                    }}
                    multiline
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <SectionTitle title="Home — approach & CTA" />
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Approach eyebrow"
                value={settings.home.approachEyebrow}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, approachEyebrow: v },
                  })
                }
              />
              <Field
                label="Approach headline"
                value={settings.home.approachHeadline}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, approachHeadline: v },
                  })
                }
              />
              <Field
                label="Approach copy"
                value={settings.home.approachCopy}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, approachCopy: v },
                  })
                }
                multiline
              />
              <Field
                label="Approach image URL"
                value={settings.home.approachImage}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, approachImage: v },
                  })
                }
              />
              <Field
                label="CTA headline"
                value={settings.home.ctaHeadline}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, ctaHeadline: v },
                  })
                }
              />
              <Field
                label="CTA copy"
                value={settings.home.ctaCopy}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    home: { ...settings.home, ctaCopy: v },
                  })
                }
                multiline
              />
            </div>
          </div>

          <div className="space-y-6">
            <SectionTitle title="About page" />
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Headline"
                value={settings.about.headline}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    about: { ...settings.about, headline: v },
                  })
                }
              />
              <Field
                label="Intro"
                value={settings.about.intro}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    about: { ...settings.about, intro: v },
                  })
                }
                multiline
              />
              <Field
                label="Mission"
                value={settings.about.missionCopy}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    about: { ...settings.about, missionCopy: v },
                  })
                }
                multiline
              />
              <Field
                label="How we work"
                value={settings.about.howCopy}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    about: { ...settings.about, howCopy: v },
                  })
                }
                multiline
              />
              <Field
                label="Hero image URL"
                value={settings.about.heroImage}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    about: { ...settings.about, heroImage: v },
                  })
                }
              />
            </div>
            {settings.about.values.map((value, index) => (
              <div
                key={index}
                className="grid gap-3 border border-line bg-white/60 p-4 md:grid-cols-2"
              >
                <Field
                  label={`Value ${index + 1} title`}
                  value={value.title}
                  onChange={(v) => {
                    const values = [...settings.about.values];
                    values[index] = { ...values[index], title: v };
                    setSettings({
                      ...settings,
                      about: { ...settings.about, values },
                    });
                  }}
                />
                <Field
                  label={`Value ${index + 1} copy`}
                  value={value.copy}
                  onChange={(v) => {
                    const values = [...settings.about.values];
                    values[index] = { ...values[index], copy: v };
                    setSettings({
                      ...settings,
                      about: { ...settings.about, values },
                    });
                  }}
                  multiline
                />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <SectionTitle title="Get involved & contact" />
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Get involved headline"
                value={settings.getInvolved.headline}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    getInvolved: { ...settings.getInvolved, headline: v },
                  })
                }
              />
              <Field
                label="Get involved intro"
                value={settings.getInvolved.intro}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    getInvolved: { ...settings.getInvolved, intro: v },
                  })
                }
                multiline
              />
              <Field
                label="Donate block headline"
                value={settings.getInvolved.donateHeadline}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    getInvolved: { ...settings.getInvolved, donateHeadline: v },
                  })
                }
              />
              <Field
                label="Donate block copy"
                value={settings.getInvolved.donateCopy}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    getInvolved: { ...settings.getInvolved, donateCopy: v },
                  })
                }
                multiline
              />
              <Field
                label="Contact headline"
                value={settings.contact.headline}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, headline: v },
                  })
                }
              />
              <Field
                label="Contact intro"
                value={settings.contact.intro}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, intro: v },
                  })
                }
                multiline
              />
            </div>
            {settings.getInvolved.ways.map((way, index) => (
              <div
                key={index}
                className="grid gap-3 border border-line bg-white/60 p-4 md:grid-cols-2"
              >
                <Field
                  label={`Way ${index + 1} title`}
                  value={way.title}
                  onChange={(v) => {
                    const ways = [...settings.getInvolved.ways];
                    ways[index] = { ...ways[index], title: v };
                    setSettings({
                      ...settings,
                      getInvolved: { ...settings.getInvolved, ways },
                    });
                  }}
                />
                <Field
                  label={`Way ${index + 1} CTA`}
                  value={way.cta}
                  onChange={(v) => {
                    const ways = [...settings.getInvolved.ways];
                    ways[index] = { ...ways[index], cta: v };
                    setSettings({
                      ...settings,
                      getInvolved: { ...settings.getInvolved, ways },
                    });
                  }}
                />
                <Field
                  label={`Way ${index + 1} copy`}
                  value={way.copy}
                  onChange={(v) => {
                    const ways = [...settings.getInvolved.ways];
                    ways[index] = { ...ways[index], copy: v };
                    setSettings({
                      ...settings,
                      getInvolved: { ...settings.getInvolved, ways },
                    });
                  }}
                  multiline
                />
                <Field
                  label={`Way ${index + 1} link`}
                  value={way.href}
                  onChange={(v) => {
                    const ways = [...settings.getInvolved.ways];
                    ways[index] = { ...ways[index], href: v };
                    setSettings({
                      ...settings,
                      getInvolved: { ...settings.getInvolved, ways },
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {section === "board" && (
        <div className="space-y-6">
          <SectionTitle
            title="Board members"
            copy="Displayed on the reports & governance page."
          />
          <Field
            label="Reports page headline"
            value={settings.reports.headline}
            onChange={(v) =>
              setSettings({
                ...settings,
                reports: { ...settings.reports, headline: v },
              })
            }
          />
          <Field
            label="Reports intro"
            value={settings.reports.intro}
            onChange={(v) =>
              setSettings({
                ...settings,
                reports: { ...settings.reports, intro: v },
              })
            }
            multiline
          />
          {settings.board.map((member, index) => (
            <div
              key={index}
              className="grid gap-3 border border-line bg-white/60 p-4 md:grid-cols-2"
            >
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
              <button
                type="button"
                className="justify-self-start text-sm font-semibold text-accent"
                onClick={() =>
                  setSettings({
                    ...settings,
                    board: settings.board.filter((_, i) => i !== index),
                  })
                }
              >
                Remove member
              </button>
            </div>
          ))}
          <button
            type="button"
            className="border border-line px-4 py-2 text-sm font-semibold"
            onClick={() =>
              setSettings({
                ...settings,
                board: [
                  ...settings.board,
                  { name: "", role: "Board member", bio: "" },
                ],
              })
            }
          >
            Add board member
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {status && <p className="text-sm text-ink-muted">{status}</p>}
      </div>
    </form>
  );
}

function SectionTitle({ title, copy }: { title: string; copy?: string }) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      {copy && <p className="mt-1 text-sm text-ink-muted">{copy}</p>}
    </div>
  );
}
