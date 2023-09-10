<template>
  <div>
    <dish-form
        @add="addDish"
    >
    </dish-form>

    <dish-list :dishes="DISHES"
               :customers="CUSTOMERS"
               @delete="deleteDish"
    ></dish-list>
    <div @click='countTotal' class='controls'>
      <v-btn class="dishbutton" variant="outlined" @click="passDishes" :to="'/results'">
        Подтвердить
      </v-btn>
    </div>
    <v-btn class="dishbutton" variant="outlined" :to="'/'">
      Назад
    </v-btn>
  </div>
</template>

<script>
import DishForm from "@/components/DishForm.vue";
import DishList from "@/components/DishList.vue";
import {mapGetters} from "vuex";
import {findIndex} from "core-js/internals/array-iteration";

export default {
  components: {DishList, DishForm},
  data() {
    return {
      customers: this.$store.getters.CUSTOMERS,
      dishes: this.$store.getters.DISHES,
      total: this.$store.getters.TOTAL,
    }
  },
  methods: {
    addDish(dish) {
      this.dishes.push(dish);
      this.passDishes();
    },
    deleteDish(dish) {
      this.dishes = this.dishes.filter(i => i.dishID !== dish.dishID);
      this.$store.commit('SET_DISHES', this.dishes);
    },
    countPrice() {
      console.log(1);
      let summary = 0;
      this.dishes.forEach(function (arrayItem) {
        summary = summary + Number(arrayItem.price);
      })
      this.$store.commit('SET_TOTAL', summary);

    },
    countTotal() { // пофиксил каку
      this.countPrice();
      this.customers.forEach(function (currentCustomer) {
        currentCustomer.mustPayTo = []
      });
      this.dishes.forEach(function (currentDish) {
        currentDish.consumers.forEach(function (currentConsumer) {
          if (currentConsumer.name !== currentDish.payer.name) { // если пользователь не плательщик
            let arrayOfMustPayToValues = currentConsumer.mustPayTo.flatMap(obj => Object.values(obj));
            if (arrayOfMustPayToValues.includes(currentDish.payer.name)) { // если среди всех "кому должен" встречается имя плательщика
              currentConsumer.mustPayTo.forEach(function (currentMustPayTo, index) {
                if (currentMustPayTo.nameToPay === currentDish.payer.name) {
                  let k = currentMustPayTo.priceToPay;
                  currentConsumer.mustPayTo[index] = {
                    nameToPay: currentDish.payer.name,
                    priceToPay: k + (currentDish.price / (currentDish.consumers).length)
                  }
                }
              })
            }
            else {
              currentConsumer.mustPayTo.push({
                nameToPay: currentDish.payer.name,
                priceToPay: (currentDish.price / (currentDish.consumers).length)
              })
            }
          }
        })
      })
      this.debtFixing();
      this.$store.commit('SET_CUSTOMERS', this.customers);
      this.$store.commit('SET_DISHES', this.dishes);

    },
    debtFixing() {
      this.customers.forEach((objA, indexA) => {
        this.customers.forEach((objB, indexB) => {
// ниже проверяется то, что и А, и Б должны друг другу.
          if (objA.mustPayTo.flatMap(obj => Object.values(obj)).includes(objB.name) && objB.mustPayTo.flatMap(obj => Object.values(obj)).includes(objA.name)){
            let payValueA = objA.mustPayTo[objA.mustPayTo.findIndex(obj => obj.nameToPay === objB.name)].priceToPay;
            let payValueB = objB.mustPayTo[objB.mustPayTo.findIndex(obj => obj.nameToPay === objA.name)].priceToPay;
            if (payValueA > payValueB) {
              objA.mustPayTo[objA.mustPayTo.findIndex(obj => obj.nameToPay === objB.name)].priceToPay = objA.mustPayTo[objA.mustPayTo.findIndex(obj => obj.nameToPay === objB.name)].priceToPay - objB.mustPayTo[objB.mustPayTo.findIndex(obj => obj.nameToPay === objA.name)].priceToPay;
              objB.mustPayTo.splice(objB.mustPayTo[objB.mustPayTo.findIndex(obj => obj.nameToPay === objA.name)]);
            }
            else if (payValueA < payValueB) {
              objB.mustPayTo[objB.mustPayTo.findIndex(obj => obj.nameToPay === objA.name)].priceToPay = objB.mustPayTo[objB.mustPayTo.findIndex(obj => obj.nameToPay === objA.name)].priceToPay - objA.mustPayTo[objA.mustPayTo.findIndex(obj => obj.nameToPay === objB.name)].priceToPay;
              objA.mustPayTo.splice(objA.mustPayTo[objA.mustPayTo.findIndex(obj => obj.nameToPay === objB.name)]);
            }
            else if (payValueA === payValueB){
              objB.mustPayTo.splice(objB.mustPayTo[objB.mustPayTo.findIndex(obj => obj.nameToPay === objA.name)]);
              objA.mustPayTo.splice(objA.mustPayTo[objA.mustPayTo.findIndex(obj => obj.nameToPay === objB.name)]);
            }
          }
        });
      });
    },
    passDishes() {
      this.$store.commit('SET_DISHES', this.dishes);
    }
  },
  computed: {
    ...mapGetters(['CUSTOMERS']),
    ...mapGetters(['DISHES']),
    ...mapGetters(['TOTAL'])
  }
}
</script>

<style scoped>
.dishbutton {
  float: left;
  margin-right: 15px;
}

.controls {
  margin-top: 15px;
}
</style>
