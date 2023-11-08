<!--  线 + 柱混合图 -->
<template>
  <el-card>
    <template #header>
      <div class="title">
        去雾效果柱状图
        <el-tooltip effect="dark" content="点击试试下载" placement="bottom">
          <i-ep-download class="download" @click="downloadEchart" />
        </el-tooltip>
      </div>
    </template>

    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const props = defineProps({
  id: {
    type: String,
    default: "barChart",
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
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  legend: {
    x: "center",
    y: "bottom",
    data: ["有雾图像", "无雾图像", "PSNR", "SSIM"],
    textStyle: {
      color: "#999",
    },
  },
  xAxis: [
    {
      type: "category",
      data: [
        "C2PNet",
        "DehazeFormer",
        "MB-TaylorFormer",
        "MixDehazeNet",
        "RIDCP",
      ],
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      min: 0,
      max: 3000,
      interval: 500,
      axisLabel: {
        formatter: "{value} ",
      },
    },
    {
      type: "value",
      min: 0,
      max: 50,
      interval: 10,
      axisLabel: {
        formatter: "{value}%",
      },
    },
  ],
  series: [
    {
      name: "有雾图像",
      type: "bar",
      data: [1200, 500, 2500, 1800, 800],
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#83bff6" },
          { offset: 0.5, color: "#188df0" },
          { offset: 1, color: "#188df0" },
        ]),
      },
    },
    {
      name: "无雾图像",
      type: "bar",
      data: [3000, 1000, 2400, 1600, 800],
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#25d73c" },
          { offset: 0.5, color: "#1bc23d" },
          { offset: 1, color: "#179e61" },
        ]),
      },
    },
    {
      name: "PSNR",
      type: "line",
      yAxisIndex: 1,
      data: [25, 30, 26, 38, 41],
      itemStyle: {
        color: "#67C23A",
      },
    },
    {
      name: "SSIM",
      type: "line",
      yAxisIndex: 1,
      data: [14, 25, 30, 35, 40],
      itemStyle: {
        color: "#409EFF",
      },
    },
  ],
};
const chart = ref<any>("");
onMounted(() => {
  // 图表初始化
  chart.value = markRaw(
    echarts.init(document.getElementById(props.id) as HTMLDivElement)
  );

  chart.value.setOption(options);

  // 大小自适应
  window.addEventListener("resize", () => {
    chart.value.resize();
  });
});
const downloadEchart = () => {
  // 获取画布图表地址信息
  const img = new Image();
  img.src = chart.value.getDataURL({
    type: "png",
    pixelRatio: 1,
    backgroundColor: "#fff",
  });
  // 当图片加载完成后，生成 URL 并下载
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const link = document.createElement("a");
      link.download = `去雾效果图.png`;
      link.href = canvas.toDataURL("image/png", 0.9);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;

  .download {
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }
}
</style>
