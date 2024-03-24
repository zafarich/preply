<script setup>
import { ref, onMounted } from "vue-demi";
import BaseImg from "src/components/UI/BaseImg.vue";
</script>
<template>
  <div class="leaders-list-home">
    <div>
      <div class="three-rating-box">
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
          <img class="crown-img" src="/images/icons/crown.png" alt="" />
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
      </div>

      <table>
        <thead>
          <th>#</th>
          <th>F.I.O</th>
          <th>Aniqlik ( % )</th>
        </thead>

        <tbody>
          <tr>
            <td>4</td>
            <td>
              <div class="flex items-center">
                <div>
                  <div class="fio">Zafarbek Qalandarov</div>
                  <div class="city">Toshkent shahar</div>
                </div>
              </div>
            </td>
            <td>100%</td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              <div class="flex items-center">
                <div>
                  <div class="fio">Musayev Hasan</div>
                  <div class="city">Kungrad</div>
                </div>
              </div>
            </td>
            <td>90%</td>
          </tr>
          <tr>
            <td>6</td>
            <td>
              <div class="flex items-center">
                <div>
                  <div class="fio">Salayev Jamshid</div>
                  <div class="city">Andijon viloyati</div>
                </div>
              </div>
            </td>
            <td>87%</td>
          </tr>
          <tr>
            <td>7</td>
            <td>
              <div class="flex items-center">
                <div>
                  <div class="fio">Zafarbek Qalandarov</div>
                  <div class="city">Toshkent shahar</div>
                </div>
              </div>
            </td>
            <td>76%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
.three-rating-box {
  display: flex;
  margin-top: 100px;
  margin-bottom: 24px;
  .three-rating__item {
    width: calc(100% / 3);
    position: relative;
    z-index: 1;
    .text-username {
      color: $secondary;
      margin-top: 5px;
    }
    .position-number {
      font-size: 20px;
      text-align: center;
    }

    .crown-img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -45px;
      width: 60px;
    }
    .profile-circle {
      position: relative;
      z-index: 2;
      width: 100%;
      height: calc((100vw - 24px) / 3);
      border-radius: 100%;
      border: 4px solid $gray-5;
      // overflow: hidden;
      background-color: #fff;
      img.profile-img {
        width: 100%;
        object-fit: contain;
        border-radius: 100%;
        height: 100%;
      }
    }
  }
  .three-rating__item:nth-child(2) {
    z-index: 2;
    .position-number {
      transform: translateY(-80px);
      font-weight: 700;
    }
    .profile-circle {
      transform: scale(1.3) translateY(-20px);
    }
  }
}
.leaders-list-home {
  table {
    width: 100%;
  }
  thead {
    th {
      text-align: left;
      font-weight: 700;
      font-size: 12px;
      color: #687588;
      //   background-color: #fafafa;
      padding: 6px 12px;
    }

    th:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    th:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      text-align: right;
    }
  }

  tbody {
    td {
      padding: 12px;
      font-size: 14px;
      font-weight: 500;
      border-bottom: 1px solid #e9eaec;
      color: #000;
      .position-simple {
        min-width: 19px;
        max-width: 19px;
        margin-right: 12px;
      }
      .fio {
        // margin-bottom: 2px;
      }
      .city {
        font-size: 12px;
        color: #687588;
      }
    }
    td:last-child {
      text-align: right;
      font-weight: 400;
    }
  }
}
</style>
