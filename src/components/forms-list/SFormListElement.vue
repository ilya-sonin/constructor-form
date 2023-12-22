<script>
import SButton from '@/components/ui/SButton.vue'

export default {
    name: 's-form-list-element',
    components: { SButton },
    props: {
        form_name: {
            type: String
        },
        form_author: {
            type: String
        },
        form_date_create: {
            type: String
        },
    }
}
</script>

<template>
    <div class="form">
        <div class="form__info">
            <div style="display: flex; flex-direction: column; gap: .6em;">
                <h3 class="form__title">{{ form_name }}</h3>
                <span>Автор: {{ form_author }}</span>
            </div>
            <span>Дата создания: {{ form_date_create }}</span>
        </div>
        <div class="form__actions">
            <SButton width="179px" height="42px" text="Редактировать" stylingMode="outlined"
                @click="this.$emit('openToEdit')" />
            <SButton width="179px" height="42px" text="Удалить" stylingMode="text" @click="this.$emit('removeForm')" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form {
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 24px;

    min-height: 190px;
}

.form__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
        font-size: 14px;
        color: #000;
        opacity: 0.5;
    }
}

.form__title {
    font-size: 24px;
}

.form__actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>