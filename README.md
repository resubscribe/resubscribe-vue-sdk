# Resubscribe Vue SDK

![NPM Version](https://img.shields.io/npm/v/resubscribe-vue-sdk)

The official Vue SDK for [Resubscribe](https://resubscribe.ai).

## Setup

First register Resubscribe with Vue where you are mounting the app.

```typescript
import ResubscribeVueSdk from 'resubscribe-vue-sdk';
const Vue = createApp(App);
Vue.use(ResubscribeVueSdk);
Vue.mount('#app')
```

Add the component and then trigger the Resubscribe modal with the `openWithConsent` method. Replace the placeholders with your own values.

```typescript
<script setup>
import Resubscribe from 'resubscribe-vue-sdk'

const onTrigger = () => {
    Resubscribe.openWithConsent({
        slug: '{organization-slug}',
        aiType: '{ai-type}',
        userId: '{uid}',
        userEmail: '{optionalEmail}',
        colors: {
            primary: '#31B15F',
            background: '#fff',
            text: '#333',
        },
    })
}
</script>

<template>
  <main>
    ...
    <ResubscribeComponent />
  </main>
</template>
```

## Headless

You can alternatively use the headless version of the SDK.

```typescript
<script setup>
import Resubscribe from 'resubscribe-vue-sdk'

const handleClick = () => {
    Resubscribe.headless.setOptions({
        slug: '{organization-slug}',
        aiType: '{ai-type}',
        userId: '{uid}',
        userEmail: '{optionalEmail}',
    });
    Resubscribe.headless.registerConsentRequest();
    // Open your own consent modal here 👇
    const confirmed = await confirm(...);

    if (confirmed) {
        Resubscribe.headless.openChat({
            onClose: (via) => {
                console.log('onClose', via);
            },
        });
    }
}
</script>

<template>
  <main>
    ...
    <ResubscribeComponent />
  </main>
</template>
```
