<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Service</el-breadcrumb-item>
      <el-breadcrumb-item>Query</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row class="searchBar">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table :data="orderList" border stripe >
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column type="expand">
            <!-- <template slot-scope="scope"> -->
                <el-table :data="itemList" :default-expand-all="expandAll">
                <!-- <el-table :data="scope.row.children"> -->
                    <el-table-column label="Oid" prop="orderId" width="56px"></el-table-column>
                    <el-table-column label="id" prop="id" width="56px"></el-table-column>
                    <el-table-column label="spuName" prop="spuName" width="100px"></el-table-column>
                    <el-table-column label="categoryId" prop="categoryId" width="100px"></el-table-column>
                    <el-table-column label="skuId" prop="skuId" width="100px"></el-table-column>
                    <el-table-column label="skuName" prop="skuName" width="100px"></el-table-column>
                    <el-table-column label="skuPrice" prop="skuPrice" width="100px"></el-table-column>
                    <el-table-column label="skuCount" prop="skuCount" width="100px"></el-table-column>
                    <el-table-column label="subTotal" prop="subTotal" width="100px"></el-table-column>
                    <!-- ToDo懒加载 -->
                    <el-table-column label="execute">
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
                              @click="getCateChild()"
                              ></el-button>
                       </template>
                    </el-table-column>
                </el-table>
        </el-table-column>
        <el-table-column label="id" prop="id" width="56px"></el-table-column>
        <el-table-column label="createdTime" prop="createTime" width="176px"></el-table-column>
        <el-table-column label="totalAmount" prop="totalAmount" width="106px"></el-table-column>
        <el-table-column label="itemAmount" prop="itemAmount" width="106px"></el-table-column>
        <el-table-column label="status" prop="deleteStatus" width="88px">
             <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.deleteStatus === '1'"
              >Delete</el-tag>
            <el-tag type="success" v-else>Alive</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="note" prop="note">
        </el-table-column>
        <el-table-column label="操作">
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
                  @click="getCateChild()"
                ></el-button>
        </el-table-column>
      </el-table>

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
      expandAll:false,
      orderList: [],
      itemList:[
          {
            id:1,
              orderId:1,
              spuName:"test",
              categoryId:1,
              skuId:1,
              skuName:"test",
              skuPrice:100,
              skuQuantity:1,
              subtotal:100
           }
      ]
    }
  },

  created () {
    // this.getOrderList()
  },

  methods: {
    async getOrderList () {
      //   const { data: res } = await axios('order/list', { params: "", })
      const {data} = await axios({
        method: 'get',
        url: '/api/order/list',
      })
      console.log(data)
      if (data.code !== 0) {
        console.log(res)
        return this.$message.error('获取订单数据失败')
      }
      this.orderList = data.page.list
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
.searchBar {
    margin-bottom: 18px;
}
</style>