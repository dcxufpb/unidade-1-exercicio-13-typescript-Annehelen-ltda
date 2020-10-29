import { Endereco } from "./endereco";

export function isEmpty(str: string): boolean {
    let spaceCount = str.length - str.replace(" ", "").length;
    return str == null || spaceCount == str.length;}

export class Loja {

    constructor(public nome_loja: string, public endereco: Endereco,
        public telefone: string, public observacao: string, public cnpj: string, public inscricao_estadual: string) { }

    public dados_loja(): string {
        // Implemente aqui
        this.validacao_loja()

        let part4 = this.endereco.endereco_info()

        if (! isEmpty(this.telefone)){
            if (! isEmpty(this.endereco.cep)){
            part4 += ` `;
            }
            part4 += `Tel ${this.telefone}`;
        }
        if (! isEmpty(part4)){
            part4 += `\n`;
        }
        var part5 = "";
        if (! isEmpty(this.observacao)){
            part5 += `${this.observacao}`;
        }
        let loj = `${this.nome_loja}\n`
        loj += `${part4}`
        loj += `${part5}\n`
        loj += `CNPJ: ${this.cnpj}\n`
        loj += `IE: ${this.inscricao_estadual}\n`
    
        return loj;
    }
    public validacao_loja(){
        if (isEmpty(this.nome_loja)) {
            throw new Error(`O campo nome da loja é obrigatório`);
          }
        if(isEmpty(this.cnpj)){
            throw new Error(`O campo CNPJ da loja é obrigatório`);
        }
        if(isEmpty(this.inscricao_estadual)){
            throw new Error(`O campo inscrição estadual da loja é obrigatório`);
        }

    }
}