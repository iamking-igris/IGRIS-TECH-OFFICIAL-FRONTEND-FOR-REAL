import { Container } from "@/components/page/container";
import { teamMembers } from "@/data/team";

export function TeamSection() {
  if (teamMembers.length === 0) return null;

  return (
    <section className="border-b border-hairline">
      <Container className="py-20 md:py-28">
        <p className="label-tech mb-4">Team</p>
        <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          The people behind IGRIS
        </h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {teamMembers.map((member) => (
            <li key={member.name} className="border-t border-hairline pt-6">
              <h3 className="font-display text-xl font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-quiet">{member.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-quiet">{member.bio}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
