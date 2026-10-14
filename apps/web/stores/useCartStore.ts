import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CourseItem, COURSES_DATA } from '../lib/coursesData';

interface CartState {
  items: CourseItem[];
  addToCart: (course: CourseItem) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  getTotalPrice: () => number;
  getOriginalTotalPrice: () => number;
  getDiscountAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // በነባሪነት ተጠቃሚው ገጹን ሲከፍት እንዳይደክም የመጀመሪያዎቹ 2 ኮርሶች በጋሪው ውስጥ ይቀመጣሉ (ልክ በUdemy ስክሪንሾት እንደታየው)
      items: [COURSES_DATA[0], COURSES_DATA[1]],

      addToCart: (course) => {
        const { items } = get();
        if (!items.some((i) => i.id === course.id)) {
          set({ items: [...items, course] });
        }
      },

      removeFromCart: (courseId) => {
        set({ items: get().items.filter((i) => i.id !== courseId) });
      },

      clearCart: () => {
        set({ items: [] });
      },

      isInCart: (courseId) => {
        return get().items.some((i) => i.id === courseId);
      },

      getTotalPrice: () => {
        return get().items.reduce((acc, item) => acc + (item.price || 0), 0);
      },

      getOriginalTotalPrice: () => {
        return get().items.reduce((acc, item) => acc + (item.originalPrice || item.price || 0), 0);
      },

      getDiscountAmount: () => {
        const original = get().getOriginalTotalPrice();
        const total = get().getTotalPrice();
        return Math.max(0, original - total);
      },
    }),
    {
      name: 'dream_more_cart',
    }
  )
);
