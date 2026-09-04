export type TeamMember = {
  name: string;
  role: string;
  image: string | null;
  bio: string;
  skills: string[];
  social: { label: string; href: string }[];
};

/** Do not invent people. Empty until real profiles are provided. */
export const teamMembers: TeamMember[] = [];
