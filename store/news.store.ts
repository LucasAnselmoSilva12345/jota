import { News } from '@/types/news';
import { create } from 'zustand';

interface NewsStore {
  news: News[];
  setNews: (news: News[]) => void;
}

export const useNewsStore = create<NewsStore>((set) => ({
  news: [],
  setNews: (news) => {
    set({
      news,
    });
  },
}));
