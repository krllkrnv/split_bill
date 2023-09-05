<template>
    <div>
        <customer-item v-for="customer in customers"
                       :customer="customer"
                       :key="customer.customerID"
                       @delete="$emit('delete', customer)"
        />
    </div>
</template>

<script>
import CustomerItem from "@/components/CustomerItem";

export default {
    components: {CustomerItem},
    props: {
        customers: Array,
        required: true
    }
}
</script>

<style scoped>

</style>