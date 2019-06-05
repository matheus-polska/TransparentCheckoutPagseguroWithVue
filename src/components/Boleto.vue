<template>
  <div id="creditCard">
    <h4 style="text-align: center;">Pagamento por boleto</h4>
    <div class="boleto-info">
      <form @submit.prevent="onBuyProduct">
        <div class="row justify-between">
          <div class="input-container separator col-12">
            <i class="material-icons">person</i>
            <input
              v-model="NomeComprador"
              class="input"
              type="text"
              placeholder="Nome do comprador"
            >
          </div>
          <div class="input-container separator col-xs-12">
            <i class="material-icons">person</i>
            <input v-model="CPFComprador" class="input" type="text" placeholder="CPF do comprador">
          </div>
          <div class="input-container separator col-4">
            <i class="material-icons">phone</i>
            <input v-model="DDDComprador" class="input" type="text" placeholder="DDD">
          </div>
          <div class="input-container separator col-7">
            <i class="material-icons">phone</i>
            <input v-model="TelefoneComprador" class="input" type="text" placeholder="Telefone">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="Endereco" class="input" type="text" placeholder="Endereço">
          </div>
          <div class="input-container separator col-4">
            <i class="material-icons">place</i>
            <input v-model="Numero" class="input" type="text" placeholder="Número">
          </div>
          <div class="input-container separator col-7">
            <i class="material-icons">place</i>
            <input v-model="Complemento" class="input" type="text" placeholder="Complemento">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="CEP" class="input" type="text" placeholder="CEP">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="Bairro" class="input" type="text" placeholder="Bairro">
          </div>
          <div class="input-container separator col-12">
            <i class="material-icons">place</i>
            <input v-model="Cidade" class="input" type="text" placeholder="Cidade">
          </div>
          <div class="input-container separator col-4">
            <i class="material-icons">place</i>
            <input v-model="UF" class="input" type="text" placeholder="UF">
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
export default {
  name: "Boleto",
  props: {
    msg: String
  },
  computed: {
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
    onBuyProduct() {
      this.$store.dispatch("payWithBoleto");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
