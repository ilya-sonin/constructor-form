<script>
export default {
    name: 's-text-box',
    props: {
        width: {
            type: String,
            default: '350px'
        },
        height: {
            type: String,
            default: '70px'
        },
        placeholder: {
            type: String
        },
        type: {
            type: String,
            default: 'text' // 'number'
        },
        value: {
            type: String || Number
        },
        backgroundColor: {
            type: String,
            default: 'var(--sib-special-white)'
        },
        disabled: {
            type: Boolean
        }
    },
    created () {
        if (this.value != null && this.value.length > 0) {
            this.textBoxValue = this.value;
        }
    },
    data () {
        return {
            textBoxValue: null
        }
    },
    watch: {
        value (value) {
            this.textBoxValue = value;
        },
        textBoxValue (value) {
            this.$emit('update:value', value);
        }
    },
    emits: ['update:value']
}
</script>

<template>
    <div class="sib-textbox" :style="{ width, height, backgroundColor }" :class="disabled ? 'sib-textbox_disabled' : null">
        <input v-model="textBoxValue" :type="type" :placeholder="placeholder" :disabled="disabled" />
    </div>
</template>

<style lang="scss" scoped>
.sib-textbox {
    border-radius: 10px;
    position: relative;

    display: flex;
    flex-grow: 1;
    align-items: baseline;

    input {
        width: 100%;
        height: 100%;
        outline: 0;
        border: 0;
        user-select: text;
        margin: 0;
        background-color: transparent;
        color: rgba(0, 0, 0, .87);
        font-size: 16px;

        padding: 15px 16px 14px;
    }

    input[type="text"]::placeholder {
        color: #000;
        opacity: 0.5;
    }

    input[type="number"]::placeholder {
        color: #000;
        opacity: 0.5;
    }
}

.sib-textbox_disabled {
    opacity: 0.5;
}
</style>