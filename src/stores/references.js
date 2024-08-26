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
    let usersCount = ref()

    function setSubMainSubject(value) {
        sub_main_subjects.value = value
    }

    async function getRegions() {
        const res = await api.loadRegions()
        regions.value = res.results
    }

    async function getDistricts(id) {
        const res = await api.loadDistricts(id)
        districts.value = res.results
    }

    async function getSubjects(params) {
        const res = await api.getSubjects(params)

        subjects.value = res

        return res
    }

    async function getParentSubjects(params) {
        const res = await api.getSubjects(params)

        main_subjects.value = res

        return res
    }

    async function getChildSubjects(params) {
        const res = await api.getSubjects(params)
        sub_main_subjects.value = res

        return res
    }

    async function getTestTypes(params) {
        const res = await api.getTestTypes(params)
        test_types.value = res
        return res
    }

    async function getSubjectById(id) {
        const res = await api.getSubjectById(id)
        return res
    }
    async function getBanners(params) {
        const res = await api.getBanners(params)
        return res
    }

    async function getSelection(params) {
        const res = await api.getSelection(params)
        // selections.value = [...res.results]
        return res
    }

    async function getOlympicTests() {
        const res = await api.getSelection({ olympic: true })

        return res
    }

    async function getUserStats(params) {
        const res = await api.getUserStats(params)
        usersCount.value = res.users_count
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
        usersCount,
        setSubMainSubject,
        getSelection,
        getRegions,
        getDistricts,
        getSubjects,
        getBanners,
        getChildSubjects,
        getParentSubjects,
        getTestTypes,
        getSubjectById,
        getUserStats,
    }
})
