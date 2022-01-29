<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Service</el-breadcrumb-item>
      <el-breadcrumb-item>Query</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button
        class="add"
        size="small"
        type="primary"
        native-type="button"
        @click="add()"
        >new record</el-button
      >
      <el-table :data="orderList" border stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column
          label="items"
          type="expand"
          prop="itemList"
          width="58px"
        >
          <template slot-scope="scope">
            <div v-for="v,i in scope.row.items" :key="i"> 
            {{ scope.row.items[i] }} {{scope.row.price[i]}}</div>
          </template>
          <!-- <template slot-scope="scope"> -->
          <el-table prop="itemList" :default-expand-all="expandAll">
            <el-table-column label="execute">
              <!-- <template slot-scope="scope">
                <input type="text">
              </template> -->
            </el-table-column>
          </el-table>
        </el-table-column>
        <el-table-column label="id" prop="id" width="56px"></el-table-column>
        <!-- <el-table-column label="createdTime"  width="226px">
          <template slot-scope="scope">
            {{ scope.row.createdTime | dataFormat }}
          </template>
        </el-table-column> -->
        <el-table-column
          label="totalAmount"
          prop="totalAmount"
          width="106px"
        ></el-table-column>
        <el-table-column
          label="receiptDate"
          prop="receiptDate"
          width="198px"
        ></el-table-column>
        <el-table-column label="note" prop="note">
          <!-- <template slot-scope="scope"> -->
          <!-- <el-input
            style="width: 230px"
            v-model="orderList[index]['items'][i]"
          ></el-input> -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column label="option">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editDialog(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteOne(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        class="signUpBox"
        :title="title"
        :visible.sync="editDialogVisible"
        width="50%"
      >
        <!-- 添加分类表单 -->
        <el-form
          :model="editForm"
          ref="editFormRef"
          label-width="100px"
          :rules="editFromRules"
        >
          <el-form-item label="id">
            <el-input disabled v-model="editForm.id"></el-input>
          </el-form-item>
          <el-form-item label="totalAmount">
            <el-input v-model="editForm.totalAmount"></el-input>
          </el-form-item>
          <el-form-item label="receiptDate">
            <el-input v-model="editForm.receiptDate"></el-input>
          </el-form-item>
          <el-form-item label="note">
            <el-input v-model="editForm.note"></el-input>
          </el-form-item>
          <el-form-item label="Items">
            <div v-for="(row, i) in editForm.items" :key="i">
              <el-input
                style="width: 230px"
                v-model="editForm['items'][i]"
              ></el-input>
              <el-input
                @input="getTotal()"
                style="width: 80px"
                v-model="editForm['price'][i]"
              ></el-input>
              <el-button
                class="delBtn"
                type="text"
                size="mini"
                @click="deleteItem(i)"
              >
                Del
              </el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="addItem()">
              add item
            </el-button>
          </el-form-item>
          <el-form-item label="Total">
            <el-input
              style="width: 310px"
              v-model="editForm.totalAmount"
            ></el-input>
            <el-button
              class="delBtn"
              type="text"
              size="mini"
              @click="getTotal()"
            >
              getTotal
            </el-button>
          </el-form-item>
          <!-- <el-form-item>
            <div class="block">
              <span class="demonstration">默认</span>
              <el-date-picker
                v-model="editForm.createdTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">Cancel</el-button>
          <el-button type="primary" @click="beforeSubmit">Submit</el-button>
        </span>
      </el-dialog>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> -->
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      expandAll: false,
      orderList: [],
      itemList: [
      ],
      editForm: {},
      editDialogVisible: false,
      value: '',
      title: '',
      editFromRules: {
        totalAmount: [
          { required: true, message: '', trigger: 'blur' },
          { message: 'num please', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.query()
  },

  methods: {
    getTotal () {
      let sum = 0
      this.editForm.price.map(v => sum += Number(v))
      this.editForm.totalAmount = sum
    },
    addItem () {
      this.editForm.items.push('0')
      this.editForm.price.push('0')
    },
    deleteItem (i) {
      this.editForm.items.splice(i, 1)
      this.editForm.price.splice(i, 1)
    },
    add () {
      this.editForm = {
        items:[],
        price:[],
      }
      this.editDialogVisible = true
      this.title = 'new record'
    },
    async submitAdd () {
      // this.editForm.createdTime = this.editForm.createdTime == '' ? this.editForm.createdTime :Date.now()
      // console.log(this.editForm);
      const { data } = await axios({
        // headers: [Content-Type"application/json"],
        url: "/api/order/create",
        method: "post",
        data: this.editForm
      })
      if (data.code !== 0) {
        console.log(res)
        return this.$message.error('error')
      }
      this.editForm = {}
      this.editDialogVisible = false
      this.query()
      return this.$message.success('Record created successfully!')
    },
    showTime () {
      console.log(this.value);
    },
    beforeSubmit () {
      if (this.title == "new record") {
        this.submitAdd()
      }
      if (this.title == "edit record") {
        this.submitEdit()
      }
    },
    getSubmitEntity (obj) {
      let entity = {
        id: obj.id,
        totalAmount: obj.totalAmount,
        note: obj.note,
        receiptDate: obj.date,
        jsonArray: this.zipItems(obj.items, obj.price)
      }
      console.log(entity);
      return entity
    },
    async submitEdit () {
      let submitEntity = this.getSubmitEntity(this.editForm)
      // this.$refs.editFormRef.validate(async valid => {
      //   if (!valid) return
      // })
      console.log(submitEntity);
      const { data } = await axios({
        // headers: [Content-Type"application/json"],
        url: "/api/order/update",
        method: "post",
        data: submitEntity
      })
      if (data.code !== 0) {
        console.log(res)
        return this.$message.error('error')
      }
      this.editForm = {}
      this.editDialogVisible = false
      this.query()
      return this.$message.success('Record updated successfully!')
    },
    handleCancel () {
      this.editForm = {}
      this.getOrderList()
      this.editDialogVisible = false
    },
    async getOrderList () {
      //   const { data: res } = await axios('order/list', { params: "", })
      const { data } = await axios({
        method: 'get',
        url: '/api/order/list',
      })
      console.log(data)
      if (data.code !== 0) {
        console.log(res)
        return this.$message.error('获取订单数据失败')
      }
      let orderList = data.page.list
      console.log(orderList);

      this.orderList = orderList
    },
    editDialog (row) {
      this.editForm = row
      this.title = 'edit record'
      this.editDialogVisible = true
      console.log(row);
    },
    async deleteOne (row) {
      let ids = []
      ids.push(row.id)
      const { data } = await axios({
        method: 'post',
        url: '/api/order/delete',
        data: ids
      })
      if (data.code !== 0) return
      console.log(data)
      this.getOrderList()
    },
    async query () {
      const { data } = await axios({
        method: 'get',
        url: '/api/order/list',
      })
      if (data.code !== 0) {
        return this.$message.error('error')
      }
      let orderList = data.page.list
      orderList.map(v => this.getJson(v))
      orderList.map(v => this.getItems(v))
      console.log(orderList);
      this.orderList = orderList
      console.log(this.orderList);
    },

    zipItems (items, price) {
      let obj = {}
      let list = []
      items.map((item, i) => list.push(obj = { [item]: price[i] }))
      console.log(list);
      return list
    },
    getJson (obj) {
      obj.itemList = JSON.parse(obj.itemList)
    },
    getItems (obj) {
      obj.items = obj.itemList.map(o => Object.keys(o)[0])
      obj.price = obj.itemList.map(o => Object.values(o)[0])
    },
    showEditBox () {

    },
    deleteOrder () {

    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 18px;
}
.add {
  margin-bottom: 20px;
}
.searchBar {
  margin-bottom: 18px;
}
</style>