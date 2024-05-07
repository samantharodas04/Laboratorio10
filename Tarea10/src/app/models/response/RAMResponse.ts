export class RAMResponse {
    info : RAMInfo;
    results : Array<RAMPersonaje>;
    constructor (info: RAMInfo, results: Array<RAMPersonaje>) {
        this.info = info;
        this.results = results;
    }
} 

export class RAMInfo {
    count: number = 0;
    pages: number = 0;
    next :string = "";
    prev: string = "";
}

export class RAMPersonaje {
    id: number = 0;
    name:string = "";
    status : string = "";
    species : string = "";
    type : string = "";
    gender:string = "";
    image :string = "";
}