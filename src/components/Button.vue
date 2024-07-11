<template>
    <div :class="['button', { 'secondary': secondarycolor }]"
        :style="{ backgroundColor: bgcolor || 'black', color: color || 'white', borderColor: secondarycolor ? reduceOpacity(secondarycolor, 0.3) : 'none' }"
        @click="$emit('click')">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { reduceOpacity } from '../util';

const props = defineProps<{
    bgcolor?: string;
    color?: string;
    secondarycolor?: string;
}>();
</script>

<style scoped>
.button {
    flex: 1;
    text-align: center;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
}

.button.secondary {
    border-width: 1px;
    border-style: solid;
}
</style>