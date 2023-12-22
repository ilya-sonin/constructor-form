<script>
import SButton from '@/components/ui/SButton.vue';
import SCheckBox from '@/components/ui/SCheckBox.vue';

export default {
    name: 'form-demo',
    components: {
        SButton,
        SCheckBox,
    },
    props: ['form']
}
</script>

<template>
    <div class="form-demo">
        <div class="sib-form">
            <h2>{{ form.form_name }}</h2>

            <SCheckBox text="Нажимая кнопку «Отправить», я принимаю условия политики конфиденциальности" />
            <SButton text="Отправить" width="auto" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form-demo {
    background-color: var(--sib-accent-color);

    display: flex;
    align-items: start;
    justify-content: center;
}

.sib-form {
    margin-top: 7%;
    padding: 40px;
    min-width: 400px;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    gap: 3em;
}
</style>