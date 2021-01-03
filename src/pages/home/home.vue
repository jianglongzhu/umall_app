<template>
  <div id="box"></div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
  mounted() {
    this.reqList();
  },
  watch:{
    list:{
      handler() {
        if (this.list.length > 0) {
            console.log(this.list)
          var myChart = require("echarts").init(document.getElementById("box"));
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["数量"],
            },
            xAxis: {
              data: this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [
              {
                name: "数量",
                type: "line",
                data: this.list.map(item=>item.children?item.children.length:0),
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep:true
    },
  },
};
</script>

<style>
#box {
  width: 80%;
  height: 400px;
  margin: 0 auto;
  margin-top:50px;

}
</style>