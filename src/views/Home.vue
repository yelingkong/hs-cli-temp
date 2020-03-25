<template>
  <div class="home">
    <h1 class='header'>
      <img src="../assets/logo.png" alt="">
      {{ 'Hanshow project template' | t }}
      <div class="menus">
        <el-dropdown class='dropdown' @command='toggleLanguage'>
          <span class="el-dropdown-link">
            {{ 'Language' | t }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='cn'>简体中文</el-dropdown-item>
            <el-dropdown-item command='en'>English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class='dropdown' @command='toggleTheme'>
          <span class="el-dropdown-link">
            {{ 'Theme' | t }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='default'>{{ 'Default' | t }}</el-dropdown-item>
            <el-dropdown-item command='dark'>{{ 'Dark' | t }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </h1>

    <div class="section">
      <div class='title'>树形选择器</div>
      <el-row>
        <el-col :span='6'>
          <div class='label'>单选</div>
          <tree-select v-model="value1" :data='treeData'></tree-select>
        </el-col>
        <el-col :span='6'>
          <div class='label'>多选</div>
          <tree-select v-model="value2" :multiple='true' :data='treeData'></tree-select>
        </el-col>
        <el-col :span='6'>
          <div class='label'>筛选树节点</div>
          <tree-select v-model="value1" :filterable='true' :data='treeData'></tree-select>
        </el-col>
      </el-row>

      <div class="title">Echart 图表</div>
      <el-row>
        <el-col :span='12'>
          <div class='label'>线图</div>
          <chart ref='myChart' :option='lineOption' width='500px' height='300px'></chart>
        </el-col>
        <el-col :span='12'>
          <div class='label'>饼图</div>
          <chart ref='myChart' :option='pieOption' width='500px' height='300px'></chart>
        </el-col>
      </el-row>

      <div class="title">Canvas 画布</div>
      <el-row>
        <el-col :span='12'>
          <div class="label">热力图</div>
          <heatmap></heatmap>
        </el-col>
        <el-col :span='12'>
          <div class="label">室内地图</div>
          <indoor-map></indoor-map>
        </el-col>
      </el-row>

      <div class="title">进度条</div>
      <el-row>
        <el-col :span='6'>
          <div class="label">默认样式</div>
          <progress-bar :value='64' width='80%'></progress-bar>
        </el-col>
        <el-col :span='6'>
          <div class="label">自定义颜色</div>
          <progress-bar :value='64' width='80%' color='#fa5'></progress-bar>
        </el-col>
        <el-col :span='6'>
          <div class="label">自定义高度</div>
          <progress-bar :value='80' color='#fa5' width='80%' height='10px'></progress-bar>
        </el-col>
        <el-col :span='6'>
          <div class="label">显示百分比</div>
          <progress-bar :value='80' width='80%' height='10px'>80%</progress-bar>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TreeSelect from '@/components/treeSelect'
import Chart from '@/components/chart'
import ProgressBar from '@/components/progressBar'
import Heatmap from './components/Heatmap'
import IndoorMap from './components/IndoorMap.vue'

export default {
  components: { TreeSelect, Chart, ProgressBar, Heatmap, IndoorMap },

  data () {
    return {
      value1: '',
      value2: [],
      treeData: [{
        id: 'CHN',
        label: '中国',
        disabled: true,
        children: [{
          id: 'BeiJing',
          label: '北京',
          disabled: true,
          children: [{
            id: 'HS000001',
            label: '北京汉朔门店'
          }]
        }]
      }, {
        id: 'NLD',
        label: '荷兰',
        disabled: true,
        children: [{
          id: 'amstd',
          label: '阿姆斯特丹',
          disabled: true,
          children: [{
            id: 'HS000002',
            label: '荷兰汉朔门店'
          }]
        }]
      }],

      lineOption: {
        color: ['#FF9395', '#05DBE7', '#3D87FF', '#FFD015'],
        grid: {
          left: '2%',
          right: '5%',
          top: '12%',
          bottom: '2%',
          containLabel: true
        },
        legend: {
          top: '2%',
          data: ['ESL', 'Camera']
        },
        xAxis: {
          type: 'time',
          axisLine: {
            lineStyle: {
              color: '#999999'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0'
            }
          },
          data: ['ESL', 'Camera']
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
        series: [
          {
            type: 'line',
            name: 'ESL',
            smooth: true,
            lineStyle: {
              shadowBlur: 8,
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowColor: '#FF9395'
            },
            data: [
              [1484141700832, 30],
              [1484141710832, 40],
              [1484141720832, 20],
              [1484141730832, 60],
              [1484141740832, 220],
              [1484141750832, 30],
              [1484141760832, 40],
              [1484141770832, 20],
              [1484141780832, 40],
              [1484141790832, 20]
            ]
          },
          {
            type: 'line',
            name: 'Camera',
            smooth: true,
            lineStyle: {
              shadowBlur: 8,
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowColor: '#05DBE7'
            },
            data: [
              [1484141700832, 40],
              [1484141710832, 50],
              [1484141720832, 70],
              [1484141730832, 60],
              [1484141740832, 40],
              [1484141750832, 60],
              [1484141760832, 50],
              [1484141770832, 70],
              [1484141780832, 50],
              [1484141790832, 70]
            ]
          }
        ]
      },
      pieOption: {
        title: {
          show: true,
          text: '设备使用率',
          top: '80%',
          left: 'center',
          textStyle: {
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular,PingFang SC',
            fontWeight: 400,
            color: 'rgba(51,51,51,1)'
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '60%'],
            center: ['50%', '45%'],
            hoverAnimation: false,
            z: 0,
            data: [
              {
                value: 100,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                itemStyle: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  color: '#F8FAF7'
                }
              }
            ]
          },
          {
            type: 'pie',
            radius: ['48%', '50%'],
            center: ['50%', '45%'],
            hoverAnimation: false,
            z: 1,
            data: [
              {
                value: 100,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                itemStyle: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  color: '#FFD015'
                }
              }
            ]
          },
          {
            type: 'pie',
            radius: ['40%', '50%'],
            center: ['50%', '45%'],
            hoverAnimation: false,
            clockWise: false,
            z: 2,
            data: [
              {
                value: 80,
                itemStyle: {
                  color: '#FFD015'
                },
                label: {
                  normal: {
                    formatter: '{a|80%}\n{b|+2%}',
                    position: 'center',
                    show: true,
                    rich: {
                      a: {
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#333333'
                      },
                      b: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#5FCB27'
                      }
                    }
                  }
                },
                labelLine: {
                  show: false
                }
              },
              {
                value: 20,
                itemStyle: {
                  color: 'transparent',
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },

  methods: {
    ...mapMutations(['setLanguage', 'setTheme']),

    toggleLanguage (lang) {
      this.setLanguage(lang)
    },

    toggleTheme (theme) {
      this.setTheme(theme)
    }
  }
}
</script>

<style scoped lang='scss'>
.home {
  height: 100vh;
  .header {
    height: .66rem;
    margin: 0;
    padding: 0 .2rem;
    line-height: .66rem;
    font-size: .28rem;
    img {
      height: .3rem;
      vertical-align: middle;
      margin-right: .4rem;
    }
    .menus {
      float: right;
      font-size: .14rem;
      .dropdown {
        cursor: pointer;
        outline: none;
        line-height: 32px;
        margin-right: .2rem;
      }
    }
  }

  .section {
    height: calc(100% - .66rem);
    padding: 0 200px;
    overflow: auto;
    .title {
      padding: 30px 10px 6px 10px;
      font-size: 16px;
      font-weight: 500;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
    .label {
      padding: 10px;
    }
  }
}
</style>
