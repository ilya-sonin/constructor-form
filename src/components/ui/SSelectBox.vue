<script>
import SCheckBox from './SCheckBox.vue';

export default {
    name: 's-select-box',
    components: { SCheckBox },
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
            default: 'single', // 'multiply'
        },
        value: {
            type: Array // ['oneelementselected'] || ['some1', 'some2']
        },
        backgroundColor: {
            type: String,
            default: 'var(--sib-special-white)'
        },
        disabled: {
            type: Boolean
        },
        dataSource: {
            type: Array
        }
    },
    emits: ['update:value'],
    created () {
        if (this.value != null && this.value.length > 0) {
            this.selectedValues = this.value;
        } else {
            this.selectedValues = [this.placeholder];
        }
    },
    data () {
        return {
            selectedValues: [],
            opened: false
        }
    },
    watch: {
        value (value) {
            this.selectedValues = value;
        }
    },
    methods: {
        changeSelectBoxOpened () {
            this.opened = !this.opened;
        },
        elementIsSelected (element) {
            if (element !== null) {
                if (this.selectedValues.length > 0) {
                    const index = this.selectedValues.findIndex(selectedElement => selectedElement === element);

                    if (index !== -1) {
                        return true;
                    }
                }
            }

            return false;
        },
        addSelectedElement (element) {
            if (this.type === 'multiply') {
                this.$emit('update:value', [...value, element])
            } else {
                this.$emit('update:value', element);
            }
        },
    },
}
</script>

<template>
    <div class="sib-selectbox" :style="{ width, height, backgroundColor }"
        :class="disabled ? 'sib-selectbox_disabled' : null" @click="changeSelectBoxOpened">
        <span :class="selectedValues[0] === placeholder ? 'sib-selectbox__placeholder' : null">
            <span v-for="value, index in selectedValues">
                <span>{{ value }}</span>
                <span v-if="index < (selectedValues.length - 1)">,</span>
            </span>
        </span>
        <i class="chevron-down" v-if="opened === false"></i>
        <i class="chevron-up" v-else></i>
        <div class="sib-selectbox__dropdown" v-if="opened === true">
            <div class="sib-selectbox__content">
                <div class="sib-selectbox__element" v-for="element, index in  dataSource " :key="index"
                    @click="addSelectedElement(element)">
                    <SCheckBox :value="elementIsSelected(element)" />
                    <span>{{ element }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sib-selectbox {
    border-radius: 10px;
    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    padding: 0 4%;

    font-size: 16px;

    i {
        opacity: 0.7;
    }

    &:hover {
        cursor: pointer;
    }
}

.sib-selectbox_disabled {
    opacity: 0.5;
}

.sib-selectbox__placeholder {
    color: #000;
    opacity: 0.5;
}

.sib-selectbox__dropdown {
    position: absolute;
    z-index: 1;
    background-color: white;
    width: 100%;
    left: 0;
    top: 89%;
}

.sib-selectbox__content {
    margin-top: .2em;
    display: flex;
    flex-direction: column;
}

.sib-selectbox__element {
    display: flex;
    flex-direction: row;
    padding: 10%;

    &:hover {
        background-color: var(--sib-special-white);
    }
}
</style>