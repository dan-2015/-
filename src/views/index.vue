<template>
  <div>
    <div class="app-container calendar-list-container">
      <div class="patientInfo">
        <div class="title">
          <h5>患者信息</h5>
        </div>
        <el-form
          :model="registerFrom.info"
          ref="registerFrom.info"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row type="flex" justify="space-around">
            <el-col :span="6" type="flex">
              <el-form-item label="患者姓名:" prop="name" size="mini">
                <el-input
                  v-model="registerFrom.info.name"
                  style="width: 60%; float: left"
                  @input="showTable"
                  :debounce="400"
                  @blur="hidden"
                >
                </el-input>
                <i></i>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="患者性别:" prop="gender" @mousedown="hidden">
                <el-radio-group v-model="registerFrom.info.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                  <el-radio :label="2">保密</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="6" type="flex">
              <el-form-item label="患者年龄:">
                <el-date-picker
                  v-model="registerFrom.info.birthday"
                  type="date"
                  placeholder="选择日期"
                  default-value="1990-01-01"
                  style="width: 60%; float: left"
                  @blur="showDay"
                >
                </el-date-picker>
                <div v-if="isDay">
                  <el-input
                    style="float: left; width: 20%; padding: 0 5%"
                    v-model="registerFrom.info.age"
                  ></el-input>
                  <span style="float: left">岁</span>
                </div>
                <div v-else>
                  <el-input
                    style="float: left; width: 20%; padding: 0 5%"
                    v-model="total"
                  ></el-input>
                  <span style="float: left">天</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <el-form-item label="手机号码:">
                <el-input v-model="registerFrom.info.phone"> </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="病例号码:">
                <el-input v-model="registerFrom.info.caseNumber"> </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="来源：">
                <el-select
                  style="width: 100%"
                  v-model="registerFrom.info.source"
                >
                  <el-option label="附近居民" :value="1"></el-option>
                  <el-option label="广告宣传" :value="2"></el-option>
                  <el-option label="网络推广" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-start" style="margin-left: 57px">
            <el-form-item label="标签："> </el-form-item>
          </el-row>
        </el-form>

        <el-button type="text" style="margin: 0 90%" @click="handleShow">
          详细信息
        </el-button>

        <el-form
          :model="registerFrom.info"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
          v-if="isShow"
        >
          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <el-form-item label="联系人:">
                <el-select
                  placeholder="请选择"
                  style="width: 40%; padding-right: 3%"
                  v-model="registerFrom.info.contactsRelationship"
                >
                  <el-option label="父母" :value="1"></el-option>
                  <el-option label="子女" :value="2"></el-option>
                  <el-option label="配偶" :value="3"></el-option>
                </el-select>
                <el-input
                  v-model="registerFrom.info.contactsName"
                  placeholder="联系人姓名"
                  style="width: 57%"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="联系电话:">
                <el-input v-model="registerFrom.info.contactsNumber">
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="会员信息:">
                <el-input> </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <el-form-item label="证件类型:">
                <el-select
                  placeholder="请选择"
                  style="width: 100%"
                  v-model="registerFrom.info.idType"
                >
                  <el-option label="居民身份证" :value="1"></el-option>
                  <el-option label="护照" :value="2"></el-option>
                  <el-option label="居民户口本" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="证件号码:">
                <el-input v-model="registerFrom.info.idNumber"> </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="介绍人:">
                <el-input
                  v-model="registerFrom.info.referrer"
                  placeholder="搜索患者或员工"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <el-form-item label="病人类别:">
                <el-select
                  placeholder="请选择"
                  style="width: 100%"
                  v-model="registerFrom.info.patientType"
                >
                  <el-option label="自费" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="国籍:">
                <el-select
                  placeholder="国籍"
                  style="width: 100%"
                  v-model="registerFrom.info.nationality"
                >
                  <el-option label="中国" :value="1"></el-option>
                  <el-option label="外国" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="民族:">
                <el-select
                  placeholder="请选择"
                  style="width: 100%"
                  v-model="registerFrom.info.nation"
                >
                  <el-option label="汉族" :value="1"></el-option>
                  <el-option label="回族" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <el-form-item label="职业:">
                <el-select
                  placeholder="请选择"
                  style="width: 100%"
                  v-model="registerFrom.info.job"
                >
                  <el-option label="教师" :value="1"></el-option>
                  <el-option label="自由职业" :value="2"></el-option>
                  <el-option label="退休人员" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="单位名称:">
                <el-input v-model="registerFrom.info.companyName"> </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="电子邮箱:">
                <el-input v-model="registerFrom.info.email"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <el-form-item label="婚姻:">
                <el-select
                  placeholder="请选择"
                  style="width: 100%"
                  v-model="registerFrom.info.marriage"
                >
                  <el-option label="未婚" :value="1"></el-option>
                  <el-option label="已婚" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="ABO血型:">
                <el-select
                  placeholder="请选择"
                  style="width: 100%"
                  v-model="registerFrom.info.aboBloodType"
                >
                  <el-option label="A型" :value="1"></el-option>
                  <el-option label="B型" :value="2"></el-option>
                  <el-option label="O型" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="RH血型:">
                <el-select
                  placeholder="请选择"
                  style="width: 100%"
                  v-model="registerFrom.info.rhBloodType"
                >
                  <el-option label="RH阴性" :value="1"></el-option>
                  <el-option label="RH阳性" :value="2"></el-option>
                  <el-option label="不详" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex">
            <el-col :span="6">
              <el-form-item label="籍贯:" style="margin-left: 17%; width: 100%">
                <el-input v-model="registerFrom.info.nativePlace"> </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="9" style="margin-left: 12.5%">
              <el-form-item label="住址:">
                <v-distpicker
                  @province="onChangeProvince"
                  @city="onChangeCity"
                  @area="onChangeArea"
                  style="width: 200%"
                ></v-distpicker>
              </el-form-item>
            </el-col>

            <el-col :span="6" style="margin-left: -4%">
              <el-form-item>
                <el-input placeholder="详细地址"> </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex">
            <el-col :span="22" style="margin-left: 4.3%">
              <el-form-item label="备注:">
                <el-input
                  type="textarea"
                  resize="none"
                  placeholder="(200个汉字)"
                  v-model="registerFrom.info.remark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="diagnosis">
        <div class="title">
          <h5>诊前信息</h5>
        </div>
        <el-form
          :model="registerFrom"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForms"
        >
          <el-row type="flex" justify="space-around">
            <el-col :span="4">
              <el-form-item label="过敏史:" prop="allergicHistory">
                <el-radio-group
                  v-model="registerFrom.allergicHistory"
                  @change="switch1"
                >
                  <el-radio label="否认"></el-radio>
                  <el-radio label="有"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item style="margin-left: -40%">
                <el-select
                  style="width: 100%"
                  :disabled="isallergic"
                  v-model="registerFrom.status"
                >
                  <el-option label="否认" :value="0"></el-option>
                  <el-option label="布洛芬" :value="1"></el-option>
                  <el-option label="卡那霉素" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="即往史:">
                <el-radio-group
                  v-model="registerFrom.pastMedicalHistory"
                  @change="switch2"
                >
                  <el-radio label="">否认</el-radio>
                  <el-radio label="有"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item style="margin-left: -40%">
                <el-select
                  placeholder="否认"
                  style="width: 100%"
                  :disabled="ispastMedical"
                  v-model="registerFrom.type"
                >
                  <el-option label="否认" :value="0"></el-option>
                  <el-option label="d" :value="1"></el-option>
                  <el-option label="a" :value="2"></el-option>
                  <el-option label="c" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="registrationInfo">
        <div class="title">
          <h5>挂号信息</h5>
          <div class="blocks">
            <el-date-picker
              v-model="registerFrom.createdTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </div>
        <el-form
          :model="registerFrom"
          :rules="rules"
          ref="registerFrom"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <el-form-item label="就诊类型:" prop="allergicHistory">
                <el-radio-group v-model="registerFrom.type">
                  <el-radio label="初诊"></el-radio>
                  <el-radio label="复诊"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="就诊科室:">
                <el-select
                  style="width: 100%"
                  v-model="registerFrom.departmentId"
                >
                  <el-option label="口腔" :value="0"></el-option>
                  <el-option label="未指定科室" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="就诊医生:">
                <el-select
                  placeholder="请选择"
                  style="width: 100%"
                  v-model="registerFrom.doctorId"
                >
                  <el-option label="管理员" :value="0"></el-option>
                  <el-option label="未指定医生" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="charge">
        <el-row type="flex">
          <el-button type="text" icon="el-icon-delete" @click="reset">
            清空
          </el-button>
        </el-row>
        <el-row type="flex" justify="end" v-if="false">
          <el-radio-group align="middle" style="padding-top: 1.1%">
            <el-radio label="无优惠"></el-radio>
            <el-radio label="折扣比例"></el-radio>
            <el-radio label="优惠金额"></el-radio>
          </el-radio-group>
          <div>
            <span class="cash">应收诊金(元):</span>
            <el-input style="width: 30%"></el-input>
          </div>
        </el-row>
      </div>

      <div class="confirm">
        <el-checkbox style="margin: 1rem">打印挂号单</el-checkbox>
        <el-button type="primary" @click="register"> 确认登记并收费 </el-button>
      </div>

      <el-table
        :data="tableData"
        style="width: 60%"
        class="table"
        highlight-current-row
        @current-change="handleCurrentChange"
        height="300"
        v-if="isTable"
      >
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="180">
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="phone" label="手机"> </el-table-column>
        <el-table-column prop="Doctor" label="最近就诊医生"> </el-table-column>
        <el-table-column prop="Date" label="最近就诊日期"> </el-table-column>
        <el-table-column prop="number" label="就诊次数"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
