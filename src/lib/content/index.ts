export * from "./types";
export * from "./projects";
export * from "./ecosystem";
export * from "./reviews";
export * from "./contact";
export * from "./labels";
export { useContentStore } from "./store";
export { seedProjects, seedEcosystem } from "./seed";

import { useEffect, useState } from "react";
import { useContentStore } from "./store";
import { subscribeAuth } from "@/lib/api";

/** True after the content store has hydrated from storage & synced with backend. */
export function useContentHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useContentStore.persist.onFinishHydration(() => {
      setHydrated(true);
      void useContentStore.getState().syncFromBackend();
    });

    if (useContentStore.persist.hasHydrated()) {
      setHydrated(true);
      void useContentStore.getState().syncFromBackend();
    } else {
      void useContentStore.persist.rehydrate();
    }

    const unsubAuth = subscribeAuth(() => {
      void useContentStore.getState().syncFromBackend();
    });

    return () => {
      unsub();
      unsubAuth();
    };
  }, []);

  return hydrated;
}
