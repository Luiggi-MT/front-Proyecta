import { Profesor } from "./Profesor";

export interface UserContextType { 
    user: Profesor | null;
    setUser: (user: Profesor | null) => void;
}