<template>
    <div class="file-upload">
        <div
            class="image-upload-wrap"
            :class="{
                'image-loaded': !showImageUploadWrap,
                error,
                mobile: $q.platform.is.mobile,
            }"
        >
            <q-file
                class="file-upload-input"
                :model-value="modelValue"
                :accept="accept"
                v-bind="$attrs"
                @update:model-value="onChangeFile"
            />
            <q-icon
                :name="outlinedAddAPhoto"
                size="44px"
                :color="error ? 'negative' : 'grey'"
                class="material-icons-outlined"
            />
            <div class="title" v-if="showTitle">
                {{ t(showImageUploadWrap ? title : changeTitle) }}
            </div>
        </div>
        <div class="file-upload-content" v-if="!showImageUploadWrap">
            <img
                class="file-upload-image"
                :src="loadedImage"
                alt="upload-image"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue-demi'
import { outlinedAddAPhoto } from '@quasar/extras/material-icons-outlined'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
    maxFileSize: {
        type: Number,
        default: 0,
    },
    error: {
        type: Boolean,
        default: false,
    },
    urlImage: {
        type: String,
        default: null,
    },
    accept: {
        type: String,
        default: '.jpeg,.jpg,.png',
    },
    title: {
        type: String,
        default: 'add_logo',
    },
    changeTitle: {
        type: String,
        default: 'change',
    },
    showTitle: {
        type: Boolean,
        default: true,
    },
    modelValue: String,
})
const emit = defineEmits(['update:modelValue'])
const showImageUploadWrap = ref(!props.urlImage)
const loadedImage = ref(props.urlImage || '#')

function readURL(file) {
    if (file) {
        const reader = new FileReader()

        reader.onload = function (e) {
            showImageUploadWrap.value = false
            loadedImage.value = e.target.result
        }
        reader.readAsDataURL(file)
    } else {
        removeUpload()
    }
}

function onChangeFile(e) {
    emit('update:modelValue', e)

    readURL(e)
}

watch(
    () => props.modelValue,
    () => {
        if (!props.modelValue) removeUpload()
    },
)

function removeUpload() {
    showImageUploadWrap.value = true
    loadedImage.value = '#'
}
</script>

<style lang="scss" scoped>
.file-upload {
    width: 100%;
    position: relative;
    .image-upload-wrap {
        border-radius: 10px;
        position: relative;
        width: 100%;
        height: 172px;
        border: 2px dashed $border-color;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .title {
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
            margin-top: 14px;
            text-align: center;
            // width: 125px;
        }
        .q-icon {
            z-index: 1;
        }

        &.error {
            border-color: $negative;
            .title {
                color: $negative;
            }
        }

        &:not(.mobile):hover {
            background: rgba(0, 0, 0, 0.08);
        }
        &.image-loaded {
            position: absolute;
            opacity: 0;
            z-index: 111;
            &:not(.mobile):hover {
                background: rgba(0, 0, 0, 0.5);
                opacity: 1;
                color: $white;
            }
        }
    }
    :deep(.q-field__control) {
        opacity: 0;
    }
    .file-upload-input {
        position: absolute;
        z-index: 2;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        outline: none;
        cursor: pointer;
    }
    .file-upload-content {
        width: 100%;
        height: 172px;
        border: 1px solid $border-color;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        img {
            width: 100%;
            object-fit: contain;
            max-height: 165px;
        }
    }
}
</style>
