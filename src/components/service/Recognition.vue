<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Service</el-breadcrumb-item>
      <el-breadcrumb-item>Recongnition</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-upload
        class="upload-demo"
        action="/api/upload/img"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture"
        :on-success="successUpload"
      >
        <el-button class="upload" size="small" type="primary"
          >upload
        </el-button>
        <div slot="tip" class="el-upload__tip">
          <!-- 只能上传jpg/png文件，且不超过500kb -->
        </div>
      </el-upload>

      <el-button
        class="query"
        size="small"
        type="primary"
        native-type="button"
        @click="queryResult()"
        >query</el-button
      >
      <div
        class="contentBox"
        v-for="(item, index) in orderBox"
        v-bind:key="index"
      >
        <el-row :gutter="20">
          <el-col :span="7">
            <div
              class="resultBox"
              v-for="(row, index) in item.result.content"
              :key="index"
            >
              {{ row }}
            </div>
          </el-col>
          <el-col class="imgBox" :span="6">
            <span>{{ item.name }}</span>
            <el-button
              class="get-text"
              size="small"
              type="primary"
              native-type="button"
              @click="submit(orderBox[index])"
              >save one</el-button
            >
            <img :src="item.url" alt="" style="width: 100%" />
          </el-col>
          <el-col :span="9">
            <el-form
              label-position="top"
              label-width="100px"
              :model="orderBox[index]"
              style="max-width: 460px"
            >
              <el-form-item label="Date">
                <el-input
                  style="width: 310px"
                  v-model="orderBox[index].result.date"
                ></el-input>
              </el-form-item>
              <el-form-item label="Items">
                <!-- <template> -->
                <div v-for="(row, i) in orderBox[index].items" :key="i">
                  <el-input
                    style="width: 230px"
                    v-model="orderBox[index]['items'][i]"
                  ></el-input>
                  <el-input
                    @input="getTotal(index)"
                    style="width: 80px"
                    v-model="orderBox[index]['price'][i]"
                  ></el-input>
                  <el-button
                    class="delBtn"
                    type="text"
                    size="mini"
                    @click="deleteItem(index, i)"
                  >
                    Del
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="addItem(index)">
                  add item
                </el-button>
              </el-form-item>
              <el-form-item label="Total">
                <el-input
                  style="width: 310px"
                  v-model="orderEntity.totalAmount"
                ></el-input>
                <el-button
                    class="delBtn"
                    type="text"
                    size="mini"
                    @click="getTotal(index)"
                  >
                    getTotal
                  </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <!-- <ul id="example-1">
        <li v-for="row in orderBox" :key="row">
          {{ row }}
        </li>
      </ul> -->
      <!-- <form
        method="post"
        action="http://localhost:9888/upload/img"
        enctype="multipart/form-data"
      >
        <input type="file" name="file" /><br />
        <input type="submit" value="提交" />
      </form> -->

      <!-- <el-upload class="upload-demo" action="" drag 
:auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">点击上传</div>
        <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
      </el-upload> -->

      <!-- vueCropper 剪裁图片实现-->
      <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
        <div class="cropper-content">
          <div class="cropper" style="text-align: center">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :centerBox="option.centerBox"
              :infoTrue="option.infoTrue"
              :fixedBox="option.fixedBox"
            ></vueCropper>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="finish" :loading="loading"
            >确认</el-button
          >
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// import { client } from '@/utils/alioss'

import axios from 'axios'

