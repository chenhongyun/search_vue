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
            <a-select-option v-for="item in dataSource" :key="item">
              {{ item }}
            </a-select-option>
          </template>
          <a-input-search placeholder="搜索电影、演员、导演" @search="onSearch" size="large" enterButton="搜索一下"></a-input-search>
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
          <a-tabs default-active-key="1" @tabClick="changeTab">
            <a-tab-pane key="1" tab="喜剧">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="comedyMovie" :pagination="pagination" :loading="comedyMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(comedyMovie, index, '喜剧')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="2" tab="剧情" force-render>
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="plotMovie" :pagination="pagination" :loading="plotMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(plotMovie, index, '剧情')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="3" tab="犯罪">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="crimeMovie" :pagination="pagination" :loading="crimeMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(crimeMovie, index, '犯罪')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="4" tab="动作">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="actionMovie" :pagination="pagination" :loading="actionMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(actionMovie, index, '动作')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="5" tab="恐怖">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="terrorMovie" :pagination="pagination" :loading="terrorMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(terrorMovie, index, '恐怖')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="6" tab="悬疑">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="suspenseMovie" :pagination="pagination" :loading="suspenseMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(suspenseMovie, index, '悬疑')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="7" tab="爱情">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="loveMovie" :pagination="pagination" :loading="loveMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(loveMovie, index, '爱情')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="8" tab="战争">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="warMovie" :pagination="pagination" :loading="warMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(warMovie, index, '战争')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="9" tab="科幻">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="fictionMovie" :pagination="pagination" :loading="fictionMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(fictionMovie, index, '科幻')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="10" tab="动画">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="cartoonMovie" :pagination="pagination" :loading="cartoonMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(cartoonMovie, index, '动画')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
          </a-tabs>
        </a-card>
        <a-card :bordered="false" align="left">
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="大陆">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="mainlandMovie" :pagination="pagination" :loading="mainlandMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(mainlandMovie, index, '大陆')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="2" tab="香港" force-render>
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="HongKongMovie" :pagination="pagination" :loading="HongKongMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(HongKongMovie, index, '香港')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="3" tab="台湾">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="TaiwanMovie" :pagination="pagination" :loading="TaiwanMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(TaiwanMovie, index, '台湾')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="4" tab="美国">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="USMovie" :pagination="pagination" :loading="USMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(USMovie, index, '美国')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="5" tab="日本">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="JapanMovie" :pagination="pagination" :loading="JapanMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(JapanMovie, index, '日本')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="6" tab="韩国">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="KoreaMovie" :pagination="pagination" :loading="KoreaMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(KoreaMovie, index, '韩国')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="7" tab="英国">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="UKMovie" :pagination="pagination" :loading="UKMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(UKMovie, index, '英国')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane key="8" tab="泰国">
              <a-list :grid="{ gutter: 24, column: 6 }" :data-source="ThailandMovie" :pagination="pagination" :loading="ThailandMovieLoading">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-card hoverable :body-style="{padding: '0', width: '120px', height: '220px'}" align="center">
                    <a @click="goToDetails(ThailandMovie, index, '泰国')">
                      <img :src="item.image" class="img">
                      <span>{{item.title | ellip}}</span>
                      <span style="margin-left: 10px;color: #ffa726;">{{item.movie_score}}</span>
                    </a>
                  </a-card>
                </a-list-item>
              </a-list>
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
                    <span>{{item.title}}</span>
                  </template>
                  <a>
                    <img :src="item.image" class="img">
                    <span>{{item.title}}</span>
                    <span style="margin-left: 10px;color: #ffa726;">{{item.score}}</span>
                  </a>
                </a-popover>
              </a-card>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="5" align="left">
        <a-card :bordered="false" :title="'热搜排行榜 (Top'+(rankList.length===1?0:rankList.length)+')'" style="margin-top: 180px; margin-left: 30px" :headStyle="{padding: '0'}" :body-style="{padding: '0'}">
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
                  <div v-if="rankItemIndex!==index" style="margin-top:-9px; height: 35px;">
                    <a-row style="">
                      <a-col :span="2">
                        <span v-if="item.value" class="rank-text">{{index+1}}</span>
                      </a-col>
                      <a-col :span="18">
                        <span class="rank-text" style="width:80px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;word-break:keep-all;">
                          {{ item.name | ellip }}
                          <!--{{ item.name }}-->
                        </span>
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
                        <span class="rank-text" style="width:80px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;word-break:keep-all;">
                          {{ item.name }}
                        </span>
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
            <img :src="detailParams.data[detailParams.index].image">
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
          <span>{{detailParams.data[detailParams.index].title}}</span>
          <span style="margin-left: 20px">评分：</span>
          <span>{{detailParams.data[detailParams.index].movie_score}}</span>
        </a-row>
        <a-row>
          <!--<span>{{messageId}}</span>-->
          <span v-html="detailParams.data[detailParams.index].description"></span>
          <a style="margin-left: 10px" @click="onSearch(detailParams.data[detailParams.index].title)">
            <!--<img src="@/assets/imgs/u2027.png">-->
            <span>搜索电影名</span>
          </a>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";
  import store from '../store'
  import Vue from 'vue'
  import getters from '../store/getters'

  export default {
    name: 'Home',
    components: {ACol, ARow},
    filters: {
      //超过20位显示...
      ellip: function(value) {
        if (!value) return "";
        if (value.length > 16) {
          return value.slice(0, 16) + "...";
        }
        return value;
      }
    },
    data() {
      return {
        // dataSource: store.getters.tipsVisual?Vue.ls.get('SEARCH_HISTORY', []):[],  // 初始搜索提示先查看浏览器存储的数据
        dataSource: Vue.ls.get('SEARCH_HISTORY', []),
        dataSourceShow: true,
        hotMovie: [], // 热门电影
        // 类别
        comedyMovie: [],  // 喜剧
        comedyMovieLoading: true,
        plotMovie: [],  // 剧情
        plotMovieLoading: true,
        crimeMovie: [], //犯罪
        crimeMovieLoading: true,
        actionMovie: [],  // 动作
        actionMovieLoading: true,
        terrorMovie: [],  // 恐怖
        terrorMovieLoading: true,
        suspenseMovie: [],  // 悬疑
        suspenseMovieLoading: true,
        loveMovie: [],  // 爱情
        loveMovieLoading: true,
        warMovie: [],  // 战争
        warMovieLoading: true,
        fictionMovie: [],  // 科幻
        fictionMovieLoading: true,
        cartoonMovie: [],  // 动画
        cartoonMovieLoading: true,
        // 地区
        mainlandMovie: [],  // 大陆
        mainlandMovieLoading: true,
        HongKongMovie: [],  // 香港
        HongKongMovieLoading: true,
        TaiwanMovie: [],  // 台湾
        TaiwanMovieLoading: true,
        USMovie: [],  // 美国
        USMovieLoading: true,
        JapanMovie: [],  // 日本
        JapanMovieLoading: true,
        KoreaMovie: [],  // 韩国
        KoreaMovieLoading: true,
        UKMovie: [],  // 英国
        UKMovieLoading: true,
        ThailandMovie: [],  // 泰国
        ThailandMovieLoading: true,
        // mainlandMovie: [],  // 大陆
        comingMovie: [],
        // 排行相关
        topn: 10,  // 请求top n的参数
        rankList: [0],
        rankData: [],
        rankItemIndex: -1,  // 用来记录当前鼠标停在哪一个item，进而去改变相应item的style
        showMode: 0,  // 用来表示使用列表or词云展示，0表示列表，1表示词云
        busy: false, // vue-infinite-scroll需要用到
        rankLoading: false, // vue-infinite-scroll需要用到

        // todo 小bug 应该分不同的页面
        page: 1,  // 用来计算大图总的index
        pagination: {
          onChange: page => {
            console.log(page)
            this.page = page
          },
          pageSize: 12,
          // page: 2,
          // current: 1,
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
      this.bootstrap()
      this.test()
      this.getComedyMovie()  // 喜剧
      this.sleep(2000).then(() => {
        this.getPlotMovie()  // 剧情
        this.sleep(1000).then(() => {
          this.getCrimeMovie()  // 犯罪
          this.sleep(1000).then(() => {
            this.getActionMovie()  // 动作
            this.sleep(1000).then(() => {
              this.getTerrorMovie()  // 恐怖
              this.getSuspenseMovie()  // 悬疑
              this.getLoveMovie()  // 爱情
              this.getWarMovie()  // 战争
              this.getFictionMovie()  // 科幻
              this.getCartoonMovie()  // 动画
            })
          })
        })
      })
      this.getMainlandMovie()  // 大陆
      this.sleep(2000).then(() => {
        this.getHongKongdMovie()  // 香港
        this.sleep(1000).then(() => {
          this.getTaiwanMovie()  // 台湾
          this.sleep(1000).then(() => {
            this.getUSMovie()  // 美国
            this.sleep(1000).then(() => {
              this.getJapanMovie()  // 日本
              this.getKoreaMovie()  // 韩国
              this.getUKMovie()  // 英国
              this.getThailandMovie()  // 泰国
            })
          })
        })
      })
      this.comingMovie = [
        {
          'image': 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2579398648.webp',
          'title': '秘密访客',
          'time': '06月25日',
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'image': 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2522497098.webp',
          'title': '六月的秘密',
          'time': '06月21日',
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'image': 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2577837112.webp',
          'title': '奇妙国王之魔法奇缘',
          'time': '06月21日',
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'image': 'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2579189776.webp',
          'title': '亲亲哒',
          'time': '06月21日',
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        },
        {
          'image': 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2595969179.webp',
          'title': '我想静静',
          'time': '06月21日',
          'description': '楚门（金•凯瑞 Jim Carrey 饰）是一个平凡得不能再平凡的人，除了一些有些稀奇的经历之外——初恋女友突然失踪、溺水身亡的父亲忽然似乎又出现在眼前，他和绝大多数30多岁的美国男人绝无异样。这令他倍感失落。他也曾试过离开自己生活了多年的地方，但总因种种理由而不能成行。'
        }
      ]
    },
    mounted () {
      this.drawWordCloud()
    },
    activated () {
      this.rankList = [0]
      this.topn = 10
      this.dataSource = Vue.ls.get('SEARCH_HISTORY', [])
      this.loadMore()
    },
    methods: {
      bootstrap () {
        // this.dataSource = Vue.ls.get('SEARCH_HISTORY', [])
        // if (!store.getters.tipsVisual) {
        //   this.dataSourceShow = false
        // }
      },
      test(){
        console.log('测试中内容：')
        console.log(store.getters.tipsVisual)
        console.log(store.getters.pageSize)
        console.log(store.getters.predictable)
        console.log('测试查询本地搜索历史:', this.dataSource)
        // Vue.ls.set('SEARCH_HISTORY', ['少年的你', '肖申克的救赎', '操蛋操蛋'])
        // console.log(Vue.ls.get('SEARCH_HISTORY1', ['测试一下', '操蛋操蛋']))
      },
      // 按照类别获取电影
      getComedyMovie () {  // 喜剧
        this.axios.get('http://112.126.58.87:9000/search/?category=喜剧&source=0&size=50').then(res => {
          console.log('获得喜剧电影数据为：', res)
          this.comedyMovie = res.data.resultBody.movieList
          this.comedyMovieLoading = false
        })
      },
      getPlotMovie () {  // 剧情
        this.axios.get('http://112.126.58.87:9000/search/?category=剧情&source=0&size=50').then(res => {
          console.log('获得剧情电影数据为：', res)
          this.plotMovie = res.data.resultBody.movieList
          this.plotMovieLoading = false
        })
      },
      getCrimeMovie () {  // 犯罪
        this.axios.get('http://112.126.58.87:9000/search/?category=犯罪&source=0&size=50').then(res => {
          console.log('获得犯罪电影数据为：', res)
          this.crimeMovie = res.data.resultBody.movieList
          this.crimeMovieLoading = false
        })
      },
      getActionMovie () {  // 动作
        this.axios.get('http://112.126.58.87:9000/search/?category=动作&source=0&size=50').then(res => {
          console.log('获得动作电影数据为：', res)
          this.actionMovie = res.data.resultBody.movieList
          this.actionMovieLoading = false
        })
      },
      getTerrorMovie () {  // 恐怖
        this.axios.get('http://112.126.58.87:9000/search/?category=恐怖&source=0&size=50').then(res => {
          console.log('获得恐怖电影数据为：', res)
          this.terrorMovie = res.data.resultBody.movieList
          this.terrorMovieLoading = false
        })
      },
      getSuspenseMovie () {  // 悬疑
        this.axios.get('http://112.126.58.87:9000/search/?category=悬疑&source=0&size=50').then(res => {
          console.log('获得悬疑电影数据为：', res)
          this.suspenseMovie = res.data.resultBody.movieList
          this.suspenseMovieLoading = false
        })
      },
      getLoveMovie () {  // 爱情
        this.axios.get('http://112.126.58.87:9000/search/?category=爱情&source=0&size=50').then(res => {
          console.log('获得爱情电影数据为：', res)
          this.loveMovie = res.data.resultBody.movieList
          this.loveMovieLoading = false
        })
      },
      getWarMovie () {  // 战争
        this.axios.get('http://112.126.58.87:9000/search/?category=战争&source=0&size=50').then(res => {
          console.log('获得战争电影数据为：', res)
          this.warMovie = res.data.resultBody.movieList
          this.warMovieLoading = false
        })
      },
      getFictionMovie () {  // 科幻
        this.axios.get('http://112.126.58.87:9000/search/?category=科幻&source=0&size=50').then(res => {
          console.log('获得科幻电影数据为：', res)
          this.fictionMovie = res.data.resultBody.movieList
          this.fictionMovieLoading = false
        })
      },
      getCartoonMovie () {  // 动画
        this.axios.get('http://112.126.58.87:9000/search/?category=动画&source=0&size=50').then(res => {
          console.log('获得剧情动画数据为：', res)
          this.cartoonMovie = res.data.resultBody.movieList
          this.cartoonMovieLoading = false
        })
      },
      // 按照地区获取电影
      getMainlandMovie () {  // 大陆
        this.axios.get('http://112.126.58.87:9000/search/?area=大陆&source=0&size=50').then(res => {
          console.log('获得大陆电影数据为：', res)
          this.mainlandMovie = res.data.resultBody.movieList
          this.mainlandMovieLoading = false
        })
      },
      getHongKongdMovie () {  // 香港
        this.axios.get('http://112.126.58.87:9000/search/?area=香港&source=0&size=50').then(res => {
          console.log('获得香港电影数据为：', res)
          this.HongKongMovie = res.data.resultBody.movieList
          this.HongKongMovieLoading = false
        })
      },
      getTaiwanMovie () {  // 台湾
        this.axios.get('http://112.126.58.87:9000/search/?area=台湾&source=0&size=50').then(res => {
          console.log('获得台湾电影数据为：', res)
          this.TaiwanMovie = res.data.resultBody.movieList
          this.TaiwanMovieLoading = false
        })
      },
      getUSMovie () {  // 美国
        this.axios.get('http://112.126.58.87:9000/search/?area=美国&source=0&size=50').then(res => {
          console.log('获得美国电影数据为：', res)
          this.USMovie = res.data.resultBody.movieList
          this.USMovieLoading = false
        })
      },
      getJapanMovie () {  // 日本
        this.axios.get('http://112.126.58.87:9000/search/?area=日本&source=0&size=50').then(res => {
          console.log('获得日本电影数据为：', res)
          this.JapanMovie = res.data.resultBody.movieList
          this.JapanMovieLoading = false
        })
      },
      getKoreaMovie () {  // 韩国
        this.axios.get('http://112.126.58.87:9000/search/?area=韩国&source=0&size=50').then(res => {
          console.log('获得韩国电影数据为：', res)
          this.KoreaMovie = res.data.resultBody.movieList
          this.KoreaMovieLoading = false
        })
      },
      getUKMovie () {  // 英国
        this.axios.get('http://112.126.58.87:9000/search/?area=英国&source=0&size=50').then(res => {
          console.log('获得英国电影数据为：', res)
          this.UKMovie = res.data.resultBody.movieList
          this.UKMovieLoading = false
        })
      },
      getThailandMovie () {  // 泰国
        this.axios.get('http://112.126.58.87:9000/search/?area=泰国&source=0&size=50').then(res => {
          console.log('获得泰国电影数据为：', res)
          this.ThailandMovie = res.data.resultBody.movieList
          this.ThailandMovieLoading = false
        })
      },
      // 停顿多少毫秒后执行下面的函数
      sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      },
      // 搜索框提示及搜索
      handleSearch(value) {
        // console.log('是否提示：', store.getters.tipsVisual)
        if (value!== ''&&value.trim()!=='') { // 如果输入value不为空且不为空格字符串，则请求
          this.axios.get('http://112.126.58.87:9000/suggest?q='+value.trim()).then(res => {
            console.log('得到搜索建议结果', res.data)
            this.dataSource = res.data
          })
        } else {
          // 如果输入为空或空格字符串，则获取存储到浏览器上的搜索历史
          this.dataSource = Vue.ls.get('SEARCH_HISTORY', [])
          console.log('从本地读取搜索历史作为搜索提示：', Vue.ls.get('SEARCH_HISTORY', []))
        }
      },
      onSelect(value) {
        this.onSearch(value)
      },
      onSearch (value) {
        console.log("搜索内容：", value.trim())
        if (value !== ''&&value.trim()!==''){ // 如果不为空且不为空格字符串时才进行搜索
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
          this.$router.push({ path: '/r', query: { search_text: value, source:0 } })
        }
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
      changeTab (key) {
        console.log('分页参数：', this.pagination.current)
        // this.pagination.current = 1
        // this.page = 1
      },
      // 排行榜相关
      getRankList (n) {
        if (n > 50) return
        this.rankLoading = true
        this.axios.get('http://112.126.58.87:9000/top_n?q='+n).then(res => {
          this.rankList = []
          for (let i = 0; i < res.data.length; i++) {
            this.rankList.push({
              name: res.data[i].name,
              value: parseInt(res.data[i].value)
            })
          }
          this.rankLoading = false
        })
      },
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
        if (this.rankList.length >= 50) {
          // 当加载结束的时候提示已经加载完毕
          this.$message.warning('最多加载50条热门搜索')
          this.busy = true
          this.rankLoading = false
          return
        }
        // todo 获取更多10条热搜
        this.topn = this.topn + 10
        if (this.topn > 50) this.topn = 50
        this.getRankList(this.topn)
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

