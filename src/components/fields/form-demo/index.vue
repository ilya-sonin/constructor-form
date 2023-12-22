<script>
import SButton from '@/components/ui/SButton.vue';
import SCheckBox from '@/components/ui/SCheckBox.vue';
import STextBox from '@/components/ui/STextBox.vue';
import SSelectBox from '@/components/ui/SSelectBox.vue';

export default {
    name: 'form-demo',
    components: {
        SButton,
        SCheckBox,
        STextBox,
        SSelectBox,
    },
    props: ['form', 'selectedPage', 'type'],
    emits: ['updateSelectedPageIndex'],
    props: {
        form: {
            type: Object
        },
        selectedPage: {
            type: Object
        },
        type: {
            type: String,
            default: 'demo' // full
        }
    },
    methods: {
        transformToDataSource (dataSourceString) {
            if (dataSourceString != null && dataSourceString.length > 0) {
                return dataSourceString.split(',');
            }
        },
        transformToSelectBoxType (field_selectbox_type) {
            if (field_selectbox_type === 'единичный') { return 'single' }
            if (field_selectbox_type === 'множественный') { return 'multiply' }
        },
        openFormPage () {
            this.$emit('updateSelectedPageIndex', this.selectedPage.form_page_id);
            this.$router.push('/panel/form/page');
        },
    },
}
</script>

<template>
    <div class="form-demo">
        <div class="sib-form" v-if="selectedPage != null">
            <h2>{{ form.form_name }} - {{ selectedPage.form_page_name }}</h2>

            <div class="fields-container">
                <div class="field" v-for="field in selectedPage.fields.show_fields" :key="field.field_id">
                    <STextBox v-if="field.field_type === 'text'" width="auto" :placeholder="field.field_name" />
                    <STextBox v-if="field.field_type === 'number'" width="auto" type="number"
                        :placeholder="field.field_name" />
                    <SSelectBox v-if="field.field_type === 'selectbox'" width="auto" :placeholder="field.field_name"
                        :dataSource="transformToDataSource(field.field_datasource)"
                        :type="transformToSelectBoxType(field.field_selectbox_type)" />
                    <i class="required" v-if="field.field_required === true"></i>
                </div>
            </div>

            <SCheckBox text="Нажимая кнопку «Отправить», я принимаю условия политики конфиденциальности" />
            <SButton text="Отправить" width="auto" />
        </div>
        <div class="sib-form" v-if="selectedPage != null && type === 'demo'"
            style="justify-content: center; align-items: center;">
            <h3>Сейчас выбрана страница: <br>"{{ selectedPage.form_page_name }}"</h3>
            <SButton text="Открыть страницу" @click="openFormPage" />
        </div>
        <div class="sib-form" v-if="selectedPage == null && type === 'demo'"
            style="justify-content: center; align-items: center;">
            <h3>Для отображения preview формы выберите страницу</h3>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form-demo {
    background-color: var(--sib-accent-color);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
}

.sib-form {
    margin-top: 7%;
    padding: 40px;
    min-width: 400px;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    gap: 3em;

    h3 {
        font-weight: 500;
    }
}

.fields-container {
    display: flex;
    flex-direction: column;
    gap: .9em;
}
</style>