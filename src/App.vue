<template>
  <div id="app">
    <a-row style="margin-right: 60px">
      <a-col align="right">
        <router-link to="/" >首页</router-link>
        <a @click="showDrawer" style="margin-left: 10px">设置</a>
      </a-col>
    </a-row>
    <a-drawer
      placement="top"
      :closable="false"
      @close="onClose"
      :visible="visible"
      height="px"
    >
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="搜索设置" key="1">
          <a-form class="ant-advanced-search-form" :form="form1" @submit="handleSubmit">
            <a-form-item label="搜索框提示："
                         v-bind="formItemLayout"
                         help="是否希望在搜索时显示搜索框提示">
              <a-radio-group
                v-decorator="[
                    'tipvisual',
                    {
                      initialValue: 'true',
                      rules: [
                        {
                          required: true,
                          message: '请选择是否显示搜索框提示!',
                        },
                      ],
                    },
                  ]">
                <a-radio value="true">
                  显示
                </a-radio>
                <a-radio value="false">
                  不显示
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="搜索结果显示条数"
                         v-bind="formItemLayout"
                         has-feedback
                         help="设定您希望搜索结果显示的条数">
              <a-select
                v-decorator="[
                    'pagesize',
                    {
                      initialValue: '20',
                      rules: [{ required: true, message: '请选择搜索结果显示条数!' }]
                    },
                  ]"
                placeholder="每页显示10条"
                style="width: 180px"
              >
                <a-select-option value="10">每页显示10条</a-select-option>
                <a-select-option value="20">每页显示20条</a-select-option>
                <a-select-option value="50">每页显示50条</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="实时预测功能"
                         v-bind="formItemLayout"
                         has-feedback
                         help="是否希望在您输入时实时展现搜索结果">
              <a-select
                v-decorator="[
                    'predictable',
                    {
                      initialValue: '1',
                      rules: [{ required: true, message: '是否希望在您输入时实时展现搜索结果' }]
                    },
                  ]"
                placeholder="开启"
                style="width: 120px"
              >
                <a-select-option value="1">开启</a-select-option>
                <a-select-option value="0">关闭</a-select-option>
              </a-select>
            </a-form-item>
            <a-row style="margin-top: 20px">
              <a-col :span="24" :style="{ textAlign: 'center' }">
                <a-button type="primary" html-type="submit">
                  保存设置
                </a-button>
                <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                  恢复默认
                </a-button>
              </a-col>
            </a-row>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="高级搜索" key="2" forceRender>
          <a-form class="ant-advanced-search-form" :form="form2" @submit="handleSearch">
            <a-form-item label="搜索结果"
                         v-bind="formItemLayout">
              <a-input
                v-decorator="['includeAll']"
                placeholder="包含该输入框的全部关键词"
              />
              <a-input
                v-decorator="['includeAnyone']"
                placeholder="包含该输入框的任意关键词"
              />
              <a-input
                v-decorator="['includeEntire']"
                placeholder="请输入要包含的完整关键词（不分词）"
              />
              <a-input
                v-decorator="['notInclude']"
                placeholder="请输入不包含的所有完整关键词（不分词，关键词之间以中文分号分隔）"
              />
            </a-form-item>
            <a-form-item label="时间"
                         v-bind="formItemLayout"
                         has-feedback
                         help="限定要搜索的资源的时间">
              <a-select
                v-decorator="[
                    'time',
                    {
                      initialValue: '10',
                      rules: [{ required: true, message: '请选择限定搜索的时间范围' }]
                    },
                  ]"
                placeholder="每页显示10条"
                style="width: 180px"
              >
                <a-select-option value="10">全部时间</a-select-option>
                <a-select-option value="day">最近一天</a-select-option>
                <a-select-option value="week">最近一周</a-select-option>
                <a-select-option value="month">最近一月</a-select-option>
                <a-select-option value="year">最近一年</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="关键词位置："
                         v-bind="formItemLayout"
                         help="查询关键词的位置">
              <a-radio-group
                v-decorator="[
                    'location',
                    {
                      initialValue: 'all',
                      rules: [
                        {
                          required: true,
                          message: '请选择查询关键词的位置!',
                        },
                      ],
                    },
                  ]">
                <a-radio value="all">
                  任何地方
                </a-radio>
                <a-radio value="title">
                  仅电影名
                </a-radio>
                <a-radio value="introduction">
                  仅电影简介
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="数据来源"
                         v-bind="formItemLayout"
                         has-feedback
                         help="选择要搜索的数据来源（默认全部来源）">
              <a-select
                v-decorator="[
                    'source',
                    {
                      initialValue: ['douban', 'dianyingtiantang', 'imdb'],
                      rules: [
                        {
                          required: true,
                          message: '请选择要搜索的数据来源!',
                        },
                      ],
                    },
                  ]"
                mode="multiple"
                style="width: 100%"
                placeholder="select one country"

                optionLabelProp="label"
              >
                <a-select-option value="douban" label="豆瓣">
                   豆瓣
                </a-select-option>
                <a-select-option value="dianyingtiantang" label="电影天堂">
                  电影天堂
                </a-select-option>
                <a-select-option value="imdb" label="IMDb">
                  IMDb
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-row style="margin-top: 20px">
              <a-col :span="24" :style="{ textAlign: 'center' }">
                <a-button type="primary" html-type="submit">
                  搜索
                </a-button>
                <a-button :style="{ marginLeft: '8px' }" @click="searchReset">
                  重置
                </a-button>
              </a-col>
            </a-row>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
export default {
  components: {ACol, ARow},
  data () {
    return {
      visible: false,
      form1: this.$form.createForm(this, { name: 'setting' }),
      form2: this.$form.createForm(this, { name: 'advancedSearch' }),
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12, offset: 4 }
        }
      }
    }
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false;
    },
    callback(key) {
      console.log(key);
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form1.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$message
            .loading('保存设置中..', 0.5)
            .then(() => {
              const key = `open${Date.now()}`;
              this.$notification.open({
                message: `来自 电影搜索引擎`,
                description:
                  '已经记录下您的使用偏好。',
                btn: h => {
                  return h(
                    'a-button',
                    {
                      props: {
                        type: 'primary',
                        size: 'small',
                      },
                      on: {
                        click: () => this.$notification.close(key),
                      },
                    },
                    '确定',
                  );
                },
                key,
                onClose: close,
              });
              this.visible = false
            })
        }
      })
    },
    handleReset () {
      this.form1.resetFields()
      this.$message
        .loading('恢复默认..', 0.5)
        .then(() => {
          const key = `open${Date.now()}`;
          this.$notification.open({
            message: `来自 电影搜索引擎`,
            description:
              '已经恢复默认设置。',
            btn: h => {
              return h(
                'a-button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  on: {
                    click: () => this.$notification.close(key),
                  },
                },
                '确定',
              );
            },
            key,
            onClose: close,
          });
          this.visible = false
        })
    },
    handleSearch (e) {
      e.preventDefault()
      this.form2.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        } else {
          console.log('error', err)
        }
     })
    },
    searchReset () {
      this.form2.resetFields()
    }
  }
}
</script>

<style lang="stylus">
  #app
    font-family Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 10px
</style>