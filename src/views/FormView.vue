<script>
import SButton from '@/components/ui/SButton.vue';
import SMenu from '@/components/ui/SMenu.vue';

import FormType from '@/components/FormType.vue';
import Fields from '@/components/fields/index.vue';

import { mapState } from 'pinia';
import useFormsStore from '@/stores/forms';

export default {
    name: 'form-view',
    components: { SButton, SMenu, FormType, Fields },
    data () {
        return {
            selectedMenuItem: null
        }
    },
    methods: {
        saveForm () {
            // TODO Сохранять piniaState в localStorage
        },
    },
    created () {
        if (this.selectedFormIndex === -1) {
            this.$router.push('/panel/')
        }
    },
    computed: {
        ...mapState(useFormsStore, {
            selectedFormIndex: store => store.selectedFormIndex,
        })
    }
}
</script>

<template>
    <div class="sib-container">
        <div class="sib sib-menu-container">
            <div class="sib-menu-container__logo">
                <img class="sib-logo" src="@/assets/images/logo.svg" alt="logo" />
                <SButton text="Назад" icon="arrow-left" styling-mode="text" position="start" type="simple"
                    @click="$router.push('/panel/')" />
                <SMenu :items="['Тип формы', 'Сущности', 'Поля', 'Правила показа полей', 'Другие настройки']"
                    v-model:value="selectedMenuItem" style="margin-top: 16px;" />
            </div>

            <div class="sib-menu-container__buttons">
                <SButton text="Скрипт" stylingMode="outlined" />
                <SButton text="Сохранить" @click="saveForm" />
            </div>
        </div>

        <FormType v-if="selectedMenuItem == 'Тип формы'" />
        <Fields v-if="selectedMenuItem === 'Поля'" />
    </div>
</template>

<style lang="scss" scoped></style>