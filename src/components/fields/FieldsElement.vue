<script>
import STextBox from '../ui/STextBox.vue';
import SSelectBox from '../ui/SSelectBox.vue';
import SCheckBox from '../ui/SCheckBox.vue';

export default {
    name: 'fields-element',
    props: [
        'fieldId',
        'fieldName',
        'fieldType',
        'fieldRequired',
        'fieldDataSource',
        'type',
        'fieldSelectBoxSelectType'
    ],
    emits: [
        'removeField',
        'updateFieldName',
        'updateFieldType',
        'updateRequiredStatus',
        'updateFieldDataSource',
        'updateFieldSelectBoxSelectTypeModel',
        'hiddenField',
        'showField'
    ],
    components: { STextBox, SSelectBox, SCheckBox },
    data () {
        return {
            dataFieldName: '',
            requiredStatus: false,
            fieldTypeModel: null,
            fieldDataSourceModel: null,
            fieldSelectBoxSelectTypeModel: null
        }
    },
    created () {
        if (this.fieldName != null) {
            this.dataFieldName = this.fieldName;
        }

        if (this.fieldRequired !== null) {
            this.requiredStatus = this.fieldRequired;
        }

        if (this.fieldType !== null) {
            this.fieldTypeModel = this.fieldType;
        }

        if (this.fieldDataSource != null) {
            this.fieldDataSourceModel = this.fieldDataSource;
        }

        if (this.fieldSelectBoxSelectType != null) {
            this.fieldSelectBoxSelectTypeModel = this.fieldSelectBoxSelectType;
        }
    },
    watch: {
        dataFieldName (value) {
            this.$emit('updateFieldName', { fieldId: this.fieldId, fieldName: value })
        },
        requiredStatus (value) {
            this.$emit('updateRequiredStatus', { fieldId: this.fieldId, fieldName: value, requiredStatus: value })
        },
        fieldTypeModel (value) {
            this.$emit('updateFieldType', { fieldId: this.fieldId, fieldType: value })
        },
        fieldDataSourceModel (value) {
            this.$emit('updateFieldDataSource', { fieldId: this.fieldId, fieldDataSource: value })
        },
        fieldSelectBoxSelectTypeModel (value) {
            this.$emit('updateFieldSelectBoxSelectTypeModel', { fieldId: this.fieldId, fieldSelectBoxSelectType: value })
        },
    },
}
</script>

<template>
    <div class="field-element">
        <div class="field-element__control">
            <div class="field-element__label">
                <span>{{ dataFieldName }}</span>
                <span>{{ fieldTypeModel }}</span>
            </div>
            <div class="field-element__status-control">
                <span class="field-element__remove-field" @click="$emit('hiddenField', fieldId)"
                    v-if="type === 'show'">Скрыть
                    поле</span>
                <span class="field-element__remove-field" @click="$emit('showField', fieldId)"
                    v-if="type === 'hidden'">Показать
                    поле</span>
                <span class="field-element__remove-field"
                    @click="$emit('removeField', { fieldType: fieldType, fieldId: fieldId })">Удалить поле</span>
            </div>
        </div>
        <div class="field-element__view">
            <div class="field-element__view-form">
                <STextBox :value="dataFieldName" v-model:value="dataFieldName" placeholder="Название поля"
                    backgroundColor="white" width="auto" />
                <SSelectBox style="min-width: 30%;" placeholder="Выберите тип поля" backgroundColor="white" width="auto"
                    :value="new Array(fieldTypeModel)" v-model:value="fieldTypeModel"
                    :dataSource="['text', 'number', 'selectbox']" />
            </div>
            <div class="field-element__view-selectbox" v-if="fieldTypeModel === 'selectbox'">
                <div class="field-element__view-selectbox__element">
                    <span>Введите через запятую содержимое selectBox:</span>
                    <STextBox :value="fieldDataSourceModel" v-model:value="fieldDataSourceModel"
                        placeholder="Введите через запятую содержимое selectBox" backgroundColor="white" width="auto" />
                </div>
                <div class="field-element__view-selectbox__element">
                    <span>Выберите тип поля selectbox:</span>
                    <SSelectBox :value="[fieldSelectBoxSelectTypeModel]" v-model:value="fieldSelectBoxSelectTypeModel"
                        width="auto" backgroundColor="white" placeholder="Тип"
                        :dataSource="['единичный', 'множественный']" />
                </div>
            </div>
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

.field-element__view {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.field-element__view-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
}

.field-element__view-selectbox {
    display: flex;
    flex-direction: row;
    gap: 1em;
    justify-content: space-between;

    span {
        opacity: 0.5;
    }
}

.field-element__view-selectbox__element {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .3em;
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

.field-element__status-control {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
}
</style>