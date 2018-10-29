<template>
  <div class="user-avator-dropdown">

   <div class="notice" @click="jumpToMess">
         <Icon  type="ios-notifications-outline"  size="30"></Icon>
          <Badge  v-if="messNum > 0" class="dot" status="error" size="30" />
   </div>

    <Dropdown @on-click="handleClick" >
      <Avatar :src="userAvator"/>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import './user.less'
import { mapActions } from 'vuex'
import { getNoRead } from '@/api/apiMessage'
export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      messNum: 0
    }
  },
  methods: {
    ...mapActions(['handleLogOut']),
    checkMess () {
      getNoRead().then(res => {
        if (res.status === 0) {
          console.log('未读消息数', res.data)

          this.messNum = res.data
        }
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
          })
          break
      }
    },
    jumpToMess () {
      this.$router.push({
        path: '/setting/system-notice'
      })
    }
  },
  mounted () {
    // console.log("查看thiss", this);
    this.checkMess()
  }
}
</script>
<style lang="less" scoped>
.notice {
  display: inline-block;
}
.dot {
  top: -10px;
  left: -10px;
}
.ivu-badge-status-dot {
  width: 8px;
  height: 8px;
}
</style>
