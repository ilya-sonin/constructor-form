<script>
export default {
    name: 's-special-button',
    props: ['text', 'visible']
}
</script>

<template>
    <div class="s-special-button" :class="visible === false ? 's-special-button-visible-none' : null">
        <span>{{ text }}</span>
        <i class="plus"></i>
    </div>
</template>

<style lang="scss" scoped>
.s-special-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: var(--sib-accent-color);
    border-radius: 10px;
    border: 1px dashed var(--sib-accent-color);
    padding: 20px 30px;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
}

.s-special-button-visible-none {
    opacity: 0.5;

    &:hover {
        cursor: auto;
        text-decoration: solid;
    }
}
</style>