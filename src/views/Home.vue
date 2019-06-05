<template>
  <div class="home">
    <div id="payments">
      <h2>Escolha a forma de pagamento</h2>
      <div class="payment-methods">
        <input
          type="radio"
          v-model="currentComponent"
          id="radio1"
          name="methods"
          value="appCreditCard"
          checked
        >
        <label for="radio1">Cartão de crédito</label>

        <input type="radio" v-model="currentComponent" id="radio2" name="methods" value="appBoleto">
        <label for="radio2">Boleto</label>
      </div>
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreditCard from "@/components/CreditCard.vue";
import Boleto from "@/components/Boleto.vue";

export default {
  name: "home",
  components: {
    appCreditCard: CreditCard,
    appBoleto: Boleto
  },
  data() {
    return {
      currentComponent: "appCreditCard"
    };
  }
};
</script>
<style>
#payments {
  width: 600px;
  max-width: 100%;
  margin: auto;
}
@media (max-width: 600px) {
  .home {
    padding: 16px;
  }
  #payments h2 {
    font-size: 20px;
  }
}
.payment-methods input[type="radio"] {
  display: none;
}

.payment-methods {
  text-align: center;
}
.payment-methods label {
  display: inline-block;
  padding: 4px 11px;
  font-family: Arial;
  font-size: 16px;
  cursor: pointer;
}

.payment-methods input[type="radio"]:checked + label {
  border-bottom: 2px solid #5094d8;
}
</style>
