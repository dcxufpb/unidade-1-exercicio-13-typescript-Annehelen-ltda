import {isEmpty} from "./loja"
export class Endereco {

    constructor(public logradouro: string, public numero: number, public complemento: string,
        public bairro: string, public municipio: string, public estado: string, public cep: string) { }
    
    
    public endereco_info(){
        this.validacao_endereco()
        let numero : string
        if(this.numero <= 0){
            numero = "s/n"
        }
        else{
            numero = this.numero.toString()
        }

        var part2 = `${this.logradouro}, ${numero}`;
        if (! isEmpty (this.complemento)){
            part2 += ` ${this.complemento}`;
        }
        var part3 = "";
        if (! isEmpty (this.bairro)){
            part3 += `${this.bairro} - `;
        }
        part3 += `${this.municipio} - ${this.estado}`;
        
        var part4 = "";
        if (! isEmpty (this.cep)){
            part4 = `CEP:${this.cep}`;
        }

        let ende = `${part2}\n`
        ende += `${part3}\n`
        ende += `${part4}`
        return ende

    }
    public validacao_endereco(){
        if(isEmpty(this.logradouro)){
            throw new Error(`O campo logradouro do endereço é obrigatório`);
        }
        if(isEmpty(this.municipio)){
            throw new Error(`O campo município do endereço é obrigatório`);
        }
        if(isEmpty(this.estado)){
            throw new Error(`O campo estado do endereço é obrigatório`);
        }

    }
}
