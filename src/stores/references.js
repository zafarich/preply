import * as api from 'src/api/references'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReferencesStore = defineStore('references', () => {
    let subjects = ref([])
    let main_subjects = ref([])
    let sub_main_subjects = ref([])

    async function getSubjects(params) {
        const res = await api.getSubjects(params)

        if (params.is_main_for_block) {
            main_subjects.value = res?.results
        } else if (params.parent_subjects) {
            sub_main_subjects.value = res?.results
        } else {
            subjects.value = res?.results
        }

        return res?.results
    }

    async function getTestTypes(params) {
        const res = await api.getTestTypes(params)
        return res?.results
    }

    async function getSubjectById(id) {
        const res = await api.getSubjectById(id)
        return res
    }
    async function getBanners() {
        const res = await api.getBanners()
        return res?.results
    }

    return {
        subjects,
        main_subjects,
        sub_main_subjects,
        getSubjects,
        getBanners,
        getTestTypes,
        getSubjectById,
    }
})
