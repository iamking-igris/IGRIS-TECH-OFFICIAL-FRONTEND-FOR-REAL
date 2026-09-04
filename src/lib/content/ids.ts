export function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "item";
}

export function uniqueSlug(base: string, taken: string[]) {
  const set = new Set(taken);
  const slug = slugify(base);
  if (!set.has(slug)) return slug;
  let n = 2;
  while (set.has(`${slug}-${n}`)) n += 1;
  return `${slug}-${n}`;
}

export function hostnameFromUrl(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
}
