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
        selectedFormIndex: -1,
        selectedPageIndex: -1,
    }),
    getters: {},
    actions: {
        getPageIndexById (formIndex, pageId) {
            if (formIndex !== -1 && pageId != null) {
                return this.forms[formIndex].pages.findIndex(page => page.form_page_id === pageId);
            }

            return -1;
        },
        getFieldIndexById (formIndex, pageId, type, fieldId) {
            const pageIndex = this.getPageIndexById(formIndex, pageId);

            if (pageIndex !== -1) {
                if (type === 'hidden') {
                    return { pageIndex, fieldIndex: this.forms[formIndex].pages[pageIndex].fields.hidden_fields.findIndex(field => field.field_id === fieldId) };
                } else {
                    return { pageIndex, fieldIndex: this.forms[formIndex].pages[pageIndex].fields.show_fields.findIndex(field => field.field_id === fieldId) };
                }
            }

            return { pageIndex: pageIndex, fieldIndex: -1 };
        },

        updateSelectedFormIndex (form_id) {
            this.selectedFormIndex = this.forms.findIndex(item => item.form_id === form_id);
            return this.selectedFormIndex;
        },
        updateSelectedPageIndex (formIndex, pageId) {
            this.selectedPageIndex = this.forms[formIndex].pages.findIndex(page => page.form_page_id === pageId);
            return this.selectedPageIndex;
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
        updateFormName (formIndex, formName) {
            if (formIndex !== -1) {
                this.forms[formIndex].form_name = formName;
            }
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
         * @param {String} type 'show' | 'hidden'  
         */
        addNewField (formIndex, pageId, type = 'show') {
            if (formIndex !== -1 && pageId !== null) {
                const fieldOptions = {
                    field_id: nanoid(),
                    field_name: 'Новый field',
                    field_type: 'text', // 'number', 'select_box
                    field_required: false,
                    field_datasource: null, // if (selecte_box) string in render covert to array
                    field_selectbox_type: 'единичный'//  || 'множественный'
                };
                const index = this.getPageIndexById(formIndex, pageId);

                if (index !== -1) {
                    if (type === 'hidden') {
                        this.forms[formIndex].pages[index].fields.hidden_fields.push(fieldOptions);
                    } else {
                        this.forms[formIndex].pages[index].fields.show_fields.push(fieldOptions);
                    }
                }
            }
        },
        updateFieldName (formIndex, pageId, type, fieldId, fieldName) {
            if (formIndex !== -1 && pageId !== null && fieldId !== null) {
                const { pageIndex, fieldIndex } = this.getFieldIndexById(formIndex, pageId, type, fieldId);

                if (pageIndex !== -1 && fieldIndex !== -1) {
                    if (type === 'hidden') {
                        this.forms[formIndex].pages[pageIndex].fields.hidden_fields[fieldIndex].field_name = fieldName;
                    } else {
                        this.forms[formIndex].pages[pageIndex].fields.show_fields[fieldIndex].field_name = fieldName;
                    }
                }
            }
        },
        updateFieldType (formIndex, pageId, type, fieldId, fieldType) {
            if (formIndex !== -1 && pageId !== null && fieldId !== null) {
                const { pageIndex, fieldIndex } = this.getFieldIndexById(formIndex, pageId, type, fieldId);

                if (pageIndex !== -1 && fieldIndex !== -1) {
                    if (type === 'hidden') {
                        this.forms[formIndex].pages[pageIndex].fields.hidden_fields[fieldIndex].field_type = fieldType;
                    } else {
                        this.forms[formIndex].pages[pageIndex].fields.show_fields[fieldIndex].field_type = fieldType;
                    }
                }
            }
        },
        updateFieldRequiredStatus (formIndex, pageId, type, fieldId, fieldRequiredStatus) {
            if (formIndex !== -1 && pageId !== null && fieldId !== null) {
                const { pageIndex, fieldIndex } = this.getFieldIndexById(formIndex, pageId, type, fieldId);

                if (pageIndex !== -1 && fieldIndex !== -1) {
                    if (type === 'hidden') {
                        this.forms[formIndex].pages[pageIndex].fields.hidden_fields[fieldIndex].field_required = fieldRequiredStatus;
                    } else {
                        this.forms[formIndex].pages[pageIndex].fields.show_fields[fieldIndex].field_required = fieldRequiredStatus;
                    }
                }
            }
        },
        updateFieldDataSource (formIndex, pageId, type, fieldId, fieldDataSource) {
            if (formIndex !== -1 && pageId !== null && fieldId !== null) {
                const { pageIndex, fieldIndex } = this.getFieldIndexById(formIndex, pageId, type, fieldId);

                if (pageIndex !== -1 && fieldIndex !== -1) {
                    if (type === 'hidden') {
                        this.forms[formIndex].pages[pageIndex].fields.hidden_fields[fieldIndex].field_datasource = fieldDataSource;
                    } else {
                        this.forms[formIndex].pages[pageIndex].fields.show_fields[fieldIndex].field_datasource = fieldDataSource;
                    }
                }
            }
        },
        updateFieldSelectBoxSelectTypeModel (formIndex, pageId, type, fieldId, fieldSelectBoxSelectType) {
            if (formIndex !== -1 && pageId !== null && fieldId !== null) {
                const { pageIndex, fieldIndex } = this.getFieldIndexById(formIndex, pageId, type, fieldId);

                if (pageIndex !== -1 && fieldIndex !== -1) {
                    if (type === 'hidden') {
                        this.forms[formIndex].pages[pageIndex].fields.hidden_fields[fieldIndex].field_selectbox_type = fieldSelectBoxSelectType;
                    } else {
                        this.forms[formIndex].pages[pageIndex].fields.show_fields[fieldIndex].field_selectbox_type = fieldSelectBoxSelectType;
                    }
                }
            }
        },
        removeField (formIndex, pageId, type, fieldId) {
            if (formIndex !== -1 && pageId !== null && fieldId !== null) {
                const { pageIndex, fieldIndex } = this.getFieldIndexById(formIndex, pageId, type, fieldId);

                if (pageIndex !== -1 && fieldIndex !== -1) {
                    if (type === 'hidden') {
                        this.forms[formIndex].pages[pageIndex].fields.hidden_fields.splice(fieldIndex, 1);
                    } else {
                        this.forms[formIndex].pages[pageIndex].fields.show_fields.splice(fieldIndex, 1);
                    }
                }
            }
        },
        hiddenField (formIndex, pageId, fieldId) {
            if (formIndex !== -1 && pageId !== null && fieldId !== null) {
                const { pageIndex, fieldIndex } = this.getFieldIndexById(formIndex, pageId, 'show', fieldId);

                if (pageIndex !== -1 && fieldIndex !== -1) {
                    const field = this.forms[formIndex].pages[pageIndex].fields.show_fields[fieldIndex];

                    this.forms[formIndex].pages[pageIndex].fields.show_fields.splice(fieldIndex, 1);

                    this.forms[formIndex].pages[pageIndex].fields.hidden_fields.push(field);
                }
            }
        },
        showField (formIndex, pageId, fieldId) {
            if (formIndex !== -1 && pageId !== null && fieldId !== null) {
                const { pageIndex, fieldIndex } = this.getFieldIndexById(formIndex, pageId, 'hidden', fieldId);

                if (pageIndex !== -1 && fieldIndex !== -1) {
                    const field = this.forms[formIndex].pages[pageIndex].fields.hidden_fields[fieldIndex];

                    this.forms[formIndex].pages[pageIndex].fields.hidden_fields.splice(fieldIndex, 1);

                    this.forms[formIndex].pages[pageIndex].fields.show_fields.push(field);
                }
            }
        },
        // --- END form fields controllers ---
    },
});

export default useFormsStore;