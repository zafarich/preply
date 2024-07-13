<script setup>
import { ref, onMounted } from 'vue-demi'
import BaseImg from 'src/components/UI/BaseImg.vue'

const baseUrl = import.meta.env.VITE_BASE_URL

const props = defineProps({
    items: {
        type: Array,
        default: [],
    },
    page: {
        type: Number,
        default: 1,
    },
    page_size: {
        type: Number,
        default: 5,
    },
})
</script>
<template>
    <div class="leaders-list-home">
        <div class="three-rating-box" v-if="page == 1">
            <div class="three-rating__item" v-if="items[1]">
                <div class="position-number">2</div>
                <div class="profile-circle">
                    <img
                        v-if="items[1].image"
                        :src="`${items[1].image}`"
                        class="profile-img"
                    />
                    <img
                        v-else
                        src="icons/user-icon.svg"
                        alt=""
                        class="profile-img"
                    />
                </div>
                <div class="text-center">
                    <div class="text-username">
                        {{ items[1].first_name }} {{ items[1].last_name }}
                    </div>
                    <div>{{ items[1].score_sum.toFixed(1) }}</div>
                </div>
            </div>
            <div class="three-rating__item" v-if="items[0]">
                <div class="position-number">1</div>
                <img class="crown-img" src="/icons/crown.png" alt="" />
                <div class="profile-circle">
                    <img
                        v-if="items[0].image"
                        :src="`${items[0].image}`"
                        class="profile-img"
                    />
                    <img
                        v-else
                        src="icons/user-icon.svg"
                        alt=""
                        class="profile-img"
                    />
                </div>
                <div class="text-center">
                    <div class="text-username">
                        {{ items[0].first_name }} {{ items[0].last_name }}
                    </div>
                    <div>{{ items[0].score_sum.toFixed(1) }}</div>
                </div>
            </div>
            <div class="three-rating__item" v-if="items[2]">
                <div class="position-number">3</div>
                <div class="profile-circle">
                    <img
                        v-if="items[2].image"
                        :src="`${items[2].image}`"
                        class="profile-img"
                    />
                    <img
                        v-else
                        src="icons/user-icon.svg"
                        alt=""
                        class="profile-img"
                    />
                </div>
                <div class="text-center">
                    <div class="text-username">
                        {{ items[2].first_name }} {{ items[2].last_name }}
                    </div>
                    <div>{{ items[0].score_sum.toFixed(1) }}</div>
                </div>
            </div>
        </div>

        <table>
            <thead>
                <th>#</th>
                <th>{{ $t('student') }}</th>
                <th>{{ $t('common') }}</th>
                <th>{{ $t('accuracy') }} ( % )</th>
            </thead>

            <tbody>
                <template v-for="(item, index) in items" :key="index">
                    <tr v-if="!(page === 1 && index < 3)">
                        <!-- {{
                            item
                        }} -->

                        <td>{{ (page - 1) * page_size + index + 1 }}</td>
                        <td>
                            <div class="flex items-center">
                                <img
                                    v-if="item.image"
                                    :src="`${item.image}`"
                                    class="w-10 h-10 rounded-full mr-2"
                                />
                                <img
                                    v-else
                                    src="icons/user-icon.svg"
                                    alt=""
                                    class="w-10 rounded-full mr-2"
                                />

                                <div>
                                    <div class="fio">
                                        {{ item.first_name }}
                                        {{ item.last_name }}
                                    </div>
                                    <div class="city">{{ item.region }}</div>
                                </div>
                            </div>
                        </td>
                        <td>{{ item.score_sum.toFixed(1) }}</td>
                        <td>{{ item.accuracy_avg }}%</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" src="src/assets/scss/LeaderTable.scss"></style>
