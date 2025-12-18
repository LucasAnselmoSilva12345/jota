import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  favorites: number[];
  login: () => void;
  logout: () => void;
  toggleFavorites: (id: number) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: null,
  favorites: [],

  login: () => {
    const fakeToken = 'fake-jwt-token';
    localStorage.setItem('token', fakeToken);
    set({
      token: fakeToken,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      token: null,
      favorites: [],
    });
  },

  toggleFavorites: (id) => {
    const favorites = get().favorites;
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    set({
      favorites: updatedFavorites,
    });
  },
}));
