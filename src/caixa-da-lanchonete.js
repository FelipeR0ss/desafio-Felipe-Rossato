class CaixaDaLanchonete {
    constructor() {
        this.formaDePagamento = ["dinheiro", "debito", "credito"];
        
        this.cardapio = {
            "cafe": {
                preco: 3.00,
                itemPrincipal: null
            },
            "chantily": {
                preco: 1.50,
                itemPrincipal: "cafe"
            },
            "sanduiche": {
                preco: 6.50,
                itemPrincipal: null
            },
            "suco": {
                preco: 6.20,
                itemPrincipal: null
            },
            "queijo": {
                preco: 2.00,
                itemPrincipal: "sanduiche"
            },
            "salgado": {
                preco: 7.25,
                itemPrincipal: null
            },
            "combo1": {
                preco: 9.50,
                itemPrincipal: null
            },
            "combo2": {
                preco: 7.50,
                itemPrincipal: null
            }
        };
    }

    pagamentoDinheiro(valorTotal) {
        const desconto = valorTotal * 0.05;
        return valorTotal - desconto;
    }

    pagamentoCredito(valorTotal) {
        const acrescimo = valorTotal * 0.03;
        return valorTotal + acrescimo;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formaDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        const listaItens = itens.map(item => {
            const [nome, quantidade] = item.split(",").map(part => part.trim());
            return { nome, quantidade: parseInt(quantidade) };
        });

        let valorTotal = 0;

        for (const item of listaItens) {
            if (item.quantidade <= 0) {
                return "Quantidade inválida!";
            }

            if (!this.cardapio[item.nome]) {
                return "Item inválido!";
            }

            if (this.cardapio[item.nome].itemPrincipal && !listaItens.find(i => i.nome === this.cardapio[item.nome].itemPrincipal)) {
                return "Item extra não pode ser pedido sem o principal";
            }

            valorTotal += this.cardapio[item.nome].preco * item.quantidade;
        }

        if (metodoDePagamento === "dinheiro") {
            valorTotal = this.pagamentoDinheiro(valorTotal);
        } else if (metodoDePagamento === "credito") {
            valorTotal = this.pagamentoCredito(valorTotal);
        }

        return "R$ " + valorTotal.toFixed(2).replace(".", ",");
    }
}

export { CaixaDaLanchonete };