export default {
  data () {
    return {
      headers: {
        entype: "multipart/form-data"
      },
      fileList: [],
      orderBox: [],
      orderEntity: {
        memberId: 1,
        memberUsername: 'test',
        totalAmount: 0,
        note: "",
      },

      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [],  //页面显示的数组
      // 防止重复提交
      loading: false
    }
  },

  methods: {
    getTotal (index) {
      let sum = 0
      this.orderBox[index].price.map(v => sum += Number(v))
      this.orderEntity.totalAmount = sum
    },
    addItem (index) {
      this.orderBox[index].items.push('0')
      this.orderBox[index].price.push('0')
    },
    deleteItem (index, i) {
      this.orderBox[index].items.splice(i, 1)
      this.orderBox[index].price.splice(i, 1)
    },
    async queryResult () {
      const { data } = await axios({
        method: 'get',
        url: '/api/upload/query?fileName=0129test',
      })
      console.log(data)
      if (data.code !== 0) {
        return this.$message.error('error')
      }
    },
    async query () {
      const { data } = await axios({
        method: 'get',
        url: '/api/order/list',
      })
      if (data.code !== 0) {
        return this.$message.error('error')
      }
    },
    async submit (obj) {
      let submitEntity = this.getSubmitEntity(obj)
      const { data } = await axios({
        // headers: [Content-Type"application/json"],
        url: "/api/order/save",
        method: "post",
        data: submitEntity
      })
      // const {data} = await axios({
      //   method: 'get',
      //   url: '/api/order/list',
      //   data: newList
      // })
      //   console.log(data)
      if (data.code !== 0) {
        return this.$message.error('error')
      }
      return this.$message.success('Save record successfully!')
    },
    async submitAll (list) {
      let newList = list.map(o => this.getSubmitEntity(o))
      console.log(newList);
      axios({
        // headers: [Content-Type"application/json"],
        url: "/api/order/save",
        method: "post",
        data: newList
      })
    },
    getSubmitEntity (obj) {
      let entity = {
        memberId: this.orderEntity.memberId,
        memberUsername: this.orderEntity.memberUsername,
        totalAmount: this.orderEntity.totalAmount,
        note: this.orderEntity.note,
        receiptDate: obj.result.date,
        jsonArray: this.zipItems(obj.items, obj.price)
      }
      return entity
    },
    zipItems (items, price) {
      let obj = {}
      let list = []
      items.map((item, i) => list.push(obj = { [item]: price[i] }))
      return list
    },
    change (e) {
      this.$forceUpdate()
      var result = array.map(o => { return { value: o.id, label: o.name } });
      console.log(result);
    },
    handleRemove (file) {
      this.orderBox = this.arrRemoveJson(this.orderBox, 'url', file.url)
    },
    handlePreview (file) {
      console.log(file);
    },
    getText () {
      console.log("object");
    },
    successUpload (response, file) {
      console.log(file);
      this.orderBox.unshift({
        url: file.url,
        name: file.name,
        result: file.response.result,
        items: file.response.result.jsonArray.map(o => Object.keys(o)[0]),
        price: file.response.result.jsonArray.map(o => Object.values(o)[0]),

      })
      // this.orderBox.itemEntity = this.orderBox.items.map(o,i => {return {o:price[i]}})
      // let itemList = { 
      //   url: file.url, 
      //   items:[],
      //   price:[]
      //   }
      // file.response.result.jsonArray.map(o => itemList['items'].push(Object.keys(o)[0]))
      // file.response.result.jsonArray.map(o => itemList['price'].push(Object.values(o)[0]))
      // this.itemList.unshift(itemEntity)
      this.$message.success('Success Upload')
      console.log(this.orderBox);
    },

    arrRemoveJson (arr, attr, value) {
      let newArr = arr.filter(function (item, index) {
        return item[attr] != value
      })
      return newArr
    },

    changeUpload (file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('Upload file size can not more than 5MB!')
        return false
      }
      this.fileinfo = file

      this.$nextTick(() => {
        this.option.img = file.url
        this.dialogVisible = true
      })
    },
    finish () {
      this.$refs.cropper.getCropBlob((data) => {
        var fileName = 'goods' + this.fileinfo.uid
        this.loading = true
        client().put(fileName, data).then(result => {
          this.dialogVisible = false
          this.picsList.push(result.url)
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      })
    }
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 18px;
}
.el-card {
  height: 100%;
}
.upload {
  width: 80px;
}
.query {
  width: 80px;
  margin-top: 20px;
}
.get-text {
  margin-left: 30px;
  margin-bottom: 18px;
  width: 80px;
}

cropper-content {
  .cropper {
    width: auto;
    height: 300px;
  }
}

.el-col {
  margin-left: 20px;
}
.imgBox {
  margin: 20px;
}
.dateBox {
  margin: 20px 0;
}
.contentBox {
  margin: 20px;
  background-color: rgb(204, 198, 198);
}
.delBtn {
  margin-left: 20px;
}
</style>