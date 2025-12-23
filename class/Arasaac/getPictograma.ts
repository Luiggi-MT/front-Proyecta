export class Arasaac {

    private pictograma: Map<string, number> = new Map([
        ["profesor", 2457],
        ["atras", 38250], 
        ["delante", 38252],
        ["buscador", 39110],
        ["volver", 37086], 
        ["entrar", 6491],
        ["borrar", 37417], 
        ["ok", 5584], 
        ["olvideContraseña", 27367],
        ["paginaPrincipal", 6964],
        ["estudiante", 5900],
        ["tareasPeticion", 33084],
        ["chat", 37867],
        ["tareasPorPasos", 36347],
        ["perfil", 36935],
        ["salir", 6606],
    ]);
    private apiUrl: string = `https://api.arasaac.org/v1/pictograms/`;
    
    public getPictograma(word: string): string{
        const id = this.pictograma.get(word);
        if(id){
            return `${this.apiUrl}${id}`;
        }
        return "";
        
    }
}
