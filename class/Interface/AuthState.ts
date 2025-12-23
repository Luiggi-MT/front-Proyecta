export type AuthState = {
  isLoading: boolean;
  userToken: string | null;
  profesorData: any; 
  tipo: 'admin' | 'profesor' | null;
};