<template>
  <div>
    <el-container class="box">
      <el-aside width="200px">
        <div class="logo">黑马头条</div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="2" @click="jumpPage('/postlist')">
            <i class="el-icon-menu"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>

          <el-menu-item index="4" @click="jumpPage('/editpost')">
            <i class="el-icon-setting"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <img
            v-if="homeList.head_img"
            :src="$axios.defaults.baseURL + homeList.head_img"
            alt
          />
          <img v-else src="@/assets/logo.png" alt class="headerAvatar" />
          {{ homeList.nickname }}
          <div class="logout" @click="logout">退出</div>
        </el-header>
        <el-main>
          <Breadcrumb />
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      homeList: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {
    // console.log(this.homeList.id);
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    jumpPage(page) {
      if (this.$route.path != page) {
        this.$router.push(page);
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.el-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #fff;
    object-fit: cover;
  }
  .logout {
    padding-left: 20px;
  }
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  .logo {
    height: 60px;
    line-height: 60px;
    font-size: 26px;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>