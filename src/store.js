import Vue from 'vue'
import Vuex from 'vuex'
import Api from './services/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {
      cardMethods: [],
      debitMethods: [],
      boleto: {},
      brandURL: "",
      brandName: "",
      cardNumber: "",
      CVV: "",
      MesValidade: "",
      AnoValidade: "",
      CPFCartao: "",
      NomeComprador: "",
      CPFComprador: "",
      DDDComprador: "",
      TelefoneComprador: "",
      NomeCartao: "",
      Endereco: "",
      Numero: "",
      Complemento: "",
      Bairro: "",
      Cidade: "",
      UF: "",
      CEP: "",
      parcelas: null,
      QtdParcelas: "Selecione a Parcela",
      ValorParcelas: "",
      Products: [{
          id: 1,
          Descricao: "Celular",
          Valor: "250.00",
          Quantidade: 1
        },
        {
          id: 2,
          Descricao: "Notebook Acer",
          Valor: "250.00",
          Quantidade: 1
        },
        {
          id: 3,
          Descricao: "Monitor 144hz",
          Valor: "250.00",
          Quantidade: 1
        }
      ],
      TokenCard: "",
      HashCard: ""
    }
  },
  mutations: {
    SET_CARD_METHODS(state, val) {
      state.info.cardMethods = val;
    },
    SET_DEBIT_METHODS(state, val) {
      state.info.debitMethods = val;
    },
    SET_BOLETO(state, val) {
      state.info.boleto = val;
    },
    SET_BRAND_NAME(state, val) {
      state.info.brandName = val
    },
    SET_BRAND_URL(state, val) {
      state.info.brandURL = val;
    },
    SET_CARD_NUMBER(state, val) {
      state.info.cardNumber = val;
    },
    SET_CVV(state, val) {
      state.info.CVV = val;
    },
    SET_MES_VALIDADE(state, val) {
      state.info.MesValidade = val;
    },
    SET_ANO_VALIDADE(state, val) {
      state.info.AnoValidade = val;
    },
    SET_CPF_CARTAO(state, val) {
      state.info.CPFCartao = val;
    },
    SET_NOME_COMPRADOR(state, val) {
      state.info.NomeComprador = val;
    },
    SET_CPF_COMPRADOR(state, val) {
      state.info.CPFComprador = val;
    },
    SET_DDD_COMPRADOR(state, val) {
      state.info.DDDComprador = val;
    },
    SET_TELEFONE_COMPRADOR(state, val) {
      state.info.TelefoneComprador = val;
    },
    SET_NOME_CARTAO(state, val) {
      state.info.NomeCartao = val;
    },
    SET_ENDERECO(state, val) {
      state.info.Endereco = val;
    },
    SET_NUMERO(state, val) {
      state.info.Numero = val
    },
    SET_COMPLEMENTO(state, val) {
      state.info.Complemento = val;
    },
    SET_BAIRRO(state, val) {
      state.info.Bairro = val;
    },
    SET_CIDADE(state, val) {
      state.info.Cidade = val;
    },
    SET_UF(state, val) {
      state.info.UF = val;
    },
    SET_CEP(state, val) {
      state.info.CEP = val;
    },
    SET_PARCELAS(state, val) {
      state.info.parcelas = val;
    },
    SET_VALOR_PARCELAS(state, val) {
      state.info.ValorParcelas = val
    },
    SET_QTD_PARCELAS(state, val) {
      state.info.QtdParcelas = val;
    },
    SET_TOKEN_CARD(state, val) {
      state.info.TokenCard = val;
    },
    SET_HASH_CARD(state, val) {
      state.info.HashCard = val;
    }
  },
  actions: {
    setSession({
      commit,
      dispatch
    }) {
      Api().post('/ControllerId.php').then(response => {
        console.log(response.data.id);
        PagSeguroDirectPayment.setSessionId(response.data.id);
        dispatch('listaMeiosPagamento')
      });
    },
    listaMeiosPagamento({
      commit,
      dispatch,
      getters
    }) {
      const amount = getters.amount;
      console.log(amount)
      PagSeguroDirectPayment.getPaymentMethods({
        amount: amount,
        success: response => {
          //meios de pagamento disponíveis
          const data = response.paymentMethods;
          const cardMethods = [];
          const debitMethods = [];

          for (let key in data.CREDIT_CARD.options) {
            cardMethods.push({
              label: data.CREDIT_CARD.options[key].name,
              imageURL: `https://stc.pagseguro.uol.com.br/${
                data.CREDIT_CARD.options[key].images.SMALL.path
              }`
            });
          }
          for (let key in data.ONLINE_DEBIT.options) {
            debitMethods.push({
              label: data.ONLINE_DEBIT.options[key].name,
              imageURL: `https://stc.pagseguro.uol.com.br/${
                data.ONLINE_DEBIT.options[key].images.SMALL.path
              }`
            });
          }
          commit('SET_CARD_METHODS', cardMethods);
          commit('SET_DEBIT_METHODS', debitMethods);
          commit('SET_BOLETO', {
            imageURL: `https://stc.pagseguro.uol.com.br/${
            data.BOLETO.options.BOLETO.images.SMALL.path
          }`,
            label: "Boleto"
          })
        },
        error: function (response) {
          //trata erros
          console.log(response);
        }
      });
    },
    getBrand({
      commit,
      dispatch,
      state
    }) {
      const cardNumber = state.info.cardNumber;
      console.log('COM STATE', cardNumber)
      PagSeguroDirectPayment.getBrand({
        cardBin: cardNumber,
        success: response => {
          //bandeira encontrada
          const name = response.brand.name
          commit('SET_BRAND_NAME', name)
          commit('SET_BRAND_URL', `https://stc.pagseguro.uol.com.br//public/img/payment-methods-flags/68x30/${name}.png`)
          dispatch('getParcelas', name)
        },
        error: response => {
          alert("Cartão não reconhecido");
        }
      });
    },
    getParcelas({
      commit,
      getters
    }, brand) {
      const amount = getters.amount;
      console.log('GET PARCELAS:', brand)
      PagSeguroDirectPayment.getInstallments({
        amount: amount,
        maxInstallmentNoInterest: 2,
        brand: brand,
        success: response => {
          const data = response.installments;
          console.log(data);
          const installments = [];
          for (let key in data) {
            installments.push(data[key]);
          }
          const parcelas = installments.reduce((total, amount) => {
            return total.concat(amount);
          }, []);
          commit('SET_PARCELAS', parcelas)
        }
      });
    },
    getTokenCard({
      commit,
      dispatch,
      state
    }) {
      console.log('STATE novo', state.info.cardNumber)
      PagSeguroDirectPayment.createCardToken({
        cardNumber: state.info.cardNumber,
        brand: state.info.brandName,
        cvv: state.info.CVV,
        expirationMonth: state.info.MesValidade,
        expirationYear: state.info.AnoValidade,
        success: response => {
          commit('SET_TOKEN_CARD', response.card.token)
        }
      });
    },
    senderHash({
      commit
    }) {
      PagSeguroDirectPayment.onSenderHashReady(response => {
        commit('SET_HASH_CARD', response.senderHash)
      });
    },
    payWithCard({
      dispatch,
      state
    }) {
      const obj = {
        TokenCard: state.info.TokenCard,
        HashCard: state.info.HashCard,
        QtdParcelas: state.info.QtdParcelas,
        ValorParcelas: state.info.ValorParcelas,
        CPFCartao: state.info.CPFCartao,
        NomeComprador: state.info.NomeComprador,
        CPFComprador: state.info.CPFComprador,
        DDDComprador: state.info.DDDComprador,
        TelefoneComprador: state.info.TelefoneComprador,
        NomeCartao: state.info.NomeCartao,
        Endereco: state.info.Endereco,
        Numero: state.info.Numero,
        Complemento: state.info.Complemento,
        Bairro: state.info.Bairro,
        Cidade: state.info.Cidade,
        UF: state.info.UF.toUpperCase(),
        CEP: state.info.CEP,
        Products: JSON.stringify(
          state.info.Products.map(p => {
            return {
              id: p.id,
              Descricao: p.Descricao,
              Valor: p.Valor,
              Quantidade: p.Quantidade
            };
          })
        )
      };
      const form_data = new FormData();
      for (let key in obj) {
        form_data.append(key, obj[key]);
      }
      for (var pair of form_data.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      Api().post("/PagamentoCartao.php", form_data)
        .then(response => {
          alert('Pagamento finalizado!')
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });

    },
    payWithBoleto({
      dispatch,
      state
    }) {
      const obj = {
        HashCard: state.info.HashCard,
        NomeComprador: state.info.NomeComprador,
        CPFComprador: state.info.CPFComprador,
        DDDComprador: state.info.DDDComprador,
        TelefoneComprador: state.info.TelefoneComprador,
        Endereco: state.info.Endereco,
        Numero: state.info.Numero,
        Complemento: state.info.Complemento,
        Bairro: state.info.Bairro,
        Cidade: state.info.Cidade,
        UF: state.info.UF.toUpperCase(),
        CEP: state.info.CEP,
        Products: JSON.stringify(
          state.info.Products.map(p => {
            return {
              id: p.id,
              Descricao: p.Descricao,
              Valor: p.Valor,
              Quantidade: p.Quantidade
            };
          })
        )
      };
      const form_data = new FormData();
      for (let key in obj) {
        form_data.append(key, obj[key]);
      }
      for (var pair of form_data.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      Api().post("/PagamentoBoleto.php", form_data)
        .then(response => {
          const urlBoleto = response.data;
          window.location.href = urlBoleto;
        })
        .catch(err => {
          console.log(err);
        });

    }
  },
  getters: {
    amount(state) {
      return state.info.Products.reduce((total, amount) => {
        return parseFloat(total + amount.Quantidade * amount.Valor);
      }, 0);
    },
    info(state) {
      return state.info
    },
    parcelas(state) {
      return state.info.parcelas
    }
  }
})