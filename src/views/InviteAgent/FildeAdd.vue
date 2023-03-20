<template>
    <div v-for="row in rows" :key="row.index">
     <input type="text" v-model="row.name">
     <input type="text" v-model="row.price">
     <button @click="addRow" class="btn">Add Row</button>
     <button @click="removeRow" class="btn">Remove Row</button>
    </div>
</template>
<script>
import {ref} from 'vue'

export default {
    
    setup() {
        const rows = ref([]);
        const addRow = () => {
            rows.value.push([
                {
                    name: "",
                    price: '',
                },

            ]),
            console.log(rows.value)
            
        }
        const removeRow = (index) => {
            rows.value.slice(index, 1)
        }
        return {
            rows,
            addRow,
            removeRow
        };
    }
};
</script>
<style>
    
</style>