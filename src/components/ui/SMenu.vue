<script>
export default {
    name: 's-menu',
    props: {
        value: { type: String },
        items: { type: Array }
    },
    emits: ['update:value'],
    created () {
        if (this.value === null) {
            this.$emit('update:value', this.items[0]);
        }
    },
    methods: {
        changeSelectedValue (item) {
            this.$emit('update:value', item);
        }
    },
}
</script>

<template>
    <div class="sib-menu">
        <div class="sib-menu__item" v-for="item, index in items" :key="index">
            <span @click="changeSelectedValue(item)" :class="value === item ? 'sib-menu__item-selected' : null">
                {{ item }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sib-menu {
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.sib-menu__item {
    &:hover {
        color: var(--sib-accent-color);
        cursor: pointer;
    }
}

.sib-menu__item-selected {
    color: var(--sib-accent-color);
}
</style>