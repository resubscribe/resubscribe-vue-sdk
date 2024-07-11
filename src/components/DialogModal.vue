<template>
    <div :class="['dialog', className]" :style="{ backgroundColor, color }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    backgroundColor?: string;
    color?: string;
    className?: string;
}>();
</script>

<style scoped>
.dialog {
    padding: 1.25rem;
    max-width: 28rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation: modalAnimation 150ms ease-in-out forwards;
}

@keyframes modalAnimation {
    0% {
        transform: translateY(-4px);
        opacity: 0.5;
    }

    100% {
        transform: translateY(0px);
        opacity: 1;
    }
}
</style>