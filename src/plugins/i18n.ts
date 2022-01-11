import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: "ru",
    fallbackLocale: "ru",
    messages: {
        ru: require('@/i18n/ru.json'),
    },
    silentTranslationWarn: true
})