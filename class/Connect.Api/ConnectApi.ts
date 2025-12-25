import { ApiResponse } from "../Interface/ApiResponse";
import { LoginResponse } from "../Interface/LoginResponse";
import { Students } from "../Interface/Students";

export class ConnectApi {
    private apiUrl: string;
    private static readonly LIMIT: number = 6;
    private static readonly INITIAL_OFFSET: number = 0;
    constructor() {
        this.apiUrl = "http://localhost/api";
    }

    public getLimit(): number {
        return ConnectApi.LIMIT;
    }
    public async getAdmins(): Promise<string[]> {
        try{
            const response = await fetch(`${this.apiUrl}/admins`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data:string[] = await response.json();
            return data;
        }catch{
            console.error("Failed to fetch admins");
            return [];
        }
    }
    public async getStudents(offset: number = ConnectApi.INITIAL_OFFSET, limit: number = ConnectApi.LIMIT): Promise<string[]> {
        try{
            const response = await fetch(`${this.apiUrl}/students?offset=${offset}&limit=${limit}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data:string[] = await response.json();
            return data;
        }catch{
            console.error("Failed to fetch students");
            return [];
        }
    }
    
    public async getEstudentByName(name: string, offset: number = ConnectApi.INITIAL_OFFSET, limit: number = ConnectApi.LIMIT): Promise<string | null> {
        try{
            const response = await fetch(`${this.apiUrl}/students/${name}?offset=${offset}&limit=${limit}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data:string = await response.json();
            return data;
        }catch{
            console.error("Failed to fetch student by name");
            return null;
        }
    }

    private async uploadStudentPhoto(username: string, imageUri: string): Promise<ApiResponse>{
        const formData = new FormData();

        const filename = imageUri.split('/').pop(); 
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        formData.append('photo', {
            uri: imageUri,
            name: filename || 'photo.jpg',
            type: type,
        } as any);
        try{
            const response = await fetch(`${this.apiUrl}/student/${username}/photo`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (!response.ok){
                const errorData = await response.json(); 
                return {
                    ok: false, 
                    message: errorData
                }; 
            }
            return {ok: true, message: "Foto subida correctamente"};
        }catch(error){
            return {ok: false, message: error};
        }
    }

    public async createStudent(student: Students): Promise<ApiResponse>{
        try{
            const response = await fetch(`${this.apiUrl}/student`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(student)
            });
            if (!response.ok){
                const errorData = await response.json(); 
                return {
                    ok: false, 
                    message: errorData
                }; 
            }
            if (student.foto && student.foto !== "porDefecto.png") this.uploadStudentPhoto(student.username, student.foto);
            return {ok: true, message: "Estudiante creado correctamente"};
        }catch(error){
            return {ok: false, message: error};
        }
    }
    public async updateStudent(student: Students, foto: string): Promise<ApiResponse>{
        if(foto !== student.foto) this.uploadStudentPhoto(student.username, student.foto);
        try{
            const response = await fetch(`${this.apiUrl}/student/${student.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(student)
            });
            if (!response.ok){
                const errorData = await response.json(); 
                return {
                    ok: false, 
                    message: errorData
                }; 
            }
            return {ok: true, message: "Estudiante actualizado correctamente"};
        }catch(error){
            return {ok: false, message: error};
        }
    }

    public async deleteStudent(name: string): Promise<ApiResponse>{
        try{
            const response = await fetch(`${this.apiUrl}/student/${name}`, {
            method: 'DELETE', 
            headers: {'Content-Type': 'application/jason'}
            });
            if (!response.ok){
                const errorData = await response.json(); 
                return {
                    ok: false, 
                    message: errorData
                }; 
            }
            return {ok: true, message: "Estudiante eliminado correctamente"};
        }catch(error){
            return {ok: false, message: error};
        }
    }

    public getFoto(filename: string): string {
        return `${this.apiUrl}/foto/${filename}`;
    }   
    public getComponent(filename: string): string {
        return `${this.apiUrl}/component/${filename}`;
    }

    public async loginUser(userName: string, password: string): Promise<LoginResponse> {
        try{
            const response = await fetch(`${this.apiUrl}/login`, {
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
            const response = await fetch(`${this.apiUrl}/logout`, {method: 'POST', credentials: 'include'});
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
            const response = await fetch(`${this.apiUrl}/session`, {
                method: 'GET',
                credentials: 'include'
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