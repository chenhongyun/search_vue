<template>
  <div class="page-header-index-wide" align="center">
    <a-card :body-style="{width: '1200px'}" style="margin-top: 25px" :bordered="false">
      <a-row>
        <a-auto-complete
          class="global-search"
          style="width: 700px"
          @select="onSelect"
          @search="handleSearch"
          optionLabelProp="text"
        >
          <template slot="dataSource">
            <a-select-option v-for="item in dataSource" :key="item">
              {{ item }}
            </a-select-option>
          </template>
          <a-input-search :placeholder="params.q" @search="onSearch" enterButton="搜索">
          </a-input-search>
        </a-auto-complete>
      </a-row>
      <a-divider></a-divider>
      <a-row>
        <a-col :span="2" align="center">
          <span>类型</span>
        </a-col>
        <a-col :span="20" :offset="1" align="left">
          <a-checkable-tag v-for="(item, index) in tags_type" :checked='item.selected' @change="handleChange_type(tags_type, index)" style="margin-right: 25px">
            {{item.tag}}
          </a-checkable-tag>
        </a-col>
      </a-row>
      <a-row style="margin-top: 10px">
        <a-col :span="2" align="center">
          <span>地区</span>
        </a-col>
        <a-col :span="20" :offset="1" align="left">
          <a-checkable-tag v-for="(item, index) in tags_area" :checked='item.selected' @change="handleChange_area(tags_area, index)" style="margin-right: 25px">
            {{item.tag}}
          </a-checkable-tag>
        </a-col>
      </a-row>
      <!--<a-row style="margin-top: 10px">-->
        <!--<a-col :span="2" align="center">-->
          <!--<span>年代</span>-->
        <!--</a-col>-->
        <!--<a-col :span="20" :offset="1" align="left">-->
          <!--<a-checkable-tag v-for="(item, index) in tags_year" :checked='item.selected' @change="handleChange_decade(tags_year, index)" >-->
            <!--{{item.tag}}-->
          <!--</a-checkable-tag>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <a-row style="margin-top: 10px">
        <a-col :span="2" align="center">
          <span>年代</span>
        </a-col>
        <a-col :span="20" :offset="1" align="left">
          <a-checkable-tag v-for="(item, index) in tags_decade" :checked='item.selected' @change="handleChange_decade(tags_decade, index)" style="margin-right: 25px">
            {{item.tag}}
          </a-checkable-tag>
        </a-col>
      </a-row>
      <a-row style="margin-top: 10px">
        <a-col :span="2" align="center">
          <span>来源</span>
        </a-col>
        <a-col :span="20" :offset="1" align="left">
          <a-checkable-tag v-for="(item, index) in tags_source" :checked='item.selected' @change="handleChange_source(tags_source, index)" style="margin-right: 25px">
            {{item.tag}}
          </a-checkable-tag>
        </a-col>
      </a-row>
      <a-row style="margin-top: 10px">
        <a-col :span="2" align="center">
          <span>排序方式</span>
        </a-col>
        <a-col :span="20" :offset="1" align="left">
          <a-checkable-tag v-for="(item, index) in tags_sort" :checked='item.selected' @change="handleChange_sort(tags_sort, index)" style="margin-right: 25px">
            {{item.tag}}
          </a-checkable-tag>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <a-list
        itemLayout="vertical"
        size="large"
        :pagination="false"
        :dataSource="listData"
        :loading="loading"
      >
        <!--<div slot="footer"><b>ant design vue</b> footer part</div>-->
        <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
          <a-row>
            <a-col :span="4">
              <img :src="item.image" class="img">
              <!--<a-avatar class="img" :src="item._source.image" shape="square"/>-->
            </a-col>
            <a-col :span="20">
              <a-row>
                <a-col :span="20" align="left">
                  <span class="pgc-label">电影</span>
                  <span class="title" v-html="item.title"></span>
                </a-col>
                <a-col :span="4" align="right">
                  <span class="score">{{item.movie_score}}分</span>
                </a-col>
              </a-row>
              <a-row style="margin-top: 15px">
                <a-col :span="8" align="left">
                <span class="label">风格：</span>
                <span class="value">{{item.categories}}</span>
              </a-col>
                <a-col :span="8" align="left">
                  <span class="label">地区：</span>
                  <span class="value">{{item.area}}</span>
                </a-col>
                <a-col :span="8" align="right">
                  <span class="value">{{item.commentCount}}人点评</span>
                </a-col>
              </a-row>
              <a-row style="margin-top: 5px">
                <a-col :span="8" align="left">
                  <span class="label">上映时间：</span>
                  <span class="value">{{item.pub}}</span>
                </a-col>
                <a-col :span="16" align="left">
                  <span class="label">出演：</span>
                  <span class="value" v-html="item.performer"></span>
                </a-col>
              </a-row>
              <a-row>
                <a-col align="left">
                  <div>
                    <span class="introduction" v-html="'简介：'+item.description"></span>
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col align="left">
                  <a @click="jump(item.url)">
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
                  <a @click="jump(item.url)">
                    <span class="source">{{item.resource}}</span>
                  </a>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-list-item>
      </a-list>
      <a-pagination
        class="ant-table-pagination"
        :pageSizeOptions="pageSizeOptions"
        :total="total"
        :show-total="total => `共 ${total} 条数据`"
        :page="params.p1"
        showSizeChanger
        :pageSize="params.p2"
        @change="pageChange"
        @showSizeChange="pageChange"
      >
        <template slot='buildOptionText' slot-scope='props'>
          <span v-if="props.value!==total">{{props.value}}条/页</span>
          <span v-if="props.value===total">全部({{total}}条数据)</span>
        </template>
      </a-pagination>
    </a-card>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import store from '../store'
