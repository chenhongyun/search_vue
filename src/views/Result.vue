<template>
  <div class="page-header-index-wide" align="center">
    <a-card :body-style="{width: '1200px'}" style="margin-top: 25px" :bordered="false">
      <a-row>
        <a-auto-complete
          class="global-search"
          style="width: 700px"
          @select="onSelect"
          optionLabelProp="text"
        >
          <template slot="dataSource">
            <a-select-option v-for="item in dataSource" :key="item.category" :text="item.category">
              Found {{ item.query }} on
              <a
                :href="`https://s.taobao.com/search?q=${item.query}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.category }}
              </a>
              <span className="global-search-item-count">{{ item.count }} results</span>
            </a-select-option>
          </template>
          <a-input-search placeholder="请输入搜索内容" @search="onSearch" enterButton="搜索">
            <!--<a-button slot="enterButton">搜索</a-button>-->
          </a-input-search>
        </a-auto-complete>
      </a-row>
      <a-divider></a-divider>
      <a-row>
        <a-col align="left">
          <a-checkable-tag v-for="(item, index) in tags1" :checked='item.selected' @change="handleChange(tags1, index)">{{item.tag}}</a-checkable-tag>
        </a-col>
      </a-row>
      <a-row style="margin-top: 10px">
        <a-col align="left">
          <a-checkable-tag v-for="(item, index) in tags2" :checked='item.selected' @change="handleChange(tags2, index)">{{item.tag}}</a-checkable-tag>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <a-list
        itemLayout="vertical"
        size="large"
        :pagination="pagination"
        :dataSource="listData"
      >
        <!--<div slot="footer"><b>ant design vue</b> footer part</div>-->
        <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
          <a-row>
            <a-col :span="4">
              <img :src="item._source.image" class="img">
              <!--<a-avatar class="img" :src="item._source.image" shape="square"/>-->
            </a-col>
            <a-col :span="20">
              <a-row>
                <a-col :span="20" align="left">
                  <span class="pgc-label">电影</span>
                  <span class="title" v-html="item._source.title"></span>
                </a-col>
                <a-col :span="4" align="right">
                  <span class="score">{{item._source.score}}分</span>
                </a-col>
              </a-row>
              <a-row style="margin-top: 15px">
                <a-col :span="8" align="left">
                <span class="label">风格：</span>
                <span class="value">{{item._source.categories}}</span>
              </a-col>
                <a-col :span="8" align="left">
                  <span class="label">地区：</span>
                  <span class="value">{{item._source.area}}</span>
                </a-col>
                <a-col :span="8" align="right">
                  <span class="value">{{item._source.commentCount}}人点评</span>
                </a-col>
              </a-row>
              <a-row style="margin-top: 5px">
                <a-col :span="8" align="left">
                  <span class="label">上映时间：</span>
                  <span class="value">{{item._source.pub}}</span>
                </a-col>
                <a-col :span="16" align="left">
                  <span class="label">出演：</span>
                  <span class="value">{{item._source.performer}}</span>
                </a-col>
              </a-row>
              <a-row >
                <a-col align="left">
                  <div>
                    <span class="introduction" v-html="'简介：'+item._source.description"></span>
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col align="left">
                  <a href="https://www.bilibili.com/bangumi/play/ep284310?from=search&seid=3202366907239607856"
                     target="_blank"
                     style="text-decoration:none; outline:0; color:#00a1d6; cursor:pointer;"
                  >
                    <div class="play-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="play-btn-svg"><path d="M12.7005118,6.45096054 C14.1229144,7.30642257 14.121066,8.69451224 12.7005118,9.54886258 L4.57548779,14.4354182 C3.15308516,15.2908802 2,14.6503349 2,12.9807384 L2,3.01908474 C2,1.36022525 3.15493359,0.710054608 4.57548779,1.56440495 L12.7005118,6.45096054 Z"></path></svg>
                      立即观看
                    </div>
                  </a>
                </a-col>
              </a-row>
              <a-row style="margin-top: 10px">
                <a-col align="left">
                  <span class="source">来源：</span>
                  <a href="https://www.bilibili.com/bangumi/play/ss28274/?from=search&seid=16358216024794183601">
                    <span class="source">{{item._source.resource}}</span>
                  </a>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import { getAll } from "../api/search";

