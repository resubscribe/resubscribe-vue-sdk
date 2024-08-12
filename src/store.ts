import { reactive } from 'vue';

export interface Options {
  slug: string;
  apiKey: string;
  aiType: string;
  userId: string;
  userEmail?: string;
  colors?: {
    primary?: string;
    background?: string;
    text?: string;
  };
  classNames?: {
    overlay?: string;
    modal?: string;
  };
  title?: string;
  description?: string;
  primaryButtonText?: string;
  cancelButtonText?: string;
  onClose?: (via: 'cancel-consent' | 'close') => void;
}

interface State {
  state: 'closed' | 'confirming' | 'open';
  options: Options | null;
}

const state = reactive<State>({
  state: 'closed',
  options: null,
});

const openConsent = (options: Options) => {
  state.state = 'confirming';
  state.options = options;
};

const close = (via: 'cancel-consent' | 'close') => {
  state.state = 'closed';
  if (state.options?.onClose) {
    state.options.onClose(via);
  }
  state.options = null;
};

const openChat = () => {
  state.state = 'open';
};

export const useStore = () => {
  return {
    state,
    openConsent,
    close,
    openChat,
  };
};