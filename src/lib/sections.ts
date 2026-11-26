// Decides which page sections (and nav links) are shown.
// A section shows if it is listed in src/data/site.yaml AND its data is not empty.
import { getCollection, getEntry } from 'astro:content';

// UI labels for nav links and section eyebrows (not personal content, so they live here).
export const sectionLabels = {
  home: 'Home',
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  achievements: 'Achievements',
  interests: 'Interests',
  contact: 'Contact',
};

// Sections that stay on the page but get no nav link.
export const notInNav = ['home', 'interests'];

export async function visibleSections() {
  const site = await getEntry('site', 'site');
  const profile = await getEntry('profile', 'profile');
  const hasProfile = Boolean(profile);

  const hasData = {
    home: hasProfile,
    about: (profile?.data.about.length ?? 0) > 0,
    contact: hasProfile,
    experience: (await getCollection('experience')).length > 0,
    projects: (await getCollection('projects')).length > 0,
    skills: (await getCollection('skills')).length > 0,
    // Certifications are a group inside Achievements, so either one keeps the section.
    achievements:
      (await getCollection('achievements')).length + (await getCollection('certifications')).length > 0,
    interests: (await getCollection('interests')).length > 0,
  };

  return (site?.data.sections ?? []).filter((id) => hasData[id]);
}