export default {
  name: "Result",
  components: {ACol, ARow},
  data () {
    return {
      loading: true,
      tags1: [],
      tags2: [],
      listData: [],
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 10,
        // showTotal: true,
        showSizeChanger: true,
        showQuickJumper: true
      }
    }
  },
  created () {
    this.getTags()
    this.axios.get('/api/_search?size=400').then(res => {
      console.log('得到结果')
      console.log(res.data.hits.hits)
      this.listData = res.data.hits.hits
    })
    // getAll().then(res => {
    //   console.log('得到结果')
    //   console.log(res)
    // })
    // for (var i=0;i<15;i++){
    //   this.listData.push({
    //     img: '/imgs/pic/xiaoshenke.jpg',
    //     title: `体制化与希望《<span style="color: red">肖申克的救赎</span>》`,
    //     introduction: `自制 用19年的时间，从监狱里面逃出，或者有人不敢想，所以做不到，或者有人敢想，但是做不到，只有安迪一个人想到了，然后做到了。因为别人都不这么做，或者别人被体制化了而觉得不可能，我们就会觉得这样不行。这样看来，监狱其实可以看作我们生活的社会自制 用19...`,
    //   })
    // }
  },
  methods: {
    onSelect () {

    },
    getTags () {
      this.tags1 = [
        {
          tag: '综合排序',
          selected: true
        },
        {
          tag: '最多点击',
          selected: false
        },
        {
          tag: '最新发布',
          selected: false
        },
        {
          tag: '最多弹幕',
          selected: false
        }
      ]
      this.tags2 = [
        {
          tag: '全部时长',
          selected: true
        },
        {
          tag: '10分钟以下',
          selected: false
        },
        {
          tag: '10-30分钟',
          selected: false
        },
        {
          tag: '30-60分钟',
          selected: false
        },
        {
          tag: '60分钟以上',
          selected: false
        }
      ]
    },
    handleChange (arr, index) {
      // console.log(checked)
      arr[index].selected = !arr[index].selected
      if (index === 0) {
        if (arr[index].selected === true) {
          for (let i = 1; i < arr.length; i++) {
            if (i !== index) {
              arr[i].selected = false
            }
          }
        } else {
          arr[0].selected = true
        }
      } else {
        if (arr[index].selected === true) {
          arr[0].selected = false
        } else {
          let flag = false
          for (let i = 1; i < arr.length; i++) {
            if (arr[i].selected) {
              flag = true
            }
          }
          if (!flag) {
            arr[0].selected = true
          }
        }
      }
      // if (index !== 0 && arr[index].selected === true) {
      //   arr[0].selected = false
      // }
      // if (index === 0 && arr[index].selected === true) {
      //   for (let i = 1; i < arr.length; i++) {
      //     if (i !== index) {
      //       arr[i].selected = false
      //     }
      //   }
      // }
      // todo 每一次点击都需要再一次请求
    },
  }
}
</script>

<style scoped>
  .img{
    width: 160px;
    height: 214px;
    align-items: center;
  }
  .pgc-label {
    height: 22px;
    padding: 0 10px;
    border: 1px solid #979797;
    color: #979797;
    text-align: center;
    line-height: 24px;
    border-radius: 100px;
    font-size: 12px;
    vertical-align: middle;
  }
  .title {
    font-size: 16px;
    color: #222;
    max-width: 592px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-left: 15px;
  }
  .label {
    line-height: 16px;
    color: #99a2aa;
  }
  .value {
    line-height: 16px;
    color: #222;
    /*width: 100%;*/
    /*!*float: left !important;*!*/
    /*overflow: hidden;!*和text-overflow: ellipsis;成对出现*!*/
    /*white-space: nowrap;!*不换行显示*!*/
    /*text-overflow: ellipsis;*/
    /*display:block;*/
  }
  .score {
    color: #ffa726;
    font-size: 20px;
    position: absolute;
    text-align: right;
    top: 8px;
    right: 0;
  }
  .introduction {
    margin-top: 14px;
    width: 100%;
    max-height: 70px;
    overflow: hidden;
    color: #99a2aa;
    line-height: 18px;
    display: block;
  }
  .play-btn {
    margin-top: 16px;
    float: left;
    width: 110px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    color: #00a1d6;
    border: 1px solid #00a1d6;
  }
  .play-btn .play-btn-svg {
    display: inline-block;
    width: 16px;
    height: 16px;
    fill: #00a1d6;
    top: 2px;
    position: relative;
  }
  .source {
    line-height: 16px;
    color: #81C382;
  }
</style>
