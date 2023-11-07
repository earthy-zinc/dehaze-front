<script setup lang="ts">
import { calculateIndexApi, dehazeApi, getModelApi } from "@/api/dehaze";
import { ModelInfo } from "@/api/dehaze/types";
import SingleUploadPy from "@/components/Upload/SingleUploadPy.vue";
import { imageBaseURL } from "@/utils/request-py";

const dehazeModels = ref<ModelInfo[]>();
const selectedDehazeModel = ref("");

onMounted(async () => {
  const { data } = await getModelApi();
  dehazeModels.value = data;
});

const hazeImage = reactive({
  name: "",
  height: 0,
  width: 0,
});
const clearImage = reactive({
  name: "",
  height: 0,
  width: 0,
});
const outputImage = reactive({
  name: "",
  height: 0,
  width: 0,
});
const dehazedImgUrl = computed(() => {
  return outputImage.name ? imageBaseURL + "/" + outputImage.name + "/" : "";
});

const isLoading = ref(false);
const loadingText = ref("开始去雾");

async function dehazeImage() {
  if (selectedDehazeModel.value.length === 0) {
    ElMessage.warning("请选择去雾模型！");
    return;
  }
  if (hazeImage.name.length === 0) {
    ElMessage.warning("请上传有雾图像！");
    return;
  }
  isLoading.value = true;
  loadingText.value = "正在去雾";
  try {
    const { data } = await dehazeApi(hazeImage.name, selectedDehazeModel.value);
    outputImage.name = data.image_name;
  } finally {
    isLoading.value = false;
    loadingText.value = "开始去雾";
  }
}

const psnr = ref(0);
const psnrEvaluate = computed(() => {
  if (psnr.value > 40) return "奇迹";
  else if (psnr.value > 30) return "优秀";
  else if (psnr.value > 20) return "良好";
  else if (psnr.value > 10) return "一般";
  else if (psnr.value > 1) return "不及格";
  else return "-";
});
const ssim = ref(0);
const ssimEvaluate = computed(() => {
  if (ssim.value > 0.95) return "奇迹";
  else if (ssim.value > 0.8) return "优秀";
  else if (ssim.value > 0.6) return "良好";
  else if (ssim.value > 0.4) return "一般";
  else if (ssim.value > 0.1) return "不及格";
  else return "-";
});
const vi = ref(0);
const viEvaluate = computed(() => "-");
const ri = ref(0);
const riEvaluate = computed(() => "-");
const comprehensiveReview = computed(
  () => "该图像去雾效果不错，在PSNR、SSIM指标上的表现都超过了预期，值得庆祝！"
);
async function calculateDehazeIndex() {
  if (
    hazeImage.height !== clearImage.height ||
    hazeImage.width !== clearImage.width
  ) {
    ElMessage.warning("基准无雾图像和传入的有雾图像分辨率不对应，无法计算指标");
    return;
  }
  if (outputImage.name.length === 0 || clearImage.name.length === 0) {
    ElMessage.warning("未点击去雾或者未上传基准无雾图像，无法去雾");
    return;
  }
  const { data } = await calculateIndexApi(
    outputImage.name,
    clearImage.name,
    (progressEvent) => {
      if (progressEvent.total) {
        evaluatePercentage.value = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100 - 1
        );
      } else {
        evaluatePercentage.value = 100;
      }
    }
  );
  psnr.value = parseFloat(data.psnr);
  ssim.value = parseFloat(data.ssim);
}
function clearEvaluateResult() {
  clearImage.name = "";
  clearImage.height = 0;
  clearImage.width = 0;
  evaluatePercentage.value = 0;
  psnr.value = 0;
  ssim.value = 0;
}
function getHazeImageInfo(width: number, height: number) {
  hazeImage.width = width;
  hazeImage.height = height;
}
function getClearImageInfo(width: number, height: number) {
  clearImage.width = width;
  clearImage.height = height;
}
function resetForm() {
  clearEvaluateResult();
  outputImage.name = "";
  outputImage.height = 0;
  outputImage.width = 0;
  hazeImage.name = "";
  hazeImage.width = 0;
  hazeImage.height = 0;
  selectedDehazeModel.value = "";
}
const dialogVisible = ref(false);
const drawerVisible = ref(false);
const evaluatePercentage = ref(0);
</script>

