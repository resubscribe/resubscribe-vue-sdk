import { App } from 'vue';
import ResubscribeComponent from './components/ResubscribeComponent.vue';
import { useStore, Options } from './store';
import { registerConsent } from './util';

export { ResubscribeComponent };

function install(app: App) {
    app.component('ResubscribeComponent', ResubscribeComponent);
}

export const openWithConsent = (options: Options) => {
    const { openConsent } = useStore();
    openConsent(options);
};

export const close = (via: 'cancel-consent' | 'close') => {
    const { close } = useStore();
    close(via);
};

export const headless = {
    setOptions: (options: Options) => {
        const { state } = useStore()
        state.options = options;
    },
    openChat: () => {
        const { openChat, state } = useStore();
        state.state = 'open'
        openChat();
    },
    registerConsentRequest: () => {
        let { state } = useStore()
        registerConsent(state.options as Options)
    },
};


export default {
    install,
    Component: ResubscribeComponent,
    openWithConsent,
    close,
    headless,
  }
