<script setup>
import { ref, onMounted } from "vue-demi";
import BaseImg from "src/components/UI/BaseImg.vue";
</script>
<template>
  <div class="leaders-list-home">
    <div>
      <table>
        <thead>
          <th>#</th>
          <th>F.I.O</th>
          <th>Aniqlik ( % )</th>
        </thead>

        <tbody>
          <tr>
            <td>
              <img class="mr-3" src="/images/icons/rating_1.png" alt="" />
            </td>
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
            <td>
              <img class="mr-3" src="/images/icons/rating_2.png" alt="" />
            </td>
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
            <td>
              <img class="mr-3" src="/images/icons/rating_3.png" alt="" />
            </td>
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
            <td>4</td>
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
