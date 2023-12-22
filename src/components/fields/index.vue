<script>
import { mapState, mapActions } from 'pinia';
import useFormsStore from '@/stores/forms';

import SSpecialButton from '../ui/SSpecialButton.vue';
import FormDemo from '@/components/fields/form-demo/index.vue';
import FieldElement from './FieldsElement.vue';
import PageElement from './PageElement.vue';

export default {
    name: 'fields',
    components: { SSpecialButton, FormDemo, FieldElement, PageElement },
    data () {
        return {
            selectedPageId: null,
        }
    },
    computed: {
        hiddenFields () {
            if (this.selectedPageId !== null) {
                const index = this.forms[this.selectedFormIndex].pages.findIndex(page => page.form_page_id === this.selectedPageId);
                return this.forms[this.selectedFormIndex].pages[index].fields.hidden_fields;
            }

            return [];
        },
        showFields () {
            if (this.selectedPageId !== null) {
                const index = this.forms[this.selectedFormIndex].pages.findIndex(page => page.form_page_id === this.selectedPageId);
                return this.forms[this.selectedFormIndex].pages[index].fields.show_fields;
            }

            return [];
        },
        pages () {
            if (this.selectedFormIndex !== -1) {
                return this.forms[this.selectedFormIndex].pages;
            }

            return []
        },
        ...mapState(useFormsStore, {
            selectedFormIndex: store => store.selectedFormIndex,
            forms: store => store.forms
        })
    },
    methods: {
        methodRemovePage (pageId) {
            if (pageId === this.selectedPageId) {
                this.selectedPageId = null;
            }

            this.removePage(this.selectedFormIndex, pageId);
        },
        methodAddNewField (type) {
            this.addNewField(this.selectedFormIndex, this.selectedPageId, type)
        },
        methodUpdateRequiredStatus ({ fieldId, requiredStatus }) { },
        methodRemoveField ({ fieldType, fieldId }) {
            this.removeField(this.selectedFormIndex, this.selectedPageId, fieldType, fieldId)
        },

        ...mapActions(useFormsStore, [
            'addNewEmptyPage',
            'removePage',
            'updatePageName',

            'addNewField',
            'removeField',
        ])
    },
}
</script>

<template>
    <div class="fields-big-container">
        <div class="sib-content fields-container">
            <div class="sib-content__header">
                <h1>Поля</h1>
            </div>
            <div class="sib-content__view form-constructor">
                <div class="fields">
                    <div class="fields__element fields__hidden">
                        <h2>Скрытие поля</h2>

                        <FieldElement v-for="hidden in hiddenFields" :key="hidden.field_id" :field="hidden" />

                        <SSpecialButton text="Добавить поле" :visible="selectedPageId !== null"
                            @click="methodAddNewField('show')" />
                    </div>
                    <div class="fields__element fields__show">
                        <h2>Поля</h2>

                        <FieldElement v-for="show in showFields" :key="show.field_id" :fieldId="show.field_id"
                            :fieldName="show.field_name" :fieldType="show.field_type" :fieldRequired="show.field_required"
                            @updateRequiredStatus="methodUpdateRequiredStatus($event)" @removeField="methodRemoveField" />

                        <SSpecialButton text="Добавить поле" :visible="selectedPageId !== null"
                            @click="methodAddNewField('show')" @removeField="methodRemoveField" />
                    </div>
                    <div class="fields__element fields__pages">
                        <h2>Страницы</h2>

                        <PageElement v-for="page, index in pages" :key="page.form_page_id" :page="page"
                            :pageId="page.form_page_id" :pageIndex="index" v-model:selectedPageId="selectedPageId"
                            @removePage="methodRemovePage($event)"
                            @updatePageName="updatePageName(selectedFormIndex, selectedPageId, $event)" />

                        <SSpecialButton text="Добавить страницу формы" @click="addNewEmptyPage(selectedFormIndex)" />
                    </div>
                </div>
            </div>
        </div>
        <FormDemo :form="forms[selectedFormIndex]" />
    </div>
</template>

<style lang="scss" scoped>
.fields-big-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.fields-container {
    padding-top: 5%;
    padding-left: 4%;
    padding-right: 8%;
}

.form-constructor {}

.fields {
    display: flex;
    flex-direction: column;
    gap: 2.5em;
}

.fields__element {
    display: flex;
    flex-direction: column;
    gap: 2em;
}
</style>