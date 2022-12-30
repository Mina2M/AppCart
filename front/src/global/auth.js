import create from "zustand";

export const useAuth = create((set) => ({
  loggedIn: !!document.cookie
    .split("; ")
    .find((str) => str.split("=")[0] === "logged"),
  setLoggedIn: (newValue) => set((state) => ({ ...state, loggedIn: newValue })),
}));
