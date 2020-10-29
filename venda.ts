import { ItemVenda } from "./ItemVenda";
import { isEmpty, Loja } from "./loja"

export class Venda {
    constructor(
        public loja: Loja,
        public datahora: Date,
        public ccf: string,
        public coo: string
    ){}
    
    itens = new Array <ItemVenda>()

    adcionar_item (
        item: number, 
        codigo:number, 
        descricao: string, 
        quantidade: number, 
        unidade: string, 
        valor_unitario: number, 
        substituicao_tributaria: string) {
            let item_venda = new ItemVenda(item, codigo, descricao, quantidade, unidade,
                valor_unitario, substituicao_tributaria)
            this.itens.push(item_venda)
        
    }

    dados_vendas (){
        this.validacao_venda()

        let ano = this.datahora.getFullYear()
        let mes = this.datahora.getMonth()
        let dia = this.datahora.getDate()
        let hora = this.datahora.getHours()
        let minuto = this.datahora.getMinutes()
        let segundo = this.datahora.getSeconds()

        let texto_data = `${dia}/${mes}/${ano}`
        let texto_hora = `${hora}:${minuto}:${segundo}`
        
        let dadosT = texto_data
        dadosT += " " + texto_hora + "V"
        dadosT += " CCF:" + this.ccf
        dadosT += " COO: " + this.coo

        return dadosT
    }
    
    dados_itens (){
        let dados = ["ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)\n"]
        
        this.itens.forEach((item_linha)=>{
            let valor_item = item_linha.quantidade * item_linha.valor_unitario
            let linha = `${item_linha.item} ${item_linha.codigo} ${item_linha.descricao} ${item_linha.quantidade} ${item_linha.unidade} ${item_linha.valor_unitario} ${item_linha.substituicao_tributaria} ${item_linha.total()}`
            dados.push(linha)
            return dados.join("\n")
        })

    }

    calcular_total(){
        let total = 0
        this.itens.forEach((item_linha)=>{total += item_linha.total( )})
        return total

    }

    imprimir_cupom(){
        let dados_loja = this.loja.dados_loja()
        let dados_vendas = this.dados_vendas()
        let dados_itens = this.dados_itens()
        let total = this.calcular_total()

        let cupons_dados = `${dados_loja}\n`
        cupons_dados += `${dados_vendas}\n`
        cupons_dados += `${dados_itens}\n`
        cupons_dados += `${total}`
        return cupons_dados

    }
    
    validacao_venda(){
        this.loja.validacao_loja()
        if(isEmpty(this.ccf)){
            throw new Error("O campo de ccf é obrigatório")
        }
        if(isEmpty(this.coo)){
            throw new Error("O campo de coo é obrigatório")
        }
            
    }
    

}