import { Api } from "./Api";

export class AdminsApi extends Api{
    public async getAdmins(): Promise<string[]> {
        try{
            const response = await fetch(`${Api.apiUrl}/admins`);
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
}