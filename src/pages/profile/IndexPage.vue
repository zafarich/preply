<script setup></script>
<template>
  <div>
    <div class="profile-top">
      <div class="profile-left">
        <div class="">
          <div class="flex justify-center mt-4 mb-4">
            <div class="avatar">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu_r1Z91AaWpSXXoHKASTdGIwqU43_-O8niWO9Cw8uYTJnfksBq6YPjM4SaxMMzNlSza0&usqp=CAU"
                alt=""
              />
            </div>
          </div>

          <div class="info-card mb-4">
            <div class="flex justify-between mb-4">
              <div class="font-semibold text-base">Ma'lumotlar</div>
              <q-btn color="primary" flat dense no-caps label="O'zgartirish" />
            </div>
            <div class="info-wrap mb-2">
              <div class="info-item">
                <div class="key">Ism</div>
                <div class="value">Zafarich</div>
              </div>
              <div class="info-item">
                <div class="key">ID</div>
                <div class="value">1001</div>
              </div>
              <div class="info-item">
                <div class="key">Hudud</div>
                <div class="value">Toshkent shahar</div>
              </div>
            </div>
          </div>

          <div class="info-card">
            <div class="flex justify-between mb-4">
              <div class="font-semibold text-base">Balans</div>
              <div class="font-semibold text-base money-text">20 000 so'm</div>
            </div>

            <q-btn no-caps outline color="primary" class="full-width"
              >Balansni to'ldirish</q-btn
            >
          </div>
        </div>
      </div>
      <div class="profile-left"></div>
    </div>
  </div>
</template>

<style lang="scss">
.profile-top {
  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    overflow: hidden;
    border: 2px solid $gray-5;
  }

  .info-card {
    padding: 20px 20px 20px 20px;
    border: 1px solid $gray-5;
    border-radius: 10px;
    .money-text {
      color: $primary;
    }
    .q-btn {
      padding: 0px !important;
    }
    .q-icon {
      font-size: 18px;
    }
  }
  .info-wrap {
    .name-text {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .info-item {
      font-size: 14px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      .key {
        font-weight: 500;
        color: #687588;
      }
      .value {
        font-weight: 500;
      }

      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
}
</style>
