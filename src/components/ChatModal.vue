<template>
    <div :class="['chat', className]" :style="{ backgroundColor }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    backgroundColor?: string;
    className?: string;
}>();
</script>

<style scoped>
.chat {
    height: 80vh;
    max-width: 600px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation: modalAnimation 150ms ease-in-out forwards;
    position: relative;
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