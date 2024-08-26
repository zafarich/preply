import { api } from 'src/boot/axios'

const url = '/api/v1/tests/'

export async function getVariants(params) {
    const { data } = await api(url + 'test-variants/', { params })
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

export async function startBySelectionTest(payload) {
    const { data } = await api.post(
        url + 'test-solving/start_by_selection_test/',
        payload,
    )
    return data
}

export async function endBySelectionTest(payload) {
    const { data } = await api.post(
        url + 'test-solving/end_by_selection_test/',
        payload,
    )
    return data
}

export async function startNationalCertificateTest(payload) {
    const { data } = await api.post(
        url + 'test-solving/start_national_certificate_test/',
        payload,
    )
    return data
}

export async function endNationalCertificateTest(payload) {
    const { data } = await api.post(
        url + 'test-solving/end_national_certificate_test/',
        payload,
    )
    return data
}

export async function getMyResults(params) {
    const { data } = await api(url + 'results/my_results/', { params })
    return data
}

export async function updateTestResult({ id, data }) {
    const res = await api(url + `results/${id}/`, { data })
    return res
}
