<template>
    <iframe :src="url" width="100%" height="100%" style="border: none; border-radius: 8px; display: block;" />
    <div style="position: absolute; top: 16px; right: 10px; height: 32px; width: 32px; display: flex; justify-content: center; align-items: center; cursor: pointer;"
        @click="confirmClose">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, computed } from 'vue';
import { baseUrl, domain } from '../util';
import { useStore } from '../store';

interface Options {
    aiType: string;
    apiKey: string;
    userId: string;
    userEmail?: string;
    slug: string;
    metadata?: Record<string, string | number | boolean | null>;
}

const props = defineProps<{ options: Options }>();

const { close } = useStore();

const url = computed(() => {
    const queryParams = {
        'ait': props.options.aiType,
        'uid': props.options.userId,
        'email': props.options.userEmail,
        'metadata': JSON.stringify(props.options.metadata),
        'iframe': 'true',
        'hideclose': 'true',
    };
    const ret = `${baseUrl}/chat/${props.options.slug}?${Object.entries(queryParams).filter(([_, value]) => value !== undefined).map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`).join('&')}`;
    return ret + (props.options.apiKey ? "#apiKey=" + props.options.apiKey : "");
});

const confirmClose = () => {
    if (confirm('Are you sure you want to close the chat?')) {
        close('close');
    }
};

onMounted(() => {
    const handleMessage = (event: MessageEvent) => {
        const eventDomain = new URL(event.origin).hostname;
        if (eventDomain === domain) {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'close') {
                    close('close');
                }
            } catch (e) {
                console.error('Failed to parse data: ', e);
            }
        }
    };
    window.addEventListener('message', handleMessage);
    onUnmounted(() => {
        window.removeEventListener('message', handleMessage);
    });
});
</script>