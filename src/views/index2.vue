<template>
  <div>
    <input
      type="file"
      @change="importf(this)"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
    <div id="myChart" :style="{ width: '600px', height: '300px' }"></div>
  </div>
</template>

<script>
import XLSX from "xlsx";
const echarts = require("echarts");

export default {
  name: "HelloWorld",
  props: {
    type: String,
    default: "选择excel文件",
  },
  data() {
    return {
      finsh: [],
      b: [20, 20, 36, 10, 10, 20],
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    importf(obj) {
      let _this = this;

      let inputDOM = this.$refs.inputer; // 通过DOM取文件数据

      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串

      var f = this.file;

      var reader = new FileReader();

      //if (!FileReader.prototype.readAsBinaryString) {

      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";

        var rABS = false; //是否将文件读取为二进制字符串

        var pt = this;

        var wb; //读取完成的数据

        var outdata;

        var reader = new FileReader();

        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);

          var length = bytes.byteLength;

          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }

          var XLSX = require("xlsx");

          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化

              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }

          // outdata就是你想要的东西 excel导入的数据

          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

          // excel 数据再处理

          let arr = [];

          outdata.map((v) => {
            let obj = {};

            obj.account = v.登录账号;

            obj.name = v.姓名;

            obj.department = v.部门;

            obj.secondDepartment = v.二级部门;

            obj.status = v.状态;

            obj.id = v.id;

            arr.push(obj);
          });

          _this.accountList = [...arr];

          console.log(_this.accountList);

          _this.reload();
        };

        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: this.b,
          },
        ],
      });
    },
  },
};
</script>

<style>
.input-file {
  display: none;
}
</style>