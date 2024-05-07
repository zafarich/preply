import { api } from 'src/boot/axios'

const url = '/api/v1/tests/'

export async function getVariants(params) {
    const { data } = await api(url + 'test-variants/', { params })
    return data
}

export async function startTest(payload) {
    const { data } = await api.post(url + 'test-variants/start_test/', payload)
    return data
}

export async function endTest(payload) {
    const { data } = await api.post(url + 'test-variants/end_test/', payload)
    return data
}

export async function getTestResultDetail(id) {
    const { data } = await api.get(url + `results/${id}/`)
    return data
}

export async function startVariantTest(payload) {
    const { data } = await api.post(
        url + 'test-solving/start_variant_test/',
        payload,
    )
    return data
}

export async function endVariantTest(payload) {
    const { data } = await api.post(
        url + 'test-solving/end_variant_test/',
        payload,
    )
    return data
}

export async function startBlockTest(payload) {
    const { data } = await api.post(
        url + 'test-solving/start_block_test/',
        payload,
    )
    return data
}

export async function endBlockTest(payload) {
    const { data } = await api.post(
        url + 'test-solving/end_block_test/',
        payload,
    )
    return data
}

export async function startBySubjectTest(payload) {
    const { data } = await api.post(
        url + 'test-solving/start_by_subject_test/',
        payload,
    )
    return data
}

export async function endBySubjectTest(payload) {
    const { data } = await api.post(
        url + 'test-solving/end_by_subject_test/',
        payload,
    )
    return data
}
