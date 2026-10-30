"use client";

// Tiny store for the visitor's analytics choice, kept in localStorage so the
// banner doesn't come back on every page. Read with useSyncExternalStore.

export type Choice = "granted" | "denied" | "unset";

const storageKey = "analytics-consent";
const listeners = new Set<() => void>();
let settingsOpen = false;

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getChoice(): Choice {
  try {
    const value = localStorage.getItem(storageKey);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

export function isSettingsOpen() {
  return settingsOpen;
}

export function openSettings() {
  settingsOpen = true;
  notify();
}

export function setChoice(choice: "granted" | "denied") {
  const wasGranted = getChoice() === "granted";
  try {
    localStorage.setItem(storageKey, choice);
  } catch {
    // Storage blocked: the choice lasts for this page view only.
  }
  settingsOpen = false;

  if (choice === "denied" && wasGranted) {
    // GA is already running on this page and can't be unloaded, so clear its
    // cookies and reload without it.
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (name === "_ga" || name.startsWith("_ga_")) {
        const domain = location.hostname.split(".").slice(-2).join(".");
        document.cookie = `${name}=; Max-Age=0; path=/`;
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
      }
    }
    location.reload();
    return;
  }
  notify();
}
