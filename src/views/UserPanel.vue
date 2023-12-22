<script>
import SMenu from '@/components/ui/SMenu.vue'
import SButton from '@/components/ui/SButton.vue'

import FormsList from '@/components/forms-list/index.vue'

export default {
    name: 'user-panel',
    components: {
        SMenu,
        SButton,
        FormsList
    },
    data () {
        return {
            selectedMenuItem: null
        }
    },
}
</script>

<template>
    <div class="sib-container">
        <div class="sib sib-menu-container">
            <div class="sib-menu-container__logo">
                <img class="sib-logo" src="@/assets/images/logo.svg" alt="logo" />
                <SMenu :items="['Формы', 'Пользователи']" v-model:value="selectedMenuItem" style="margin-top: 16px;" />
            </div>

            <div class="sib-menu-container__buttons">
                <SButton text="Выход" stylingMode="outlined" />
            </div>
        </div>

        <FormsList v-if="selectedMenuItem === 'Формы'" />
    </div>
</template>

<style lang="scss" scoped>
</style>