<template>
  <div class="app-container">
    <h1 style=" margin: 5px 0 10px;text-align: center">多模型图像去雾系统</h1>

    <div class="operate-panel">
      <el-select v-model="selectedDehazeModel" placeholder="请选择去雾模型">
        <el-option
          v-for="dehazeModel in dehazeModels"
          :key="dehazeModel.id"
          :label="dehazeModel.model_name"
          :value="dehazeModel.model_name"
        />
      </el-select>
      <div class="operate-panel-right">
        <el-button type="primary" @click="dehazeImage" :loading="isLoading">{{
          loadingText
        }}</el-button>
        <el-button @click="dialogVisible = !dialogVisible">评估效果</el-button>
        <el-button @click="drawerVisible = !drawerVisible">历史记录</el-button>
        <el-button type="warning" @click="resetForm">重置页面</el-button>
      </div>
    </div>

    <div class="image-show-container">
      <single-upload-py
        v-model="hazeImage.name"
        title="上传有雾图像"
        @get-image-info="getHazeImageInfo"
      />
      <span style="margin: 0 20px"></span>
      <el-image
        style="width: 35vmax; height: 35vmax"
        :src="dehazedImgUrl"
        fit="fill"
        alt="@/assets/photo.png"
      >
        <template #error>
          <div class="image-show-placeholder">
            请上传有雾图像并点击"开始去雾"获取无雾图像
          </div>
        </template>
      </el-image>
    </div>

    <el-dialog
      v-model="dialogVisible"
      width="60%"
      title="评估效果"
      top="2vh"
      class="dialog-class"
    >
      <el-alert
        :closable="false"
        show-icon
        description="评估去雾模型的去雾效果需要上传用于比较的基准无雾图像，系统才能够计算出模型去雾效果和真实的无雾图像之间的差距。真实的无雾图像需要和原始的有雾图像拍摄位置、图像宽高大小一致，否则会出现错误"
      />
      <div class="dialog-content">
        <single-upload-py
          style="margin-right: 20px"
          v-model="clearImage.name"
          title="上传基准无雾图像"
          @get-image-info="getClearImageInfo"
        />
        <div class="dialog-content-right">
          <div class="dialog-content-right-up">
            <el-button type="primary" @click="calculateDehazeIndex"
              >开始评估</el-button
            >
            <el-button type="info" @click="clearEvaluateResult"
              >清空结果</el-button
            >
          </div>
          <div class="dialog-content-right-center">
            <div style=" display: flex; justify-content: center;width: 100%">
              <el-progress
                v-if="evaluatePercentage !== 100"
                type="dashboard"
                :percentage="evaluatePercentage"
                :color="0"
              />
            </div>
            <el-result v-if="evaluatePercentage === 100" icon="success" />
          </div>
          <div>
            <div class="text-class">
              <span style="margin-right: 16px">雾霾图像分辨率</span>
              {{ hazeImage.width + " * " + hazeImage.height }}
            </div>
            <div class="text-class">
              <span style="margin-right: 16px">基准图像分辨率</span>
              {{ clearImage.width + " * " + clearImage.width }}
            </div>
            <el-descriptions :column="2" size="large">
              <el-descriptions-item :min-width="50" label="PSNR">{{
                psnr
              }}</el-descriptions-item>
              <el-descriptions-item :min-width="50" label="评价">{{
                psnrEvaluate
              }}</el-descriptions-item>
              <el-descriptions-item :min-width="50" label="SSIM">{{
                ssim
              }}</el-descriptions-item>
              <el-descriptions-item :min-width="50" label="评价">{{
                ssimEvaluate
              }}</el-descriptions-item>
              <el-descriptions-item :min-width="50" label="VI">{{
                vi
              }}</el-descriptions-item>
              <el-descriptions-item :min-width="50" label="评价">{{
                viEvaluate
              }}</el-descriptions-item>
              <el-descriptions-item :min-width="50" label="RI">{{
                ri
              }}</el-descriptions-item>
              <el-descriptions-item :min-width="50" label="评价">{{
                riEvaluate
              }}</el-descriptions-item>
              <el-descriptions-item :width="150" label="综合点评">
                {{ comprehensiveReview }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-drawer v-model="drawerVisible" direction="rtl" title="历史记录">
      <el-table>
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="hazeModel" label="去雾模型" />
        <el-table-column prop="type" label="操作类别" />
        <el-table-column prop="operationTime" label="操作时间" />
        <el-table-column prop="detail" label="详情" />
      </el-table>
    </el-drawer>
  </div>
</template>

<style>
.operate-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 15px 20px;
}

.operate-panel-right {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.image-show-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 15px;
}

.image-show-placeholder {
  width: 35vmax;
  height: 35vmax;
  line-height: 35vmax;
  text-align: center;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
}

.dialog-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 15px;
}

.dialog-content-right {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.dialog-content-right-up {
  display: flex;
  justify-content: space-evenly;
}

.dialog-content-right-center {
  height: 130px;
}

.text-class {
  padding: 1px 1px 16px;
  color: var(--el-text-color-primary);
}
</style>
