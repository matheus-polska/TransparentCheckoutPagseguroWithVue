<template>
  <div id="creditCard">
    <h4 style="text-align: center;">Pagamento por cartão de crédito</h4>
    <div class="card-info">
      <form @submit.prevent="onBuyProduct">
        <span>
          <strong>Dados do cartão</strong>
        </span>
        <div class="row">
          <div class="col-xs-12">
            <div class="input-container separator">
              <i class="material-icons">credit_card</i>
              <input
                v-model="cardNumber"
                @focus="onSenderHash"
                class="input"
                type="text"
                placeholder="Número do cartão"
              >
              <img v-if="info.brandURL" :src="info.brandURL" alt>
            </div>
            <div class="input-container separator">
              <select
                class="input"
                v-model="QtdParcelas"
                @input="updateParcela"
                v-if="parcelas"
                name="QtdParcelas"
                id="QtdParcelas"
              >
                <option>Selecione a Parcela</option>
                <option
                  v-for="parc in parcelas"
                  :amount="parc.installmentAmount"
                  :value="parc.quantity"
                  :key="parc.installmentAmount"
                >{{parc.quantity}} parcelas de R$ {{parc.installmentAmount.toFixed(2).replace('.',',')}}</option>
              </select>
            </div>
            <div class="input-container separator">
              <i class="material-icons">person</i>
              <input v-model="NomeCartao" class="input" type="text" placeholder="Titular do cartão">
            </div>
          </div>
          <div class="col-xs-12">
            <div class="row">
              <div class="input-container separator col-xs-5 col-sm-3 mr-sm">
                <i class="material-icons">today</i>
                <select v-model="MesValidade" class="input" name id>
                  <option v-for="m in meses" :value="m" :key="m">{{m}}</option>
                </select>
              </div>
              <div class="input-container separator col-xs-5 col-sm-3 mr-sm">
                <i class="material-icons">calendar_view_day</i>
                <select v-model="AnoValidade" class="input" name id>
                  <option v-for="a in anos" :value="a.val" :key="a.val">{{a.label}}</option>
                </select>
              </div>
              <div class="input-container separator col-xs-5 col-sm-3">
                <i class="material-icons">credit_card</i>
                <input
                  v-model="CVV"
                  @blur="onGetTokenCard"
                  class="input"
                  type="text"
                  placeholder="CVV"
                >
              </div>
            </div>
            <div class="input-container separator col-12">
              <i class="material-icons">featured_play_list</i>
              <input v-model="CPFCartao" class="input" type="text" placeholder="CPF do títular">
            </div>
          </div>
          <span style="display: block;" class="separator">
            <strong>Dados do Comprador</strong>
          </span>
          <div class="input-container separator col-12">
            <i class="material-icons">featured_play_list</i>
            <input
              v-model="NomeComprador"
              class="input"
              type="text"
              placeholder="Nome do comprador"
            >
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">featured_play_list</i>
            <input v-model="CPFComprador" class="input" type="text" placeholder="CPF do comprador">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">featured_play_list</i>
            <input v-model="DDDComprador" class="input" type="text" placeholder="DDD">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">featured_play_list</i>
            <input v-model="TelefoneComprador" class="input" type="text" placeholder="Telefone">
          </div>
          <span style="display: block;" class="separator">
            <strong>Dados da Entrega</strong>
          </span>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="Endereco" class="input" type="text" placeholder="Endereço">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="Numero" class="input" type="text" placeholder="Número">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="Complemento" class="input" type="text" placeholder="Complemento">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="Bairro" class="input" type="text" placeholder="Bairro">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="Cidade" class="input" type="text" placeholder="Cidade">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="UF" class="input" type="text" placeholder="UF">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="CEP" class="input" type="text" placeholder="CEP">
          </div>
        </div>
        <div>
          <button id="buy" class="separator buy">Comprar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "CreditCard",
  props: {
    msg: String
  },
  data() {
    return {
      meses: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      anos: [
        {
          label: "19",
          val: "2019"
        },
        {
          label: "20",
          val: "2020"
        },
        {
          label: "21",
          val: "2021"
        },
        {
          label: "22",
          val: "2022"
        },
        {
          label: "23",
          val: "2023"
        },
        {
          label: "24",
          val: "2014"
        },
        {
          label: "25",
          val: "2025"
        },
        {
          label: "26",
          val: "2026"
        },
        {
          label: "27",
          val: "2027"
        },
        {
          label: "28",
          val: "2028"
        },
        {
          label: "29",
          val: "2029"
        },
        {
          label: "30",
          val: "2030"
        },
        {
          label: "31",
          val: "2031"
        },
        {
          label: "32",
          val: "2032"
        },
        {
          label: "33",
          val: "2033"
        },
        {
          label: "34",
          val: "2034"
        },
        {
          label: "35",
          val: "2035"
        },
        {
          label: "36",
          val: "2036"
        },
        {
          label: "37",
          val: "2037"
        },
        {
          label: "38",
          val: "2038"
        }
      ]
      // cardMethods: [],
      // debitMethods: [],
      // boleto: {},
      // brandURL: "",
      // brandName: "",
      // // cardNumber: "",
      // // CVV: "",
      // // MesValidade: "",
      // // AnoValidade: "",
      // // CPFCartao: "",
      // // NomeComprador: "",
      // // CPFComprador: "",
      // // DDDComprador: "",
      // // TelefoneComprador: "",
      // // NomeCartao: "",
      // // Endereco: "",
      // // Numero: "",
      // // Complemento: "",
      // // Bairro: "",
      // // Cidade: "",
      // // UF: "",
      // // CEP: "",
      // parcelas: null,
      // // QtdParcelas: "Selecione a Parcela",
      // ValorParcelas: "",
      // Products: [
      //   {
      //     id: 1,
      //     Descricao: "Iphone",
      //     Valor: "250.00",
      //     Quantidade: 1
      //   },
      //   {
      //     id: 2,
      //     Descricao: "Notebook Acer",
      //     Valor: "250.00",
      //     Quantidade: 1
      //   },
      //   {
      //     id: 3,
      //     Descricao: "Garrafa pet",
      //     Valor: "250.00",
      //     Quantidade: 1
      //   }
      // ],
      // TokenCard: "",
      // HashCard: ""
    };
  },
  watch: {
    cardNumber(val) {
      if (val.length === 6) {
        this.getBrand();
      }
    }
  },
  computed: {
    ...mapGetters(["amount", "parcelas", "info"]),
    cardNumber: {
      get() {
        return this.$store.state.info.cardNumber;
      },
      set(value) {
        this.$store.commit("SET_CARD_NUMBER", value);
      }
    },
    NomeCartao: {
      get() {
        return this.$store.state.info.NomeCartao;
      },
      set(value) {
        this.$store.commit("SET_NOME_CARTAO", value);
      }
    },
    QtdParcelas: {
      get() {
        return this.$store.state.info.QtdParcelas;
      },
      set(value) {
        this.$store.commit("SET_QTD_PARCELAS", value);
      }
    },
    MesValidade: {
      get() {
        return this.$store.state.info.MesValidade;
      },
      set(value) {
        this.$store.commit("SET_MES_VALIDADE", value);
      }
    },
    AnoValidade: {
      get() {
        return this.$store.state.info.AnoValidade;
      },
      set(value) {
        this.$store.commit("SET_ANO_VALIDADE", value);
      }
    },
    CVV: {
      get() {
        return this.$store.state.info.CVV;
      },
      set(value) {
        this.$store.commit("SET_CVV", value);
      }
    },
    CPFCartao: {
      get() {
        return this.$store.state.info.CPFCartao;
      },
      set(value) {
        this.$store.commit("SET_CPF_CARTAO", value);
      }
    },
    NomeComprador: {
      get() {
        return this.$store.state.info.NomeComprador;
      },
      set(value) {
        this.$store.commit("SET_NOME_COMPRADOR", value);
      }
    },
    CPFComprador: {
      get() {
        return this.$store.state.info.CPFComprador;
      },
      set(value) {
        this.$store.commit("SET_CPF_COMPRADOR", value);
      }
    },
    DDDComprador: {
      get() {
        return this.$store.state.info.DDDComprador;
      },
      set(value) {
        this.$store.commit("SET_DDD_COMPRADOR", value);
      }
    },
    TelefoneComprador: {
      get() {
        return this.$store.state.info.TelefoneComprador;
      },
      set(value) {
        this.$store.commit("SET_TELEFONE_COMPRADOR", value);
      }
    },
    NomeCartao: {
      get() {
        return this.$store.state.info.NomeCartao;
      },
      set(value) {
        this.$store.commit("SET_NOME_CARTAO", value);
      }
    },
    Endereco: {
      get() {
        return this.$store.state.info.Endereco;
      },
      set(value) {
        this.$store.commit("SET_ENDERECO", value);
      }
    },
    Numero: {
      get() {
        return this.$store.state.info.Numero;
      },
      set(value) {
        this.$store.commit("SET_NUMERO", value);
      }
    },
    Complemento: {
      get() {
        return this.$store.state.info.Complemento;
      },
      set(value) {
        this.$store.commit("SET_COMPLEMENTO", value);
      }
    },
    Bairro: {
      get() {
        return this.$store.state.info.Bairro;
      },
      set(value) {
        this.$store.commit("SET_BAIRRO", value);
      }
    },
    Cidade: {
      get() {
        return this.$store.state.info.Cidade;
      },
      set(value) {
        this.$store.commit("SET_CIDADE", value);
      }
    },
    UF: {
      get() {
        return this.$store.state.info.UF;
      },
      set(value) {
        this.$store.commit("SET_UF", value);
      }
    },
    CEP: {
      get() {
        return this.$store.state.info.CEP;
      },
      set(value) {
        this.$store.commit("SET_CEP", value);
      }
    }
  },
  methods: {
    ...mapActions(["getTokenCard", "senderHash", "getBrand", "payWithCard"]),
    onGetTokenCard() {
      this.getTokenCard();
    },
    onSenderHash() {
      this.senderHash();
    },
    updateParcela(event) {
      const num = event.target.options[event.target.selectedIndex].getAttribute(
        "amount"
      );
      const val = Number(num).toFixed(2);
      this.$store.commit("SET_VALOR_PARCELAS", val);
    },
    onBuyProduct() {
      this.payWithCard();
    },
    toFormData(obj) {
      const form_data = new FormData();
      for (let key in obj) {
        form_data.append(key, obj[key]);
      }
      return form_data;
    }
  },
  created() {
    this.$store.dispatch("setSession");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy {
  border: none;
  outline: none;
  background: #5094d8;
  color: white;
  padding: 10px 29px 10px 29px;
  font-size: 18px;
  border-radius: 7px;
}
</style>
