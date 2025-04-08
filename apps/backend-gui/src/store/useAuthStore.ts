import { login } from "@/api/auth";
import { create } from "zustand";

type AuthStoreState = {
  isAuthorized: boolean;
  token: string;
};
type AuthStoreActions = {
  login: (key: string) => Promise<boolean>;
  checkSession: () => void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

const useAuthStore = create<AuthStore>((set) => ({
  isAuthorized: false,
  token: "",
  login: async (key) => {
    const token = await login(key);
    if (token) {
      set(() => ({
        isAuthorized: true,
        token,
      }));
      return true;
    }
    return false;
  },
  checkSession: async () => {
    const res = await fetch("");
    if (res.status === 401) {
      set(() => ({
        isAuthorized: false,
        token: "",
      }));
    }
  },
}));

export default useAuthStore;
