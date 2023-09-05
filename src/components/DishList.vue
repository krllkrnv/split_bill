<template>
    <div>
        <dish-item
                v-for="dish in dishes"
                :dish="dish"
                :customers="customers"
                :key="dish.dishID"
                @delete="$emit('delete', dish)"
        />
    </div>
</template>

<script>
import DishItem from "@/components/DishItem";

export default {
    components: {DishItem},
    props: {
        dishes: Array,
        customers: Array,
        required: true
    }
}
</script>

<style scoped>

</style>