<template>
    <div class="dish">
        <div>Наименование: {{ dish.name }}</div>
        <div>Стоимость: {{ dish.price }}</div>
        <div> Выберите плательщика:
            <label v-for="customer in customers">
                <input type="radio" v-model="dish.payer" :value="customer">
                {{ customer.name }}
            </label>
        </div>
        <div> Выберите потребителей:
            <label v-for="customer in customers">
                <input type="checkbox" v-model="dish.consumers" :value="customer">
                {{ customer.name }}
            </label>
        </div>
        <div class="del_btn">
            <v-btn variant="outlined"
                   @click="$emit('delete', dish)"
            >
                Удалить
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dish: Object,
        customers: Array,
    }
}
</script>

<style scoped>
.dish {
    padding: 15px;
    border: 2px solid pink;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.del_btn {
    padding: 0;
    border: none;
    background: none;
    outline: none;
}
</style>