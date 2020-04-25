<template>
  <div class="home">
    <a-auto-complete
      class="global-search"
      size="large"
      style="width: 100%; margin-top: 64px"
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
      <a-input-search placeholder="搜索电影、综艺、影人" @search="onSearch" size="large">
        <a-button slot="enterButton">搜索一下</a-button>
      </a-input-search>
      <!--<a-input>-->
      <!--<a-button-->
      <!--slot="suffix"-->
      <!--style="margin-right: -12px"-->
      <!--class="search-btn"-->
      <!--size="large"-->
      <!--type="primary"-->
      <!--&gt;-->
      <!--<a-icon type="search" />-->
      <!--</a-button>-->
      <!--</a-input>-->
    </a-auto-complete>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
        dataSource: [],
      };
    },
    created () {
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
    },
  }
</script>

<style scoped>
  .home {
    width: 900px;
    margin: 0 auto;
    padding: 25px 0;
  }
  .home > .banner {
    text-align: center;
    padding: 25px 0;
    margin: 25px 0;
  }
</style>

