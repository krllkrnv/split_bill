<template>
    <div class="result">
        Общая стоимость: {{ TOTAL }}
        <br>
        <div v-for="customer in CUSTOMERS"
        >
            <div class='result-list' v-if="customer.mustPayTo.length > 0">
                {{ customer.name }} должен:
                <br>
                <div class='result-list' v-for="debt in customer.mustPayTo">
                    <div v-if="debt.priceToPay > 0">
                        {{ debt.nameToPay }} - {{ debt.priceToPay.toFixed(2) }} руб
                    </div>
                    <br>
                </div>
            </div>
            <div class="result-list" v-else>
                {{ customer.name }} ничего не должен
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters(['TOTAL']),
        ...mapGetters(['CUSTOMERS'])
    }
}
</script>

<style>
.result-list {
    padding: 15px;
    border: 2px solid pink;
    margin-top: 10px;
    align-items: center;
    justify-content: space-between;
}
</style>