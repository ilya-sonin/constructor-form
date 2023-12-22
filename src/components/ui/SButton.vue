<script>
export default {
    name: 's-button',
    props: {
        width: {
            type: String,
            default: '160px'
        },
        height: {
            type: String,
            default: '50px'
        },
        stylingMode: {
            type: String,
            default: 'normal' // contained, outlined, text
        },
        text: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'center', // start, end, center
        },
        type: {
            type: String,
            default: 'default', // 'simple'
        }
    },
    data () {
        return {
            buttonTextColor: 'white',
            onHover: false
        }
    },
    methods: {
        getButtonClass () {
            const classes = [];

            if (this.stylingMode === 'outlined') {
                this.buttonTextColor = 'var(--sib-accent-color)';
                classes.push('sib-button_outlined');
            } else if (this.stylingMode === 'text') {
                if (this.type === 'simple') {
                    this.buttonTextColor = 'black';
                } else {
                    this.buttonTextColor = 'var(--sib-accent-color)';
                }

                classes.push('sib-button_text');
            } else {
                classes.push('sib-button_contained');
                this.buttonTextColor = 'white';
            }

            if (this.onHover === true) {
                if (this.type === 'simple') {
                    this.buttonTextColor = 'var(--sib-accent-color)';
                } else {
                    this.buttonTextColor = 'white';
                    classes.push('sib-button_hover');
                }
            }

            return classes
        },
        mouseover () {
            this.onHover = true;
        },
        mouseout () {
            this.onHover = false;
        }
    },
}
</script>

<template>
    <div class="sib-button" :class="getButtonClass()" :style="{ width, height }">
        <button :style="{ color: buttonTextColor, justifyContent: position }" @mouseover="mouseover" @mouseout="mouseout">
            <i v-if="icon !== null" class="icon" :class="icon"></i>
            <span>{{ text }}</span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.sib-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;

    button {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        outline: none;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .4em;

        &:hover {
            cursor: pointer;
        }
    }
}

.sib-button_contained {
    button {
        background-color: var(--sib-accent-color);
    }
}

.sib-button_outlined {
    button {
        background-color: white;
        border: 1px solid var(--sib-accent-color);
        color: var(--sib-accent-color);
    }
}

.sib-button_text {
    button {
        background-color: transparent;
    }
}

.sib-button_hover {
    button {
        cursor: pointer;
        background-color: var(--sib-hover-color);
    }
}
</style>