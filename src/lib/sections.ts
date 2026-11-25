// Decides which page sections (and nav links) are shown.
// A section shows if it is listed in src/data/site.yaml AND its data is not empty.
import { getCollection, getEntry } from 'astro:content';

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
    achievements: (await getCollection('achievements')).length > 0,
    certifications: (await getCollection('certifications')).length > 0,
    interests: (await getCollection('interests')).length > 0,
  };

  return (site?.data.sections ?? []).filter((id) => hasData[id]);
}
