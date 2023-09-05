<template>
    <div>
        <customer-form
                @add="addCustomer"
        ></customer-form>

        <customer-list :customers="CUSTOMERS"
                       @delete="deleteCustomer">
        </customer-list>
        <v-btn class='controls' variant="outlined" @click="passCustomers" :to="'/dishes'">
            Подтвердить
        </v-btn>
    </div>
</template>

<script>
import CustomerForm from "@/components/CustomerForm.vue";
import CustomerList from "@/components/CustomerList.vue";
import {mapGetters} from "vuex";

export default {
    components: {CustomerList, CustomerForm},
    data() {
        return {
            customers: this.$store.getters.CUSTOMERS,
        }
    },
    methods: {
        addCustomer(customer) {
            this.customers.push(customer);
            this.passCustomers();
        },
        deleteCustomer(customer) {
            this.customers = this.customers.filter(i => i.customerID !== customer.customerID);
            this.$store.commit('SET_CUSTOMERS', this.customers);
        },
        passCustomers() {
            this.$store.commit('SET_CUSTOMERS', this.customers);
        }
    },
    computed: {
        ...mapGetters(['CUSTOMERS']),
    }
}

</script>

<style>
.controls {
    margin-top: 15px;
}
</style>