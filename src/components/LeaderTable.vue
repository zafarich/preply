<script setup>
import { ref, onMounted } from 'vue-demi'
import BaseImg from 'src/components/UI/BaseImg.vue'

const props = defineProps({
    items: {
        type: Array,
        default: [],
    },
})
</script>
<template>
    <div class="leaders-list-home">
        <div>
            <!-- <div class="three-rating-box">
                <div class="three-rating__item">
                    <div class="position-number">2</div>
                    <div class="profile-circle">
                        <img
                            class="profile-img"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_1bpO0XDD8fbmRvnbnkCoQNFFoH3AqofVTg&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <div class="text-center">
                        <div class="text-username">@khasan</div>
                        <div>4542 pts</div>
                    </div>
                </div>
                <div class="three-rating__item">
                    <div class="position-number">1</div>
                    <img
                        class="crown-img"
                        src="/images/icons/crown.png"
                        alt=""
                    />
                    <div class="profile-circle">
                        <img
                            class="profile-img"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT85_hgbSWovX-31r0_mHGwL8_HO4-2-Y-J4Z3cUjzEvF2YIm9ILGgoRS_lAEnmZrjQm30&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <div class="text-center">
                        <div class="text-username">@zafaric</div>
                        <div>4542 pts</div>
                    </div>
                </div>
                <div class="three-rating__item">
                    <div class="position-number">3</div>
                    <div class="profile-circle">
                        <img
                            class="profile-img"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu_r1Z91AaWpSXXoHKASTdGIwqU43_-O8niWO9Cw8uYTJnfksBq6YPjM4SaxMMzNlSza0&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <div class="text-center">
                        <div class="text-username">@abbos</div>
                        <div>4542 pts</div>
                    </div>
                </div>
            </div> -->

            <table>
                <thead>
                    <th>#</th>
                    <th>F.I.O</th>
                    <th>Aniqlik ( % )</th>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <!-- {{
                            item
                        }} -->
                        <td>4</td>
                        <td>
                            <div class="flex items-center">
                                <div>
                                    <div class="fio">{{ item.first_name }}</div>
                                    <div class="city">{{ item.region }}</div>
                                </div>
                            </div>
                        </td>
                        <td>100%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" src="src/assets/scss/LeaderTable.scss"></style>
