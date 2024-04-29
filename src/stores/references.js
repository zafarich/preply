import * as api from 'src/api/references'
import { defineStore } from 'pinia'

export const useReferencesStore = defineStore('references', () => {
    async function getSubjects(params) {
        const res = await api.getSubjects(params)
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
        getSubjects,
        getBanners,
        getTestTypes,
        getSubjectById,
    }
})
