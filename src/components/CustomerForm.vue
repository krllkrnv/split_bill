<template>
    <form class="form" @submit.prevent>
        <p>Добавление персон</p>
        <v-text-field
            :min="0"
                    class="input"
                      v-model="customer.name"
                      type="text"
                      placeholder="Имя"
        ></v-text-field>
        <v-btn variant="outlined" class="btn"
               @click="addCustomer"
        >Добавить
        </v-btn>
    </form>
</template>

<script>
export default {
    data() {
        return {
            customer: {
                customerID: 0,
                name: '',
                mustPayTo: []
            }
        }
    },
    methods: {
        addCustomer() {
            this.customer.customerID = Date.now();
            this.$emit('add', this.customer)
            this.customer = {
                customerID: 0,
                name: '',
                mustPayTo: []
            }
        }
    },
}
</script>

<style>
.input {
    margin-top: 10px;
    justify-content: center;
}
</style>