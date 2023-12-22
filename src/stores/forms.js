import { defineStore } from 'pinia'
import { nanoid } from 'nanoid';

export const useFormsStore = defineStore('forms', {
    state: () => ({
        forms: [
            {
                form_id: nanoid(),
                form_name: 'Новая форма',
                form_author: 'user 1',
                form_date_create: new Date().toLocaleDateString(),
                pages: [] // { fields: { hidden_fields: [], show_fields: [] } }
            }
        ],
        selectedFormIndex: 0 // TODO поменять на -1
    }),
    getters: {},
    actions: {
        getPageIndexById (formIndex, pageId) {
            if (formIndex !== -1 && pageId != null) {
                return this.forms[formIndex].pages.findIndex(page => page.form_page_id === pageId);
            }

            return -1;
        },
        getFieldIndexById (formIndex, pageId, fieldType, fieldId) {
            const pageIndex = this.getPageIndexById(formIndex, pageIndex);

            if (pageIndex !== -1) {
                if (fieldType === 'hidden') {
                    return { pageIndex, fieldIndex: this.forms[formIndex].pages[pageIndex].fields.hidden_fields.findIndex(field => field.field_id === fieldId) };
                } else {
                    return { pageIndex, fieldIndex: this.forms[formIndex].pages[pageIndex].fields.show_fields.findIndex(field => field.field_id === fieldId) };
                }
            }

            return { pageIndex: pageIndex, fieldIndex: -1 };
        },

        updateSelectedFormIndex (form_id) {
            this.selectedFormIndex = this.forms.findIndex(item => item.form_id === form_id);
        },

        // --- form Controllers ---
        addNewEmptyForm () {
            return this.forms.push({
                form_id: nanoid(),
                form_name: 'Новая форма',
                form_author: 'user 1',
                form_date_create: new Date().toLocaleDateString(),
                pages: [] // { fields: { hidden_fields: [], show_fields: false } }
            });
        },
        removeFormByFormId (form_id) {
            const index = this.forms.findIndex(item => item.form_id === form_id);

            if (index !== -1) {
                return this.removeFormByIndex(index);
            }

            return false;
        },
        removeFormByIndex (index) {
            if (index !== -1) {
                this.forms.splice(index, 1);

                return true;
            }

            return false;
        },
        // --- END form controllers ---

        // --- form pages controllers ---
        addNewEmptyPage (formIndex) {
            let index = -1

            if (formIndex !== -1) {
                index = this.forms[formIndex].pages.push({
                    form_page_id: nanoid(),
                    form_page_name: 'Новая страница формы',
                    fields: {
                        hidden_fields: [],
                        show_fields: []
                    }
                })
            }

            return index
        },
        removePage (formIndex, pageId) {
            if (formIndex !== -1 && pageId != null) {
                const pageIndex = this.getPageIndexById(formIndex, pageId);
                this.forms[formIndex].pages.splice(pageIndex, 1);

                return true;
            }

            return false;
        },
        updatePageName (formIndex, pageId, formPageName) {
            if (formIndex !== -1 && pageId != null) {
                const index = this.getPageIndexById(formIndex, pageId);
                if (formPageName != null && index !== -1) {
                    this.forms[formIndex].pages[index].form_page_name = formPageName;

                    return true;
                }
            }

            return false;
        },
        // --- END form pages controllers ---

        // --- form fields controllers ---
        /**
         * Add new filed to form
         * 
         * @param {Number} formIndex : Index form 
         * @param {String} pageId : Page id 
         * @param {String} fieldType 'show' | 'hidden'  
         */
        addNewField (formIndex, pageId, fieldType = 'show') {
            if (formIndex !== -1 && pageId !== null) {
                const fieldOptions = {
                    field_id: nanoid(),
                    field_name: 'Новый field',
                    field_type: 'text', // 'number', 'select_box
                    field_required: false,
                    field_datasource: null // if (selecte_box) Array
                };
                const index = this.getPageIndexById(formIndex, pageId);

                if (index !== -1) {
                    if (fieldType === 'hidden') {
                        this.forms[formIndex].pages[index].fields.hidden_fields.push(fieldOptions);
                    } else {
                        this.forms[formIndex].pages[index].fields.show_fields.push(fieldOptions);
                    }
                }
            }
        },
        updateFieldName (formIndex, pageId, fieldType, fieldId, fieldName) {
            if (formIndex !== -1 && pageId !== null && fieldId !== null) {
                const { pageIndex, fieldIndex } = this.getFieldIndexById(formIndex, pageId, fieldType, fieldId);

                if (pageIndex !== -1 && fieldIndex !== -1) {
                    if (fieldType === 'hidden') {
                        this.forms[formIndex].pages[pageIndex].fields.fields.hidden_fields[fieldIndex].field_name = fieldName;
                    } else {
                        this.forms[formIndex].pages[pageIndex].fields.fields.show_fields[fieldIndex].field_name = fieldName;
                    }
                }
            }
        },
        removeField (formIndex, pageId, { fieldType, fieldId }) {
            if (formIndex !== -1 && pageId !== null && fieldId !== null) {
                const { pageIndex, fieldIndex } = this.getFieldIndexById(formIndex, pageId, fieldType, fieldId);

                if (pageIndex !== -1 && fieldIndex !== -1) {
                    if (fieldType === 'hidden') {
                        this.forms[formIndex].pages[pageIndex].fields.fields.hidden_fields[fieldIndex].field_name = fieldName;
                    } else {
                        this.forms[formIndex].pages[pageIndex].fields.fields.show_fields[fieldIndex].field_name = fieldName;
                    }
                }
            }
        },
        // --- END form fields controllers ---
    },
});

export default useFormsStore;