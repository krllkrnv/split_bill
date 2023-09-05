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
        countTotal() {
            this.countPrice();
            this.customers.forEach(function (currentCustomer) {
                currentCustomer.mustPayTo = []
            });
            this.dishes.forEach(function (currentDish) {
                currentDish.consumers.forEach(function (currentConsumer) {
                    if (currentConsumer.customerID !== currentDish.payer.customerID) {
                        if (currentConsumer.mustPayTo.map(obj => Object.values(obj)).flat().includes(currentDish.payer.name)) {
                            let obj = currentConsumer.mustPayTo.find((o, i) => {
                                if (o.nameToPay === currentDish.payer.name) {
                                    currentConsumer.mustPayTo[i] = {
                                        nameToPay: currentDish.payer.name,
                                        priceToPay: currentConsumer.mustPayTo[i].priceToPay + (currentDish.price / (currentDish.consumers).length)
                                    };

                                }
                            });
                        } else {
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
                    if (indexA !== indexB) {
                        if (objA.mustPayTo.map(obj => Object.values(obj)).flat().includes(objB.name) && objB.mustPayTo.map(obj => Object.values(obj)).flat().includes(objA.name)) {  
                            let payIndexA = objA.mustPayTo.findIndex(obj => obj.nameToPay === objB.name);
                            let payIndexB = objB.mustPayTo.findIndex(obj => obj.nameToPay === objA.name);
                            if (objA.mustPayTo[payIndexA].priceToPay > objB.mustPayTo[payIndexB].priceToPay) {
                                objA.mustPayTo[payIndexA].priceToPay = objA.mustPayTo[payIndexA].priceToPay - Number(objB.mustPayTo[payIndexB].priceToPay);
                                objB.mustPayTo.splice(payIndexB);
                            } else if (objB.mustPayTo[payIndexB].priceToPay > objA.mustPayTo[payIndexA].priceToPay) {
                                objB.mustPayTo[payIndexB].priceToPay = objB.mustPayTo[payIndexB].priceToPay - Number(objA.mustPayTo[payIndexA].priceToPay);
                                objA.mustPayTo.splice(payIndexA);
                            } else {
                                objA.mustPayTo.splice(payIndexA);
                                objB.mustPayTo.splice(payIndexB);
                            }
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
