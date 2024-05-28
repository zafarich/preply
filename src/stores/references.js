import * as api from 'src/api/references'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReferencesStore = defineStore('references', () => {
    let subjects = ref([])
    let main_subjects = ref([])
    let sub_main_subjects = ref([])
    let regions = ref([])
    let districts = ref([])
    let test_types = ref([])
    let selections = ref([])

    async function getRegions() {
        const res = await api.loadRegions()
        console.log('res res', res)
        regions.value = res.results
    }

    async function getDistricts(id) {
        const res = await api.loadDistricts(id)
        districts.value = res.results
    }

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
        test_types.value = res?.results
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

    async function getSelection(params) {
        const res = await api.getSelection(params)
        // console.log('res', res)
        selections.value = [...res.results]
        return res
    }

    return {
        subjects,
        main_subjects,
        sub_main_subjects,
        test_types,
        regions,
        districts,
        selections,
        getSelection,
        getRegions,
        getDistricts,
        getSubjects,
        getBanners,
        getTestTypes,
        getSubjectById,
    }
})
