<script>
import CubeBackground from "@/components/cube-background/index.vue"
import STextBox from "@/components/ui/STextBox.vue"
import SButton from "@/components/ui/SButton.vue"

export default {
    name: 'auth-view',
    components: {
        CubeBackground,
        SButton,
        STextBox
    }
}
</script>

<template>
    <div class="sib-container auth-container">
        <div class="sib">
            <div class="sib__section authentication-form-container">
                <img class="sib-logo" src="@/assets/images/logo.svg" alt="logo" />
                <h1>Авторизация</h1>

                <div class="authentication-form">
                    <STextBox placeholder="Логин" />
                    <STextBox placeholder="Пароль" />
                    <SButton text="Вход" style="margin-top: 1.5em;" />
                </div>
            </div>
            <div class="sib__section authentication-help-section">
                <span>Если возникла проблема, то можете<br /> написать <a class="sib-href" href="hh.ru">Алёне из
                        Сибтеха</a></span>
                <span>С любовью, ваш <a class="sib-href" href="hh.ru">Сибтех</a></span>
            </div>
        </div>

        <cube-background />
    </div>
</template>

<style lang="scss" scoped>
.auth-container {
    grid-template-columns: 0.45fr 1fr;
}

.authentication-form-container {
    display: flex;
    flex-direction: column;
    gap: 2em;

    h1 {
        font-size: 40px;
    }
}

.authentication-form {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.authentication-help-section {
    display: flex;
    flex-direction: column;
    gap: 1em;

    span {
        color: var(--sib-special-text-color);
    }
}
</style>