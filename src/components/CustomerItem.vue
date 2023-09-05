<template>
    <div class="customer">
        <div>Имя: {{ customer.name }}</div>
        <div class="del_btn">
            <v-btn variant="outlined"
                   @click="$emit('delete', customer)"
            >
                Удалить
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        customer: Object,
        required: true
    }
}
</script>

<style>
.customer {
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