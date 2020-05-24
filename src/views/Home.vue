<template>
  <div class="home">

    <a-row>
      <a-col :span="12" :offset="1">
        <a-auto-complete
          class="global-search"
          size="large"
          style="width: 90%; margin-top: 64px"
          @select="onSelect"
          @search="handleSearch"
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
          <a-input-search placeholder="搜索电影、综艺、影人" @search="onSearch" size="large" enterButton="搜索一下"></a-input-search>
        </a-auto-complete>
        <a-card :bordered="false" align="left" title="本站推荐" :body-style="{padding: '10px'}" style="margin-top: 20px">
          <a-carousel arrows autoplay>
            <div
              slot="prevArrow"
              slot-scope="props"
              class="custom-slick-arrow"
              style="left: 10px;zIndex: 1"
            >
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle" />
            </div>
            <div><h3>haodene </h3></div>
            <div><h3>haodene </h3></div>
            <div>
              <img src="https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2540924496.jpg" style="width: 400px; height: 200px"/>
            </div>
            <div>
              <img src="https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2455050536.jpg" style="width: 400px; height: 200px"/>
            </div>
            <div>
              <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2586366121.jpg" style="width: 400px; height: 200px"/>
            </div>
            <div>
              <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2574861328.jpg" style="width: 400px; height: 200px"/>
            </div>
            <div>
              <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2603749783.jpg" style="width: 400px; height: 200px"/>
            </div>
            <div>
              <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2586800409.jpg" style="width: 400px; height: 200px"/>
            </div>
            <div align="left" style="background-color: #FFFF">
              <a-row>
                <a-col :span="12">
                  <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2593664928.jpg" style="width: 400px; height: 200px"/>
                </a-col>
                <a-col :span="12">
                  <span>阿萨德飞机嘎哈我饿UI发送的讲课费</span>
                </a-col>
              </a-row>
            </div>
            <div>
              <img src="https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2593312729.jpg" style="width: 400px; height: 180px"/>
            </div>
          </a-carousel>
        </a-card>
        <a-card :bordered="false" align="left">
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="最近热门电影">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="hotMovie" :pagination="pagination">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <!--<a-card hoverable style="width: 120px; height: 160px" >-->
                    <!--<img-->
                      <!--slot="cover"-->
                      <!--:src="item.imagePath"-->
                      <!--class="img"-->
                    <!--/>-->
                    <!--<a-card-meta :title="item.name" style="height: 40px;">-->
                      <!--&lt;!&ndash;<template slot="description">&ndash;&gt;-->
                        <!--&lt;!&ndash;<span style="margin-left: 10px;color: #ffa726;">{{item.score}}</span>&ndash;&gt;-->
                      <!--&lt;!&ndash;</template>&ndash;&gt;-->
                    <!--</a-card-meta>-->
                  <!--</a-card>-->
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '200px'}" align="center">
                    <a @click="goToDetails(hotMovie, index, '最近热门电影')">
                      <img :src="item.imagePath" class="img">
                      <span>{{item.name}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="2" tab="最新" force-render>
              Content of Tab Pane 2
            </a-tab-pane>
            <a-tab-pane key="3" tab="豆瓣高分">
              Content of Tab Pane 3
            </a-tab-pane>
            <a-tab-pane key="4" tab="冷门佳片">
              Content of Tab Pane 4
            </a-tab-pane>
            <a-tab-pane key="5" tab="华语">
              Content of Tab Pane 5
            </a-tab-pane>
            <a-tab-pane key="6" tab="欧美">
              Content of Tab Pane 6
            </a-tab-pane>
            <a-tab-pane key="7" tab="韩国">
              Content of Tab Pane 7
            </a-tab-pane>
            <a-tab-pane key="8" tab="日本">
              Content of Tab Pane 8
            </a-tab-pane>
          </a-tabs>
        </a-card>
        <a-card :bordered="false" align="left" title="即将上映">
          <a-list :grid="{ gutter: 24, column: 6 }" :data-source="comingMovie" :pagination="pagination">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-card :bordered="false" :body-style="{padding: '0', width: '120px', height: '200px'}" align="center">
                <a-popover placement="rightTop">
                  <template slot="content">
                    <p>Content</p>
                    <p>Content</p>
                  </template>
                  <template slot="title">
                    <span>{{item.name}}</span>
                  </template>
                  <a @click="goToDetails(hotMovie, index, '最近热门电影')">
                    <img :src="item.imagePath" class="img">
                    <span>{{item.name}}</span>
                    <span style="margin-left: 10px;color: #ffa726;">{{item.score}}</span>
                  </a>
                </a-popover>
              </a-card>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="5" align="left">
        <a-card :bordered="false" :title="'热搜排行榜 (Top'+rankList.length+')'" style="margin-top: 180px; margin-left: 30px" :headStyle="{padding: '0'}" :body-style="{padding: '0'}">
          <a-popover slot="extra" placement="top">
            <template slot="content">
              <span>列表展示</span>
            </template>
            <a @click="changeShowMode(0)">
              <a-icon type="ordered-list" style="margin-right: 10px"/>
            </a>
          </a-popover>
          <a-popover slot="extra" placement="top">
            <template slot="content">
              <span>词云展示</span>
            </template>
            <a @click="changeShowMode(1)">
              <a-icon type="cloud" />
            </a>
          </a-popover>
          <div
            v-show="showMode===0"
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="busy"
            class="demo-infinite-container"
            :infinite-scroll-distance="10"
          >
            <a-list item-layout="vertical" size="small" :data-source="rankList" style="margin-top: 10px">
              <a-list-item slot="renderItem" slot-scope="item, index" style="height: 35px" @mouseenter="mouseEnter(index)">
                <a @click="onSearch(item.name)">
                  <div v-if="rankItemIndex!==index" style="margin-top:-9px; height: 35px">
                    <a-row>
                      <a-col :span="2">
                        <span class="rank-text">{{index+1}}</span>
                      </a-col>
                      <a-col :span="18">
                        <span class="rank-text">{{ item.name }}</span>
                      </a-col>
                      <a-col :span="3" align="right">
                        <span class="rank-text">{{ item.value }}</span>
                      </a-col>
                    </a-row>
                  </div>
                  <div v-if="rankItemIndex===index" style="margin-top:-9px; height: 35px; background-color: #40A9FF">
                    <a-row >
                      <a-col :span="2">
                        <span class="rank-text">{{index+1}}</span>
                      </a-col>
                      <a-col :span="18">
                        <span class="rank-text">{{ item.name }}</span>
                      </a-col>
                      <a-col :span="3" align="right">
                        <span class="rank-text">{{ item.value }}</span>
                      </a-col>
                    </a-row>
                  </div>
                </a>
              </a-list-item>
              <div v-if="rankLoading && !busy" class="demo-loading-container">
                <a-spin />
              </div>
            </a-list>
          </div>
          <div v-show="showMode===1" id="wordCloud" style="width: 350px; height: 1000px"></div>
        </a-card>
      </a-col>
    </a-row>

    <a-modal
      :title="detailParams.title"
      style="top:20px;"
      :width="800"
      :visible="detailParams.visual"
      @ok="onClose"
      @cancel="onClose"
    >
      <div v-if="detailParams.data[detailParams.index]">
        <a-row>
          <a-col :span="1">
            <a @click="toLeft">
              <img v-if="detailParams.index!==0" style="margin-top: 50px" src="@/assets/imgs/u203.png">
            </a>
          </a-col>
          <a-col :span="22" align="center">
            <img :src="detailParams.data[detailParams.index].imagePath">
          </a-col>
          <a-col :span="1">
            <a @click="toRight">
              <img v-if="detailParams.index!==detailParams.data.length-1" style="margin-top: 50px" src="@/assets/imgs/u204.png">
            </a>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <a-row>
          <span>名称：</span>
          <span>{{detailParams.data[detailParams.index].name}}</span>
          <span style="margin-left: 20px">评分：</span>
          <span>{{detailParams.data[detailParams.index].score}}</span>
        </a-row>
        <a-row>
          <!--<span>{{messageId}}</span>-->
          <span v-html="detailParams.data[detailParams.index].description"></span>
          <a style="margin-left: 10px">
            <!--<img src="@/assets/imgs/u2027.png">-->
            <span>查看消息详情</span>
          </a>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>

  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";
  export default {
    name: 'Home',
    components: {ACol, ARow},
    data() {
      return {
        dataSource: [],
        hotMovie: [],
        comingMovie: [],
        // 排行相关
        rankList: [],
        rankData: [],
        rankItemIndex: -1,  // 用来记录当前鼠标停在哪一个item，进而去改变相应item的style
        showMode: 0,  // 用来表示使用列表or词云展示，0表示列表，1表示词云
        busy: false, // vue-infinite-scroll需要用到
        rankLoading: false, // vue-infinite-scroll需要用到

        page: 1,  // 用来计算大图总的index
        pagination: {
          onChange: page => {
            console.log(page)
            this.page = page
          },
          pageSize: 12,
          size: 'small',
          align: 'center'
        },
        detailParams: {
          title: '',
          visual: false,
          data: [],
          index: 0
        }
      };
    },
    created () {
      this.hotMovie = [
        {
          'imagePath': 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2574861328.jpg',
          'name': '大话西游之大圣娶亲',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2591946932.jpg',
          'name': '你的名字',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2594916975.jpg',
          'name': '你的名字',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2593425210.jpg',
          'name': '你的名字',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2576090251.jpg',
          'name': '你的名字',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2527484082.jpg',
          'name': '你的名字',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2555927320.jpg',
          'name': '你的名字',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2579407695.jpg',
          'name': '你的名字',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2586366121.jpg',
          'name': '你的名字',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2576090251.jpg',
          'name': '你的名字',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2570059839.jpg',
          'name': '你的名字',
          'score': 8.3,
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        }
      ]
      for (let i = 0; this.hotMovie.length < 50; i++) {
        this.hotMovie.push(this.hotMovie[this.getRandomInt(11)])
      }
      this.comingMovie = [
        {
          'imagePath': 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2579398648.webp',
          'name': '秘密访客',
          'time': '06月25日',
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2522497098.webp',
          'name': '六月的秘密',
          'time': '06月21日',
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2577837112.webp',
          'name': '奇妙国王之魔法奇缘',
          'time': '06月21日',
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2579189776.webp',
          'name': '亲亲哒',
          'time': '06月21日',
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'imagePath': 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2595969179.webp',
          'name': '我想静静',
          'time': '06月21日',
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        }
      ]
      this.rankList = [
        {
          name: '两会讲话',
          value: 100
        },
        {
          name: '习近平',
          value: 90
        },
        {
          name: '肺炎',
          value: 87
        },
        {
          name: '少年的你',
          value: 68
        },
        {
          name: '肖申克的救赎',
          value: 49
        },
        {
          name: '幸福人生',
          value: 35
        },
        {
          name: '辛德勒的名单',
          value: 28
        },
        {
          name: '蝙蝠侠',
          value: 23
        },
        {
          name: '钢铁侠',
          value: 17
        },
        {
          name: '我不是药神',
          value: 9
        }
      ]
    },
    mounted () {
      this.drawWordCloud()
    },
    methods: {
      onSelect(value) {
        console.log('onSelect', value);
        this.onSearch(value)
      },
      handleSearch(value) {
        this.dataSource = value ? this.searchResult(value) : [];
      },
      onSearch (value) {
        console.log("搜索内容：", value)
        if (value !== ''){
          this.$router.push({ path: '/r', query: { search_text: value, source:0 } })
        }
      },
      getRandomInt(max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      searchResult(query) {
        return new Array(this.getRandomInt(10))
          .join('.')
          .split('.')
          .map((item, idx) => ({
            query,
            category: `${query}${idx}`,
            count: this.getRandomInt(200, 100),
          }));
      },
      // 大图相关
      goToDetails(data, index, title) {
        this.detailParams = {
          title: title,
          visual: true,
          data: data,
          index: index+12*(this.page-1)
        }
      },
      onClose () {
        this.detailParams.visual = false
        // this.detailParams = {
        //   title: '',
        //   visual: false,
        //   data: [],
        //   index: 0
        // }
      },
      toLeft () {
        this.detailParams.index -= 1
      },
      toRight () {
        this.detailParams.index += 1
      },
      // 排行榜相关
      mouseEnter (index) {
        this.rankItemIndex = index
      },
      changeShowMode (state) {
        this.showMode = state
        if (this.showMode===1) {
          this.drawWordCloud()
        }
      },
      rankSearch(key) {

      },
      loadMore () {
        console.log('加载更多')
        this.rankLoading = true
        if (this.rankList.length >= 50) {
          // 当加载结束的时候提示已经加载完毕
          this.$message.warning('最多加载50条热门搜索')
          this.busy = true
          this.rankLoading = false
          return
        }
        // todo 获取更多10条热搜
        for (let i = 0; i < 10; i++) {
          this.rankList.push(
            {
              name: '新增热搜'+this.getRandomInt(100000),
              value: this.getRandomInt(100)
            }
          )
        }
        this.imageLoading = false
      },
      drawWordCloud () {
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById('wordCloud'))
        // 绘制图表
        const option = {
          backgroundColor: '#F7F7F7',
          tooltip: {
            show: true
          },
          series: [{
            // name: res.data.resultBody.groupName,
            type: 'wordCloud',
            // sizeRange: [6, 66],
            size: ['100%', '100%'],
            textRotation: [0, 45, 90, -45],
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 14
            },
            textStyle: {
              normal: {
                color: function () {
                  return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(',') + ')'
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: this.rankList
          }]
        }

        // 为echarts对象加载数据
        myChart.setOption(option)

        //  增加监听事件
        let that = this
        function eConsole (param) {
          console.log(param.data.name)
          that.onSearch(param.data.name)
        }
        myChart.on('click', eConsole)
      },
    },
  }
</script>

<style scoped>
  .home {
    width: 1800px;
    margin: 0 auto;
    padding: 25px 0;
  }
  .home > .banner {
    text-align: center;
    padding: 25px 0;
    margin: 25px 0;
  }
  .img {
    width: 100%;
    height: 160px;
    align-items: center;
  }
  .ant-carousel >>> .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }
  .ant-carousel >>> .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }
  .ant-carousel >>> .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel >>> .custom-slick-arrow:hover {
    opacity: 0.5;
  }

  .ant-carousel >>> .slick-slide h3 {
    color: #fff;
  }
  /*排行相关*/
  .rank-text {
    line-height: 35px;
    color: black;
  }
  .demo-infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    height: 500px;
  }
  .demo-loading-container {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
</style>

