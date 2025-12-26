import { ApiResponse } from "../Interface/ApiResponse";
import { ApiResponseStudents } from "../Interface/ApiResponseStudents";
import { LoginResponse } from "../Interface/LoginResponse";
import { Students } from "../Interface/Students";
import { AdminsApi } from "./AdminsApi";
import { Api } from "./Api";
import { ComponentApi } from "./ComponentApi";
import { FotoApi } from "./FotoApi";
import { Login } from "./Login";
import { StudentsApi } from "./StudentsApi";

export class ConnectApi {
    
    private api: Api;  
    private student: StudentsApi; 
    private admin: AdminsApi; 
    private component: ComponentApi; 
    private foto: FotoApi; 
    private login: Login; 
    constructor(){
        this.api = new Api(); 
        this.student = new StudentsApi(); 
        this.admin = new AdminsApi(); 
        this.component = new ComponentApi(); 
        this.foto = new FotoApi(); 
        this.login = new Login(); 
    }
    // Estudiantes 
    public async getStudents(offset: number = this.api.getInitial_offset(), limit: number = this.api.getLimit()): Promise<ApiResponseStudents> {
            return this.student.getStudents(offset,limit);
        }
        
    public async getEstudentByName(name: string, offset: number = this.api.getInitial_offset(), limit: number = this.api.getLimit()): Promise<ApiResponseStudents | null>{
        return this.student.getEstudentByName(name, offset, limit);
    } 
        
    public async createStudent(student: Students): Promise<ApiResponse>{
        return this.student.createStudent(student);
    }
    public async updateStudent(student: Students): Promise<ApiResponse>{
        return this.student.updateStudent(student);
    }
    
    public async deleteStudent(name: string): Promise<ApiResponse>{
        return this.student.deleteStudent(name);
    }

    //Admin
    public async getAdmins(): Promise<string[]> {
        return this.admin.getAdmins();
    }

    //Components
    public getComponent(filename: string): string {
        return this.component.getComponent(filename);
    }

    //Fotos
    public getFoto(filename: string): string {
        return this.foto.getFoto(filename);
    }

    //Login 
    public async loginUser(userName: string, password: string): Promise<LoginResponse> {
        return this.login.loginUser(userName, password);     
    }

    public async logoutUser():Promise<boolean>{
        return this.login.logoutUser();
    }
    
    public async checkSession() : Promise<LoginResponse>{
        return this.login.checkSession();
    }
}