<script>
import { mapState, mapActions } from 'pinia';
import useFormsStore from '@/stores/forms';

import SButton from '@/components/ui/SButton.vue';
import SFormListElement from './SFormListElement.vue';

export default {
    name: 'forms',
    components: { SButton, SFormListElement },
    computed: {
        ...mapState(useFormsStore, {
            forms: store => store.forms
        })
    },
    methods: {
        openToEdit (form_id) {
            this.updateSelectedFormIndex(form_id)

            this.$router.push('/panel/form')
        },
        ...mapActions(useFormsStore, ['addNewEmptyForm', 'removeFormByFormId', 'updateSelectedFormIndex'])
    }
}
</script>

<template>
    <div class="sib-content">
        <div class="sib-content__header">
            <h1>Формы</h1>
            <SButton text="Создать форму" @click="addNewEmptyForm" />
        </div>
        <div class="sib-content__view forms-list">
            <!-- BUG Левая панель увеличивается вместе с дополнением новых forms -->
            <SFormListElement v-for="form, index in forms" :form_name="form.form_name" :form_author="form.form_author"
                :form_date_create="form.form_date_create" :key="form.form_id" @removeForm="removeFormByFormId(form.form_id)"
                @openToEdit="openToEdit(form.form_id)" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.forms-list {
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 2em;
}
</style>