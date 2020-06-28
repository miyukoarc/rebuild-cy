<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from'./mixins/resize'

export default{
  mixins:[resize],
  props:{
    className:{
      type:String,
      default:'chart'
    },
    width:{
      type:String,
      default:'100%'
    },
    height:{
      type:String,
      default:'300px'
    }
  },
  data() {
    return{
      chart:null
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.initChart()
    })
  },
  beforeDestroy() {
    if(!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods:{
    initChart() {
      this.chart = echarts.init(this.$el,'macarons')

      this.chart.setOption({
        tooltip:{
          trigger:'item',
          formatter:'{a} <br/>{b} : {c} ({d}%)'
        },
        legend:{
          left:'center',
          bottom:'10',
          data:['今日新增客户','今日流失客户','今日活跃用户','7日活跃用户','30日活跃用户']
        },
        series:[
          {
            name:'企业数据统计',
            type:'pie',
            roseType:'radius',
            radius:[15,95],
            center:['50%','38%'],
            data:[
              { value:320,name:'今日新增客户' },
              { value:240,name:'今日流失客户' },
              { value:149,name:'今日活跃用户' },
              { value:100,name:'7日活跃用户' },
              { value:59,name:'30日活跃用户' }
            ],
            animationEasing:'cubicInOut',
            animationDuration:2600
          }
        ]
      })
    }
  }
}
</script>
