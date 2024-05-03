import * as api from 'src/api/references'
import { defineStore } from 'pinia'
import {ref } from 'vue'

export const useReferencesStore = defineStore('references', () => {

    let subjects = ref([])


    async function getSubjects(params) {
        const res = await api.getSubjects(params)
        subjects.value = res?.results
        console.log("res", res.results)
        console.log("subjects", subjects.value)
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
        getSubjects,
        getBanners,
        getTestTypes,
        getSubjectById,
    }
})
