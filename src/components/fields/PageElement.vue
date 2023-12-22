<script>
import STextBox from '../ui/STextBox.vue';
import SCheckBox from '../ui/SCheckBox.vue';

export default {
    name: 'page-element',
    components: { STextBox, SCheckBox },
    props: ['page', 'pageId', 'pageIndex', 'selectedPageId'],
    emits: ['update:selectedPageId', 'updatePageName', 'removePage'],
    data () {
        return {
            pageSelected: false,
            pageName: ''
        }
    },
    created () {
        if (this.page.form_page_name != null) {
            this.pageName = this.page.form_page_name;
        }
    },
    watch: {
        selectedPageId (value) {
            if (value !== this.pageId) {
                this.pageSelected = false;
            }
        },
        pageSelected (value) {
            if (value === true) {
                this.$emit('update:selectedPageId', this.pageId);
            }
        },
        pageName (value) {
            if (value !== null) {
                if (this.pageId === this.selectedPageId) {
                    this.$emit('updatePageName', value);
                }
            }
        },
    },
}
</script>

<template>
    <div class="page-element">
        <div class="page-element__control">
            <span @click="$emit('removePage', pageId)">Удалить страницу</span>
        </div>
        <div class="page-element__view">
            <span># {{ pageIndex + 1 }}</span>
            <STextBox :value="page.form_page_name" v-model:value="pageName" placeholder="Название страницы"
                backgroundColor="white" style="max-width: 80%" :disabled="!(selectedPageId === pageId)" />
            <SCheckBox v-model:value="pageSelected" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-element {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.page-element__control {
    span {
        color: var(--sib-accent-color);
        font-size: 16px;

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }
}

.page-element__view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>