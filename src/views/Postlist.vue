<template>
  <div>
    <el-pagination
      layout="total,sizes,prev, pager, next,jumper"
      :total="total"
      class="list"
      :page-size="pageSize"
      :page-sizes="[2, 5, 8, 10]"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>
    <el-table :data="postList" style="width: 100%" class="table">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="缩略图">
        <template slot-scope="scope">
          <img
            v-if="scope.row.cover[0]"
            :src="scope.row.cover[0].url | fixUrl"
            alt
            class="thumbnail"
          />
          <img v-else src="@/assets/logo.png" alt class="thumbnail" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="user.nickname" label="作者"></el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="$router.push('/editpost?id=' + scope.row.id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="ExportData">测试</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [],
      pageSize: 5,
      pageIndex: 1,
      total: 0,
    };
  },
  created() {
    this.postRender();
  },
  filters: {
    fixUrl(url) {
      const reg = /^http/;
      if (reg.test(url)) {
        return url;
      } else {
        return "http://127.0.0.1:3000" + url;
      }
    },
  },
  methods: {
    postRender() {
      this.$axios({
        url: "/post",
        params: {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
        },
      }).then((res) => {
        console.log(res);
        this.postList = res.data.data;
        this.total = res.data.total;
      });
    },
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.postRender();
    },
    currentChange(index) {
      this.pageIndex = index;
      this.postRender();
    },
    ExportData() {
      import("../excel/Export2Excel").then((excel) => {
        //表格的表头列表

        const tHeader = ["id", "标题", "作者"]; //与表头相对应的数据里边的字段

        const filterVal = ["id", "title", "user.nickname"];

        const list = this.postList;

        const data = this.formatJson(filterVal, list); //这里还是使用export_json_to_excel方法比较好，方便操作数据

        excel.export_json_to_excel(tHeader, data, "合并收款");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  margin-top: 20px;
  background: #e9eef3;
}
.table {
  margin-top: 20px;
}
.thumbnail {
  width: 100%;
  height: 146px;
  object-fit: contain;
}
</style>