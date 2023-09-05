<template>
    <form class="form" @submit.prevent>
        <p>Добавление позиций</p>
        <v-text-field type="text"
                      v-model="dish.name"
                      class="input"
                      placeholder="Наименование позиции"
        ></v-text-field>
        Стоимость
        <v-text-field type="number"
                      v-model="dish.price"
                      class="input"
                      placeholder="Стоимость блюда"
                      min="0"></v-text-field>
        <v-btn variant="outlined" class="btn"
               @click="addDish"
        >Добавить
        </v-btn>
    </form>
</template>

<script>
export default {
    data() {
        return {
            dish: {
                dishID: 0,
                name: '',
                price: 0,
                consumers: [],
                payer: ''
            }
        }
    },
    methods: {
        addDish() {
            this.dish.dishID = Date.now();
            this.$emit('add', this.dish)
            this.dish = {
                dishID: 0,
                name: '',
                price: 0,
                consumers: [],
                payer: ''
            }
        }
    },
}
</script>

<style scoped>

</style>