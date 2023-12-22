<script>
export default {
    name: 's-checkbox',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'normal', // bold
        },
    },
    emits: ['update:value'],
    data () {
        return {
            selectedValue: false,
            color: 'var(--sib-special-black)',
            opacity: 0.5,
            alignItems: 'start',
        }
    },
    created () {
        if (this.value !== null && typeof this.value !== 'undefined') {
            this.selectedValue = this.value;
        }

        if (this.type === 'bold') {
            this.color = '#000';
            this.opacity = 1;
            this.alignItems = 'center';
        }
    },
    watch: {
        value (value) {
            this.selectedValue = value;
        },
        selectedValue (value) {
            this.$emit('update:value', value);
        },
    },
}
</script>

<template>
    <div class="sib-checkbox" :style="{ color, opacity, alignItems }">
        <input type="checkbox" v-model="selectedValue" />
        <span>{{ text }}</span>
    </div>
</template>

<style lang="scss" scoped>
.sib-checkbox {
    display: flex;
    flex-direction: row;
    gap: 1em;
    text-decoration: bold;

    input {
        min-width: 24px;
        min-height: 24px;
        border-radius: 4px;
        border: 1px solid var(--sib-accent-color);

        &:hover {
            cursor: pointer;
        }
    }
}
</style>