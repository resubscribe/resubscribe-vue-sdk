<template>
    <div :class="['backdrop', { 'dark': isDark }]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    isDark: boolean;
    className?: string;
}>();
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.backdrop.dark {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>