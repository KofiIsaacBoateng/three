import { create } from "zustand";

interface MacBookType {
  color: string;
  setColor: (color: string) => void;
  scale: number;
  setScale: (scale: number) => void;
  texture: string;
  setTexture: (texture: string) => void;
  reset: () => void;
}

const useMacBookStore = create<MacBookType>()((set) => ({
  color: "#2e2c2e",
  setColor: (color: string) => set({ color }),

  scale: 0.08,
  setScale: (scale: number) => set({ scale }),

  texture: "/videos/feature-1.mp4",
  setTexture: (texture: string) => set({ texture }),

  reset: () => set({ color: "#2e2c2e", scale: 0.08 }),
}));

export default useMacBookStore;
