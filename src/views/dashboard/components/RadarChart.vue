<!-- 雷达图 -->
<template>
  <el-card>
    <template #header> 数据集情况雷达图 </template>
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const props = defineProps({
  id: {
    type: String,
    default: "radarChart",
  },
  className: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "200px",
    required: true,
  },
  height: {
    type: String,
    default: "200px",
    required: true,
  },
});

const options = {
  grid: {
    left: "2%",
    right: "2%",
    bottom: "10%",
    containLabel: true,
  },
  legend: {
    x: "center",
    y: "bottom",
    data: ["简单雾霾图", "困难雾霾图", "真实雾霾图"],
    textStyle: {
      color: "#999",
    },
  },
  radar: {
    // shape: 'circle',
    radius: "60%",
    indicator: [
      { name: "RESIDE" },
      { name: "Dense-Haze" },
      { name: "I-Haze" },
      { name: "O-Haze" },
      { name: "RS-Haze" },
      { name: "NH-Haze" },
    ],
  },
  series: [
    {
      name: "Budget vs spending",
      type: "radar",
      itemStyle: {
        borderRadius: 6,
        color: function (params: any) {
          //自定义颜色
          const colorList = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C"];
          return colorList[params.dataIndex];
        },
      },
      data: [
        {
          value: [400, 100, 200, 600, 300, 100],
          name: "简单雾霾图",
        },
        {
          value: [300, 100, 100, 200, 600, 100],
          name: "困难雾霾图",
        },
        {
          value: [800, 300, 200, 100, 600, 500],
          name: "真实雾霾图",
        },
      ],
    },
  ],
};

onMounted(() => {
  const chart = echarts.init(
    document.getElementById(props.id) as HTMLDivElement
  );
  chart.setOption(options);

  window.addEventListener("resize", () => {
    chart.resize();
  });
});
</script>
