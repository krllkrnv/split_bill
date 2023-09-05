<template>
    <div>
        <result-component
                :customers="CUSTOMERS"
                :total="TOTAL"
        ></result-component>
        <v-btn class='controls' variant="outlined" :to="'/dishes'">
            Назад
        </v-btn>

    </div>
</template>

<script>
import ResultComponent from "@/components/ResultComponent.vue";
import {mapGetters} from "vuex";

export default {
    components: {ResultComponent},
    data() {
        return {
            customers: this.$store.getters.CUSTOMERS,
            total: this.$store.getters.TOTAL,
        }
    },
    computed: {
        ...mapGetters(['CUSTOMERS']),
        ...mapGetters(['TOTAL'])
    }

}
</script>

<style>
.controls {
    margin-top: 15px;
}
</style>