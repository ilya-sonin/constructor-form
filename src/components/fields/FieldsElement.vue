<script>
import STextBox from '../ui/STextBox.vue';
import SSelectBox from '../ui/SSelectBox.vue';
import SCheckBox from '../ui/SCheckBox.vue';

export default {
    name: 'fields-element',
    props: ['fieldId', 'fieldName', 'fieldType', 'fieldRequired'],
    emits: ['removeField'],
    components: { STextBox, SSelectBox, SCheckBox },
    data () {
        return {
            dataFieldName: '',
            requiredStatus: false
        }
    },
    created () {
        if (this.fieldName != null) {
            this.dataFieldName = this.fieldName;
        }
    },
}
</script>

<template>
    <div class="field-element">
        <div class="field-element__control">
            <div class="field-element__label">
                <span>{{ dataFieldName }}</span>
                <span>{{ fieldType }}</span>
            </div>
            <span class="field-element__remove-field"
                @click="$emit('removeField', { fieldType: fieldType, fieldId: fieldId })">Удалить поле</span>
        </div>
        <div class="field-element__view">
            <STextBox :value="dataFieldName" v-model:value="dataFieldName" placeholder="Название поля"
                backgroundColor="white" width="100%" />
        </div>
        <div class="field-element__required">
            <SCheckBox text="Сделать поле обязательным" v-model:value="requiredStatus" type="bold" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.field-element {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.field-element__control {
    font-size: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.field-element__label {
    opacity: 0.5;
    display: flex;
    flex-direction: row;
    gap: 1em;
}

.field-element__remove-field {
    color: var(--sib-accent-color);

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>