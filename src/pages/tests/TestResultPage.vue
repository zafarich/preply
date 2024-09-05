<template>
    <div class="relative !text-sm">
        <TestResultBlock
            v-if="testStore.test_type == TEST_TYPES.BLOCK"
            @downloadPdf="downloadPdf"
            @dowloadResultPage="dowloadResultPage"
            @sendFileToTelegramUser="sendFileToTelegramUser"
        />
        <TestResultCommon
            v-else
            @downloadPdf="downloadPdf"
            @dowloadResultPage="dowloadResultPage"
            @sendFileToTelegramUser="sendFileToTelegramUser"
        />

        <div
            class="fixed bottom-28 right-4 border rounded-full p-3 bg-orange-500 cursor-pointer"
            @click="scrollToTop"
            id="scrollIcon"
            v-if="showToTop"
        >
            <img src="/images/icons/to-top-icon.svg" class="w-4 h-4" />
        </div>
        <div
            class="fixed bottom-16 right-4 border rounded-full p-3 bg-orange-500 cursor-pointer"
            @click="scrollToBottom"
            id="scrollIcon"
            v-if="showToBottom"
        >
            <img
                src="/images/icons/to-top-icon.svg"
                class="w-4 h-4 rotate-180"
            />
        </div>
    </div>
</template>

<script setup>
import { useTestStore } from 'src/stores/test'
import TestResultCommon from './components/TestResultCommon.vue'
import TestResultBlock from './components/TestResultBlock.vue'
import { TEST_TYPES } from 'src/utils/constants'
import { onMounted, ref } from 'vue'
import { api } from 'src/boot/axios'
import html2pdf from 'html2pdf.js'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()
const testStore = useTestStore()
const showToTop = ref(false)
const showToBottom = ref(true)

const { t: $t } = useI18n()
const $q = useQuasar()

const sendFileToTelegramUser = async () => {
    try {
        const res = await userStore.sendFileToUserTelegram({
            result_id: testStore.GET_TEST_RESULTS.id,
        })

        $q.notify({
            type: 'positive',
            textColor: 'white',
            position: 'top',
            message: $t('file_sended_to_tg'),
        })
    } catch (error) {
        console.error('Error sending file to telegram:', error)
        $q.notify({
            type: 'negative',
            textColor: 'white',
            position: 'top',
            message: $t('error_occured'),
        })
    }
}

const downloadPdf = async (pdfUrl) => {
    try {
        const response = await api.get(pdfUrl, {
            responseType: 'blob',
        })

        const fileUrl = response.request.responseURL

        const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1)

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName) // You can set the file name here
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)

        $q.notify({
            type: 'positive',
            textColor: 'white',
            position: 'top',
            message: $t('file_saved'),
        })
    } catch (error) {
        console.error('Error downloading the PDF file:', error)
        $q.notify({
            type: 'negative',
            textColor: 'white',
            position: 'top',
            message: $t('error_occured'),
        })
    }
}
const dowloadResultPage = async (pdfContent) => {
    try {
        const options = {
            margin: 10,
            filename: 'my-result.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        }

        // Generate the PDF as a blob
        const pdfBlob = await html2pdf()
            .from(pdfContent)
            .set(options)
            .outputPdf('blob')

        // Create a link element and force the download
        const link = document.createElement('a')
        link.href = URL.createObjectURL(pdfBlob)
        link.download = 'my-result.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        $q.notify({
            type: 'positive',
            textColor: 'white',
            position: 'top',
            message: $t('file_saved'),
        })
    } catch (error) {
        console.log('error', error)

        $q.notify({
            type: 'negative',
            textColor: 'white',
            position: 'top',
            message: $t('error_occured'),
        })
    }
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'instant',
    })
}

const scrollToBottom = () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight - window.innerHeight,
        behavior: 'instant',
    })
}

onMounted(() => {
    window.addEventListener('scroll', () => {
        const scrollIcon = document.getElementById('scrollIcon')
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop

        if (scrollTop > 500) {
            showToTop.value = true
        } else {
            showToTop.value = false
        }
        // }
    })
})
</script>

<style lang="scss" src="src/assets/scss/TestResultPage.scss"></style>