import VDistpicker from "v-distpicker";

export default {
  Timeid: -1,
  components: { VDistpicker },
  data() {
    return {
      txt1: "",
      txt2: "",
      txt3: "",
      txt4: "",
      isDay: true,
      isShow: false,
      isallergic: true,
      ispastMedical: true,
      isTable: false,
      ages: 0,
      year: 0,
      total: "",
      // patientForm: {
      //   name: "",
      //   gender: 1,
      //   age: "",
      //   iphone: "",
      //   caseNumber: "",
      //   source: "",
      // },
      // detailFrom: {
      //   contact: "",
      //   contactNumber: "",
      //   info: "",
      //   certificateType: "",
      //   certtificateNumber: "",
      //   introducer: "",
      //   patientType: "",
      //   nationality: "",
      //   nation: "",
      //   occupation: "",
      //   companyName: "",
      //   Email: "",
      //   marriage: "",
      //   ABOblood: "",
      //   RHblood: "",
      //   nativePlace: "",
      //   addressprovince: "",
      //   addresscity: "",
      //   addressarea: "",
      // },
      // diagnosisFrom: {
      //   allergicHistory: "否认",
      //   pastMedicalHistory: "否认",
      // },
      // registrationInfoFrom: {
      //   clinicType: "初诊",
      //   clinicDepartment: "",
      //   clinicDoctor: "",
      // },
      registerFrom: {
        allergicHistory: "",
        chargeStatus: 0,
        compId: 0,
        createdBy: 0,
        createdTime: "2020-09-29T09:13:27.796Z",
        departmentId: 0,
        doctorId: 0,
        id: 0,
        info: {
          name: "",
          gender: 1,
          birthday: "",
          age: 0,
          phone: "",
          caseNumber: "",
          source: 1,
          contactsRelationship: "",
          contactsName: "",
          contactsPhone: 0,
          idType: 1,
          idNumber: "",
          referrer: "",
          patientType: "",
          nationality: "",
          nation: "",
          job: "",
          companyName: "",
          email: "",
          marriage: "",
          aboBloodType: "",
          rhBloodType: "",
          nativePlace: "",
          address: "",
          compId: 0,
          createdBy: 0,
          createdTime: "2020-09-29T09:13:27.797Z",
          id: 0,
          remark: "",
        },
        infoId: 0,
        pastMedicalHistory: "",
        status: 0,
        type: "",
      },
      ceshi: {
        allergicHistory: "",
        info: {
          name: "小明",
          gender: 2,
        },
      },
      tableData: [
        {
          name: "小华",
          gender: "保密",
          age: "18岁",
          phone: "123123",
          Doctor: "小兔",
          Date: "2016-05-02",
          number: 3,
        },
        {
          name: "小华",
          gender: "保密",
          age: "18岁",
          phone: "123123",
          Doctor: "小hong",
          Date: "2016-05-02",
          number: 3,
        },
        {
          name: "小华",
          gender: "保密",
          age: 18,
          phone: "123123",
          Doctor: "小兔",
          Date: "2016-05-02",
          number: 3,
        },
        {
          name: "小华",
          gender: "保密",
          age: "18岁",
          phone: "123123",
          Doctor: "小兔",
          Date: "2016-05-02",
          number: 3,
        },
      ],
      rules: {
        name: [
          { required: true, message: "输入内容不能为空", trigger: "blur" },
        ],
        gender: [
          { required: true, message: "输入内容不能为空", trigger: "blur" },
        ],
        allergicHistory: [
          { required: true, message: "输入内容不能为空", trigger: "blur" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getCurrentMonthLast();
  },
  methods: {
    handleShow() {
      this.isShow = !this.isShow;
    },
    switch1() {
      if (this.registerFrom.allergicHistory == "") {
        this.isallergic = true;
        this.registerFrom.status = "否认";
      } else {
        this.isallergic = false;
        this.registerFrom.status = "";
      }
    },
    switch2() {
      this.ispastMedical = !this.ispastMedical;
      console.log(this.registerFrom);
    },
    register() {
      // console.log(this.registerFrom);

      this.registerFrom.info = {
        ...this.registerFrom.info,
        age: this.registerFrom.info.age * 1,
        phone: this.registerFrom.info.phone * 1,
        contactsRelationship: this.registerFrom.info.contactsRelationship * 1,
        patientType: this.registerFrom.info.patientType * 1,
        nationality: this.registerFrom.info.nationality * 1,
        nation: this.registerFrom.info.nation * 1,
        job: this.registerFrom.info.job * 1,
        marriage: this.registerFrom.info.marriage * 1,
        aboBloodType: this.registerFrom.info.aboBloodType * 1,
        rhBloodType: this.registerFrom.info.rhBloodType * 1,
      };

      console.log(this.registerFrom);
      // confirm(this.ceshi).then((response) => {
      //   console.log(response);
      // });
      this.$refs.registerFrom.validate((valid) => {
        if (valid) {
          console.log(valid);
        }
      });
    },
    onChangeProvince(a) {
      console.log(a.value);
      this.txt1 = a.value;
    },
    onChangeCity(a) {
      console.log(a.value);
      this.txt2 = a.value;
      console.log(this.txt1 + this.txt2);
    },
    onChangeArea(a) {
      console.log(a.value);
      this.txt3 = a.value;
      console.log(this.txt1 + this.txt2 + this.txt3);
      this.txt4 = this.txt1 + this.txt2 + this.txt3;
      console.log(this.txt4);
    },
    reset() {
      this.registerFrom.info = {};
      (this.registerFrom.allergicHistory = "否认"),
        (this.registerFrom.pastMedicalHistory = "否认");
    },
    getCurrentMonthLast() {
      var date = new Date();
      this.registerFrom.createdTime = new Date();
    },
    showTable() {
      this.isTable = true;
    },

    showDay() {
      this.age =
        (this.registerFrom.createdTime - this.registerFrom.info.birthday) /
        1000;
      this.year = 365 * 24 * 60 * 60;
      // console.log(this.age);
      // console.log(this.year);
      // console.log(this.year - this.age);

      // console.log(this.total);
      if (this.age - this.year > 0) {
        this.isDay = true;
        this.registerFrom.info.age = Math.floor(
          (this.age - this.year) / 60 / 60 / 24 / 365
        );
      } else {
        this.isDay = false;
        console.log(this.year - this.age);
        this.registerFrom.info.age =
          365 - Math.floor((this.year - this.age) / 60 / 60 / 24);
      }
    },
    handleCurrentChange(val) {
      console.log(val);
      this.registerFrom.info.name = val.name;
      this.registerFrom.info.gender = 2;
      this.registerFrom.info.age = val.age;
      this.registerFrom.info.birthday = val.Date;
      this.registerFrom.info.phone = val.phone;
      this.isTable = false;
    },
    hidden() {
      setTimeout(() => {
        this.isTable = false;
      }, 200);
    },
  },
};
</script>

<style lang="less" scoped>
// * {
//   font-size: 80% !important;
// }
element.style {
  width: 100px;
}
h5 {
  border-left: 2px solid #258ff1;
  padding-left: 5px;
}
.calendar-list-container {
  padding: 0px;
  height: 80vh;
}
.patientInfo /deep/ label placeholder {
  font-size: 100%;
}
.patientInfo,
.charge,
.diagnosis,
.registrationInfo {
  border-bottom: 1px dashed #dfdfdf;
}
.confirm {
  display: flex;
  justify-content: flex-end;
  padding: 2rem 0;
}
.title {
  display: flex;
  justify-content: space-between;
}

.blocks {
  margin: 1% 0;
}
.detail {
  margin-right: 10%;
}
.table {
  position: absolute;
  top: 6.5rem;
  left: 10rem;
}
.cash {
  color: #606266;
  font-size: 14px;
  margin-left: 10%;
}
</style>