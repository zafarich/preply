import { api } from 'src/boot/axios'
const brand = 'api/v1/admin/brand'

export async function getBrands(params) {
    const { data } = await api(brand, { params })
    return data
}
