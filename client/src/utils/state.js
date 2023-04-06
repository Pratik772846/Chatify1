import { create } from 'zustand'

const useLoggedIn = create((set) => ({
  isLoggedIn: false,
  changeloggedstatus: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
}));

export default useLoggedIn;