import Vue from 'vue'
import { getAll } from "../api/search";

export default {
  name: "Result",
  components: {ACol, ARow},
  data () {
    return {
      searchText: this.$route.query.search_text,
      dataSource: Vue.ls.get('SEARCH_HISTORY', []),
      loading: true,
      // 标签
      tags_type: [],
      tags_area: [],
      tags_decade: [],
      tags_year: [],
      tags_source: [],
      tags_sort: [],
      listData: [],  // 数据列表
      total: 0, // 查询到的电影数量
      params: {  // 查询参数
        q: this.$route.query.search_text,
        source: 0,  // 0为全部，q为豆瓣，2为电影天堂
        category: '', // 类别：剧情、爱情等，为空则不过滤
        area: '', // 地区：欧美、日本等，为空则不过滤
        period: '' , // 1980,1990,2000,2010,2020...为空则不进行过滤
        sort: '', // 排序方式：score(电影评分)、commentCount(点评数)、year(年份)、time(时长)，为空则不排序
        p1: 1, // 页号
        p2: 10, // 页面大小
      },
      // 分页相关
      pageSizeOptions: ['1', '5', '10', '20']
    }
  },
  created () {

  },
  activated () {
    console.log('此组件被激活')
    this.params = {  // 查询参数
      q: this.$route.query.search_text,
      source: 0,  // 0为全部，q为豆瓣，2为电影天堂
      category: '', // 类别：剧情、爱情等，为空则不过滤
      area: '', // 地区：欧美、日本等，为空则不过滤
      period: '' , // 1980,1990,2000,2010,2020...为空则不进行过滤
      sort: '', // 排序方式：score(电影评分)、commentCount(点评数)、year(年份)、time(时长)，为空则不排序
      p1: 1, // 页号
      p2: 10, // 页面大小
    }
    this.dataSource = Vue.ls.get('SEARCH_HISTORY', [])
    this.searchText = this.$route.query.search_text
    console.log('参数为', this.params.q)
    this.getTags()
    this.getList()
  },
  methods: {
    getTags () {
      this.tags_type = [
        {
          tag: '全部',
          selected: true
        },
        {
          tag: '喜剧',
          selected: false
        },
        {
          tag: '剧情',
          selected: false
        },
        {
          tag: '犯罪',
          selected: false
        },
        {
          tag: '动作',
          selected: false
        },
        {
          tag: '恐怖',
          selected: false
        },
        {
          tag: '悬疑',
          selected: false
        },
        {
          tag: '爱情',
          selected: false
        },
        {
          tag: '战争',
          selected: false
        },
        {
          tag: '科幻',
          selected: false
        },
        {
          tag: '动画',
          selected: false
        },
        {
          tag: '古装',
          selected: false
        },
        {
          tag: '传记',
          selected: false
        },
        {
          tag: '家庭',
          selected: false
        }
      ]
      this.tags_area = [
        {
          tag: '全部',
          selected: true
        },
        {
          tag: '大陆',
          selected: false
        },
        {
          tag: '香港',
          selected: false
        },
        {
          tag: '台湾',
          selected: false
        },
        {
          tag: '美国',
          selected: false
        },
        {
          tag: '日本',
          selected: false
        },
        {
          tag: '韩国',
          selected: false
        },
        {
          tag: '英国',
          selected: false
        },
        {
          tag: '泰国',
          selected: false
        }
      ]
      this.tags_decade = [
        {
          tag: '全部',
          selected: true
        },
        {
          tag: '20年代',
          selected: false
        },
        {
          tag: '10年代',
          selected: false
        },
        {
          tag: '00年代',
          selected: false
        },
        {
          tag: '90年代',
          selected: false
        },
        {
          tag: '80年代',
          selected: false
        },
        {
          tag: '70年代',
          selected: false
        },
        {
          tag: '60年代',
          selected: false
        }
      ]
      this.tags_year = [
        {
          tag: '全部',
          selected: true
        },
        {
          tag: '2020',
          selected: false
        },
        {
          tag: '2019',
          selected: false
        },
        {
          tag: '2018',
          selected: false
        },
        {
          tag: '2017',
          selected: false
        },
        {
          tag: '2016',
          selected: false
        },
        {
          tag: '2015',
          selected: false
        },
        {
          tag: '2014',
          selected: false
        },
        {
          tag: '2013',
          selected: false
        },
        {
          tag: '2012',
          selected: false
        },
        {
          tag: '2011',
          selected: false
        },
        {
          tag: '2010',
          selected: false
        },
        {
          tag: '2009',
          selected: false
        },
        {
          tag: '2008',
          selected: false
        },
        {
          tag: '2007',
          selected: false
        },
        {
          tag: '2006',
          selected: false
        },
        {
          tag: '2005',
          selected: false
        },
        {
          tag: '更早',
          selected: false
        },
      ]
      this.tags_source = [
        {
          tag: '全部',
          selected: true
        },
        {
          tag: '豆瓣',
          selected: false
        },
        {
          tag: '电影天堂',
          selected: false
        }
      ]
      this.tags_sort = [
        {
          tag: '默认排序',
          selected: true
        },
        {
          tag: '按评分排序',
          selected: false
        },
        {
          tag: '按点评数排序',
          selected: false
        },
        {
          tag: '按年份排序',
          selected: false
        }
      ]
    },
    getList () {
      this.loading = true
      this.axios.get('http://112.126.58.87:9000/search', {
        params: this.params
      }).then(res => {
        console.log('得到搜索结果', res)
        this.loading = false
        console.log(res.data.resultBody.movieList)
        this.listData = res.data.resultBody.movieList
        this.total = res.data.resultBody.total
      })
    },
    handleChange_type (arr, index) {
      // console.log(checked)
      if (!arr[index].selected) {
        arr[index].selected = !arr[index].selected
        for (let i = 0; i < arr.length; i++) {
          if (i !== index) {
            arr[i].selected = false
          }
        }
        if (index===0) {
          this.params.category = ''
        } else {
          this.params.category = arr[index].tag
        }
        this.getList()
      }
    },
    handleChange_area (arr, index) {
      // console.log(checked)
      if (!arr[index].selected) {
        arr[index].selected = !arr[index].selected
        for (let i = 0; i < arr.length; i++) {
          if (i !== index) {
            arr[i].selected = false
          }
        }
        if (index===0) {
          this.params.area = ''
        } else {
          this.params.area = arr[index].tag
        }
        this.getList()
      }
    },
    handleChange_decade (arr, index) {
      // console.log(checked)
      if (!arr[index].selected) {
        arr[index].selected = !arr[index].selected
        for (let i = 0; i < arr.length; i++) {
          if (i !== index) {
            arr[i].selected = false
          }
        }
        if (index===0) {
          this.params.period = ''
        }
        if (index===1) {
          this.params.period = 2020
        }
        if (index===2) {
          this.params.period = 2010
        }
        if (index===3) {
          this.params.period = 2000
        }
        if (index===4) {
          this.params.period = 1990
        }
        if (index===5) {
          this.params.period = 1980
        }
        if (index===6) {
          this.params.period = 1970
        }
        if (index===7) {
          this.params.period = 1960
        }
        this.getList()
      }
    },
    handleChange_source (arr, index) {
      // console.log(checked)
      if (!arr[index].selected) {
        arr[index].selected = !arr[index].selected
        for (let i = 0; i < arr.length; i++) {
          if (i !== index) {
            arr[i].selected = false
          }
        }
        this.params.source = index
        this.getList()
      }
    },
    handleChange_sort (arr, index) {
      // console.log(checked)
      if (!arr[index].selected) {
        arr[index].selected = !arr[index].selected
        for (let i = 0; i < arr.length; i++) {
          if (i !== index) {
            arr[i].selected = false
          }
        }
        // todo 每一次点击都需要再一次请求
        if (index===0) {
          this.params.sort = ''
        }
        if (index===1) {
          this.params.sort = 'score'
        }
        if (index===2) {
          this.params.sort = 'commentCount'
        }
        if (index===3) {
          this.params.sort = 'year'
        }
        this.getList()
      }
    },
    pageChange (current, pageSize) { // 分页参数改变的监听函数
      this.params.p1 = current
      this.params.p2 = pageSize
      this.getList()
    },
    handleSearch (value) {
      if (value !== ''&&value.trim()!=='') {
        this.axios.get('http://112.126.58.87:9000/suggest?q='+value).then(res => {
          console.log('得到搜索建议结果', res.data)
          this.dataSource = res.data
        })
      } else {
        // 如果输入为空或输入为空格字符串，则从浏览器存储的数据获取搜索提示
        this.dataSource = Vue.ls.get('SEARCH_HISTORY', [])
        console.log('从本地读取搜索历史作为搜索提示：', Vue.ls.get('SEARCH_HISTORY', []))
      }
    },
    onSelect (value) {
      this.onSearch(value)
    },
    onSearch (value) {
      console.log("搜索内容：", value.trim())
      this.getTags()  // 标签重置
      if (value !== ''&&value.trim()!==''){
        let history = Vue.ls.get('SEARCH_HISTORY', [])
        for (let i = 0; i < history.length; i++) {
          if (value === history[i]) {
            history.splice(i, 1)
            break
          }
        }
        history.unshift(value)
        while (history.length > 10) {
          history.pop()
        }
        Vue.ls.set('SEARCH_HISTORY', history)
        this.params = {  // 查询q为输入值，其他参数重置
          q: value.trim(),
          source: 0,
          category: '',
          area: '',
          period: '',
          sort: '',
          p1: 1,
          p2: 10,
        }
        this.getList()
      }
    },
    jump (url) {
      // url = 'http://' + url
      window.open(url)
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
  .keyword{
    color: red
  }
</style>
