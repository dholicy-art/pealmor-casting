import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface PlatformSettings {
  default_theme: "dark" | "light";
  default_language: string;
  api_settings: Record<string, { enabled: boolean }>;
  [key: string]: unknown;
}

const DEFAULTS: PlatformSettings = {
  default_theme: "dark",
  default_language: "en",
  api_settings: {},
};

let cachedSettings: PlatformSettings | null = null;
let listeners: Array<(s: PlatformSettings) => void> = [];

function notify(s: PlatformSettings) {
  cachedSettings = s;
  listeners.forEach((fn) => fn(s));
}

async function fetchSettings(): Promise<PlatformSettings> {
  const { data } = await supabase
    .from("platform_settings" as any)
    .select("key, value");
  const result = { ...DEFAULTS };
  if (data) {
    for (const row of data as any[]) {
      (result as any)[row.key] = row.value;
    }
  }
  cachedSettings = result;
  return result;
}

export function usePlatformSettings() {
  const [settings, setSettings] = useState<PlatformSettings>(cachedSettings ?? DEFAULTS);
  const [loading, setLoading] = useState(!cachedSettings);
  const { isAdmin, user } = useAuth();

  useEffect(() => {
    if (cachedSettings) {
      setSettings(cachedSettings);
      setLoading(false);
    }
    fetchSettings().then((s) => {
      setSettings(s);
      setLoading(false);
    });

    listeners.push(setSettings);
    return () => {
      listeners = listeners.filter((fn) => fn !== setSettings);
    };
  }, []);

  const updateSetting = useCallback(
    async (key: string, value: unknown) => {
      if (!isAdmin || !user) return;
      const { error } = await supabase
        .from("platform_settings" as any)
        .upsert(
          { key, value: value as any, updated_by: user.id } as any,
          { onConflict: "key" }
        );
      if (!error) {
        const next = { ...cachedSettings!, [key]: value };
        notify(next);
      }
      return error;
    },
    [isAdmin, user]
  );

  return { settings, loading, updateSetting, refetch: fetchSettings };
}
