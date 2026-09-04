import { useEffect, useState } from "react";
import type { Project } from "@/lib/content/types";
import { listPublicProjects } from "@/services/projects";
import { useFeaturedProjects as useLocalFeatured } from "@/lib/content/projects";

export function useRemoteFeaturedProjects() {
  const local = useLocalFeatured();
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    void listPublicProjects()
      .then((res) => {
        if (!mounted) return;
        if (res && res.length > 0) setItems(res);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message ?? String(err));
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return {
    items: items.length > 0 ? items : local,
    loading,
    error,
  };
}
