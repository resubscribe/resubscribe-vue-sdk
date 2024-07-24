<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useStore, Options } from '../store';
import { getTitle, getDescription, isDarkColor, AIType, registerConsent } from '../util';
import Backdrop from './Backdrop.vue';
import DialogModal from './DialogModal.vue';
import ChatModal from './ChatModal.vue';
import Button from './Button.vue';
import WebView from './WebView.vue';

const { state, close, openChat } = useStore();
const isDark = computed(() => !state.options?.colors?.background ? false : isDarkColor(state.options.colors.background));
</script>

<template>
  <Backdrop v-if="state.state !== 'closed'" :isDark="isDark" :class="state.options?.classNames?.overlay">
    <DialogModal v-if="state.state === 'confirming'" :backgroundColor="state.options?.colors?.background || 'white'"
      :color="state.options?.colors?.text" :class="state.options?.classNames?.modal">
      {{registerConsent(state.options as Options)}}
      <div class="title">
        {{ state.options?.title || getTitle(state.options?.aiType as AIType) }}
      </div>
      <div class="description">
        {{ state.options?.description || getDescription(state.options?.aiType as AIType) }}
      </div>
      <div class="buttons">
        <Button @click="close('cancel-consent')" role="button" tabIndex="0" :bgcolor="'transparent'"
          :color="state.options?.colors?.text" :secondarycolor="state.options?.colors?.text">
          {{ state.options?.cancelButtonText || 'Not right now' }}
        </Button>
        <Button @click="openChat" :bgcolor="state.options?.colors?.primary"
          :color="isDark ? state.options?.colors?.text : state.options?.colors?.background" role="button" tabIndex="0">
          {{ state.options?.primaryButtonText || "Let's chat!" }}
        </Button>
      </div>
    </DialogModal>
    <ChatModal v-else :backgroundColor="state.options?.colors?.background || 'white'" :class="state.options?.classNames?.modal">
      <WebView :options="(state.options as any)" />
    </ChatModal>
  </Backdrop>
</template>

<style scoped>
.title {
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}

.description {
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  opacity: 0.8;
}

.buttons {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 576px) {
  .buttons {
    flex-direction: row;
  }
}
</style>