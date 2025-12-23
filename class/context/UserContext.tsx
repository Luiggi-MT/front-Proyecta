import { createContext, use } from "react";
import { Profesor } from "../Interface/Profesor";
import { UserContextType } from "../Interface/UserContextype";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
