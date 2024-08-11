import { api } from 'src/boot/axios'

const url = '/api/v1/references/'

export async function loadRegions() {
    const { data } = await api(url + 'regions/')
    return data
}

export async function loadDistricts(id) {
    const { data } = await api(url + 'regions/' + id)
    return data
}
export async function getSubjects(params) {
    const { data } = await api(url + 'subjects/', { params })
    return data
}

export async function getSubjectById(id) {
    const { data } = await api(url + 'subjects/' + id + '/')
    return data
}

export async function getTestTypes(params) {
    const { data } = await api(url + 'test-types/', { params })
    return data
}

export async function getBanners() {
    const { data } = await api(url + 'banners/')
    return data
}

export async function getSelection(params) {
    const { data } = await api(url + 'selections/', { params })
    return data
}

export async function getUserStat(params) {
    const { data } = await api(url + 'users-stat/', { params })
    return data
}
