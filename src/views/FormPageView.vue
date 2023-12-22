<script>
import { mapState, mapActions } from 'pinia';
import useFormsStore from '@/stores/forms';

import SButton from '@/components/ui/SButton.vue';
import FormDemo from '@/components/fields/form-demo/index.vue';

export default {
    name: 'form-page-view',
    components: { FormDemo, SButton },
    computed: {
        selectedPage () {
            if (this.selectedFormIndex !== -1 && this.selectedPageIndex !== -1) {
                return this.forms[this.selectedFormIndex].pages[this.selectedPageIndex];
            }
            return null;
        },
        ...mapState(useFormsStore, {
            selectedPageIndex: store => store.selectedPageIndex,
            selectedFormIndex: store => store.selectedFormIndex,
            forms: store => store.forms
        })
    },
    methods: {
        ...mapActions(useFormsStore, [])
    }
}
</script>

<template>
    <div class="form-page-view-container">
        <SButton text="Назад" @click="$router.push('/panel/form')" styling-mode="outlined" />
        <FormDemo :form="forms[selectedFormIndex]" type="full" :selectedPage="selectedPage" />
    </div>
</template>

<style lang="scss" scoped>
.form-page-view-container {
    background-color: var(--sib-accent-color);
    min-width: 100%;
    min-height: 100vh;
    padding: 1em;
}
</style>