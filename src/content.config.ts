// Schemas for every YAML file in src/data/. If a file has a typo or a wrong field name,
// the build stops and names the file, the entry number and the field.
// Objects are "strict", so a misspelled optional field is an error instead of being silently ignored.
import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { existsSync, readdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as simpleIcons from 'simple-icons';
import { parse } from 'yaml';

// Loads src/data/<name>.yaml. A list becomes one entry per item (in file order);
// a single object becomes one entry with id = <name>. A missing or empty file gives no entries.
// (Astro's built-in file() loader needs an `id` on every item and hides YAML syntax errors.)
function yamlFile(name: string): Loader {
  return {
    name: 'yaml-file',
    load: async ({ store, parseData, watcher, logger, config }) => {
      const filePath = fileURLToPath(new URL(`src/data/${name}.yaml`, config.root));
      // Parse and validate the whole file BEFORE touching the store, so a bad edit never empties a section.
      const sync = async () => {
        const entries = [];
        if (existsSync(filePath)) {
          const data = parse(await readFile(filePath, 'utf-8')) ?? [];
          const items: [string, Record<string, unknown>][] = Array.isArray(data)
            ? data.map((item, i) => [String(i), item])
            : [[name, data]];
          for (const [id, item] of items) {
            entries.push({ id, data: await parseData({ id, data: item, filePath }), filePath });
          }
        }
        store.clear();
        for (const entry of entries) store.set(entry);
      };
      // Watch before the first load, so fixing a broken file recovers without restarting the dev server.
      watcher?.add(filePath);
      watcher?.on('change', (changed) => {
        if (resolve(changed) !== resolve(filePath)) return; // resolve(): Windows paths come in either slash style
        sync()
          .then(() => logger.info(`src/data/${name}.yaml reloaded`))
          .catch((e) =>
            logger.error(
              `\n\n  src/data/${name}.yaml has an error. The page keeps showing the last good version until you fix it.\n\n` +
                `  ${e instanceof Error ? e.message : String(e)}\n`,
            ),
          );
      });
      await sync(); // first load: an error stops the build / dev start
    },
  };
}

const text = z.string().min(1);

// Brand logos come from Simple Icons (simpleicons.org); every other icon is a Lucide name.
const brandSlugs = new Set(Object.values(simpleIcons).map((i) => i.slug));
const brandIcon = z.string().refine((slug) => brandSlugs.has(slug), {
  message: 'not a Simple Icons slug (look it up at simpleicons.org, e.g. github, codeforces, leetcode, x)',
});
// Lucide names = the icon files in @lucide/astro (same names as `@lucide/astro/icons/<name>`).
const lucideNames = new Set(
  readdirSync('node_modules/@lucide/astro/src/icons')
    .filter((f) => f.endsWith('.ts'))
    .map((f) => f.slice(0, -3)),
);
const lucideIcon = z.string().refine((name) => lucideNames.has(name), {
  message: 'not a Lucide icon name (look it up at lucide.dev/icons, e.g. trophy, map-pin, graduation-cap)',
});

// icon is optional: a link without one shows just its label.
const link = z.strictObject({ label: text, url: text, icon: brandIcon.optional() });

const site = z.strictObject({
  title: text,
  description: text,
  // Order of the page sections and nav links. Remove a line to hide that section.
  sections: z.array(
    z.enum(['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'certifications', 'interests', 'contact']),
  ),
});

const profile = z.strictObject({
  name: text,
  headline: text,
  eyebrow: text,
  tagline: text,
  intro: text,
  workButton: text,
  contactButton: text,
  location: text,
  email: text,
  resume: text,
  about: z.array(text).default([]),
  aboutNote: text.optional(), // handwritten note pointing at the quick-fact cards

  quickFacts: z.array(z.strictObject({ icon: lucideIcon, text })).default([]),
  links: z.array(link).default([]),
});

// Dates are "YYYY-MM" (e.g. "2025-09"); an end date may also be "present".
const role = z.strictObject({
  title: text,
  type: text,
  start: text,
  end: text,
});

const workProject = z.strictObject({
  name: text,
  start: text.optional(),
  end: text.optional(),
  description: text,
  did: z.array(text).min(2).max(4),
  impact: text.optional(),
  stack: z.array(text).default([]),
  link: text.optional(),
});

// One entry per company. Several roles = a promotion at the same company.
const experience = z.strictObject({
  company: text,
  companyUrl: text.optional(),
  location: text,
  summary: text.optional(),
  roles: z.array(role).min(1),
  projects: z.array(workProject).default([]),
});

const project = z.strictObject({
  title: text,
  oneLiner: text,
  highlight: text.optional(),
  tags: z.array(text).default([]),
  repo: text.optional(),
  demo: text.optional(),
  featured: z.boolean().default(false),
});

const skillGroup = z.strictObject({
  category: text,
  items: z.array(text).min(1),
});

const achievement = z.strictObject({
  title: text,
  subtitle: text,
  rarity: z.enum(['gold', 'silver', 'bronze']),
  icon: lucideIcon,
  date: text.optional(),
  link: text.optional(),
});

const certification = z.strictObject({
  name: text,
  issuer: text,
  date: text,
  url: text.optional(),
  logo: text.optional(),
});

const interest = z.strictObject({
  title: text,
  text: text.optional(),
  layout: z.enum(['wide', 'tall', 'square']),
  kind: z.enum(['stack', 'carousel', 'plain']),
  note: text.optional(),
  images: z.array(text).default([]), // paths inside src/assets/
});

// A text drawing: rows of "#" (part of the shape) and "." (background), all the same width.
const heroShape = z
  .strictObject({
    name: text,
    rows: z.array(z.string().regex(/^[#.]+$/, 'rows may only contain "#" and "."')).min(1),
  })
  .refine((s) => s.rows.every((r) => r.length === s.rows[0].length), {
    message: 'every row must be the same width',
    path: ['rows'],
  });

export const collections = {
  site: defineCollection({ loader: yamlFile('site'), schema: site }),
  profile: defineCollection({ loader: yamlFile('profile'), schema: profile }),
  experience: defineCollection({ loader: yamlFile('experience'), schema: experience }),
  projects: defineCollection({ loader: yamlFile('projects'), schema: project }),
  skills: defineCollection({ loader: yamlFile('skills'), schema: skillGroup }),
  achievements: defineCollection({ loader: yamlFile('achievements'), schema: achievement }),
  certifications: defineCollection({ loader: yamlFile('certifications'), schema: certification }),
  interests: defineCollection({ loader: yamlFile('interests'), schema: interest }),
  heroShapes: defineCollection({ loader: yamlFile('hero-shapes'), schema: heroShape }),
};
