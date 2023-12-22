<script>
import useFormsStore from '@/stores/forms';
import { mapState, mapActions } from "pinia";

import STextBox from './ui/STextBox.vue';

export default {
    name: 'form-type',
    components: { STextBox },
    computed: {
        formName: {
            get () {
                if (this.selectedFormIndex !== -1) {
                    return this.forms[this.selectedFormIndex].form_name;
                }

                return null
            },
            set (value) {
                this.updateFormName(this.selectedFormIndex, value);
            }
        },
        ...mapState(useFormsStore, {
            selectedFormIndex: store => store.selectedFormIndex,
            forms: store => store.forms
        })
    },
    methods: {
        ...mapActions(useFormsStore, ['updateFormName'])
    }
}
</script>

<template>
    <div class="sib-content">
        <div class="sib-content__header">
            <h1>Тип формы</h1>
        </div>
        <div class="sib-content__view formtype">
            <span>Название формы:</span>
            <STextBox :value="formName" v-model:value="formName" placeholder="Название формы" width="auto"
                backgroundColor="white" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.formtype {
    display: flex;
    flex-direction: column;
    gap: .6em;

    span {
        font-size: 16px;
    }
}
</style>