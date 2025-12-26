import { ApiResponse } from "../Interface/ApiResponse";
import { ApiResponseStudents } from "../Interface/ApiResponseStudents";
import { Students } from "../Interface/Students";
import { Api } from "./Api";

export class StudentsApi extends Api{
    
    
    public async getStudents(offset: number = Api.INITIAL_OFFSET, limit: number = Api.LIMIT): Promise<ApiResponseStudents> {
        try{
            const response = await fetch(`${Api.apiUrl}/students?offset=${offset}&limit=${limit}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data:ApiResponseStudents = await response.json();
            return data;
        }catch{
            console.error("Failed to fetch students");
            return { ok: false, students: [], offset: 0, count: 0 };
        }
    }
    
    public async getEstudentByName(name: string, offset: number = Api.INITIAL_OFFSET, limit: number = Api.LIMIT): Promise<ApiResponseStudents | null> {
        try{
            const response = await fetch(`${Api.apiUrl}/students/${name}?offset=${offset}&limit=${limit}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data: ApiResponseStudents = await response.json();
            return data;
        }catch{
            console.error("Failed to fetch student by name");
            return null;
        }
    }


    public async createStudent(student: Students): Promise<ApiResponse>{
        try{
            const response = await fetch(`${Api.apiUrl}/student`, {
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
            if (student.foto && student.foto !== "porDefecto.png") this.uploadStudentPhoto(student.id, student.foto);
            return {ok: true, message: "Estudiante creado correctamente"};
        }catch(error){
            return {ok: false, message: error};
        }
    }
    public async updateStudent(student: Students): Promise<ApiResponse>{
        if(student.foto){ 
            console.log("Uploading photo for student:", student.username);
            this.uploadStudentPhoto(student.id, student.foto);
        }
        try{
            const response = await fetch(`${Api.apiUrl}/student/${student.id}`, {
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

    private async uploadStudentPhoto(id: number, imageUri: string): Promise<ApiResponse>{
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
                const response = await fetch(`${Api.apiUrl}/student/${id}/photo`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        
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

    public async deleteStudent(name: string): Promise<ApiResponse>{
        try{
            const response = await fetch(`${Api.apiUrl}/student/${name}`, {
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
}