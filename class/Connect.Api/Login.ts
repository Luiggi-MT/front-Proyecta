import { LoginResponse } from "../Interface/LoginResponse";
import { Api } from "./Api";
export class Login extends Api{
    public async loginUser(userName: string, password: string): Promise<LoginResponse> {
        try{
            const response = await fetch(`${Api.apiUrl}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({'username': userName, 'password': password}), 
                credentials: 'include'
            });

            if (!response.ok){

                const errorData = await response.json().catch(() => ({})); 
                return {
                    ok: false,
                    message: errorData.error || `Server error: ${response.statusText}`,
                };
             }

            const data: LoginResponse = await response.json();
            return {
                ...data,
                ok: true, 
            };
        
        }catch (error: any){
            console.error("Fallo en el inicio de sesión (Error de Red o CORS): ", error.message); 
            return {
                ok: false, 
                message: `Error de red: No se pudo conectar al servidor. (${error.message || 'Servidor no disponible'})`
            };
        }
    }

    public async logoutUser():Promise<boolean>{
        try{
            const response = await fetch(`${Api.apiUrl}/logout`, {method: 'POST', credentials: 'include'});
            if (response.ok) return true; 
            else{
                console.error("Faild logout: " ,response.status);
                return false
            }
        }catch(error){
            console.error("Error: ", error); 
            return false;
        }
    }

    public async checkSession() : Promise<LoginResponse>{
        try{
            const response = await fetch(`${Api.apiUrl}/session`, {
                method: 'GET',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json', 
                    }, 
            });
            
            if (response.status === 401) {
                return {
                    ok: false,
                    message: "No active session"
                };
            }
            if (!response.ok){
                return {
                    ok: false, 
                    message : `Session check failed with status ${response.status}`
                };
            }
            const data: LoginResponse = await response.json();
            return {
                ...data,
                ok: true
            };
        }catch(error: any){
            console.error("Error checking session: ", error.message);
            return {
                ok: false,
                message: `Error checking session: ${error.message || 'Unknown error'}`
            };
        }
    }
}