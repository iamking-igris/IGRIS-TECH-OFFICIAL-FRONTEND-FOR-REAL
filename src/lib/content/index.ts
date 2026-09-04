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

/** True after the mock store has rehydrated from localStorage (client). */
export function useContentHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useContentStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    if (useContentStore.persist.hasHydrated()) {
      setHydrated(true);
    } else {
      void useContentStore.persist.rehydrate();
    }
    return unsub;
  }, []);

  return hydrated;
}
