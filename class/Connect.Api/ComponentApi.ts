import { Api } from "./Api";

export class ComponentApi extends Api{
    public getComponent(filename: string): string {
        return `${Api.apiUrl}/component/${filename}`;
    }

    

}