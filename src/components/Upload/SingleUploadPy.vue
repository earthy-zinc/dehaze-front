<script setup lang="ts">
import { uploadImageApi } from "@/api/dehaze";
import { imageBaseURL } from "@/utils/request-py";
import { UploadRawFile, UploadRequestOptions } from "element-plus";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "点击上传文件",
  },
});

const emit = defineEmits(["update:modelValue", "getImageInfo"]);
const imageName = useVModel(props, "modelValue", emit);

const imgUrl = computed(() => {
  return imageName.value ? imageBaseURL + "/" + imageName.value + "/" : "";
});

const isLoading = ref(false);
async function uploadFile(options: UploadRequestOptions): Promise<any> {
  isLoading.value = true;
  try {
    const { data } = await uploadImageApi(options.file);
    imageName.value = data.image_name;
  } finally {
    isLoading.value = false;
  }
}

async function handleBeforeUpload(file: UploadRawFile) {
  if (file.size > 20 * 1024 * 1024) {
    ElMessage.warning("上传图片不能大于20M");
    return false;
  }
  const image = new Image();
  image.src = URL.createObjectURL(file);
  await image.decode();
  // 向父组件传递用户所上传的图片的分辨率
  emit("getImageInfo", image.naturalWidth, image.naturalHeight);
  return true;
}
</script>

<template>
  <el-upload
    v-model="imgUrl"
    class="single-uploader"
    :show-file-list="false"
    list-type="picture"
    :before-upload="handleBeforeUpload"
    :http-request="uploadFile"
  >
    <img v-if="imgUrl" :src="imgUrl" class="single" alt="" />
    <div v-else-if="isLoading" class="single-uploader-placeholder">
      <span>上传中...</span>
    </div>
    <div v-else class="single-uploader-placeholder">
      <el-icon class="single-uploader-icon"><i-ep-plus /></el-icon>
      <span style="margin-top: 5px">{{ title }}</span>
    </div>
  </el-upload>
</template>

<style scoped>
.single-uploader .single {
  display: block;
  width: 35vmax;
  height: 35vmax;
}
</style>

<style>
.single-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.single-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.single-uploader-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35vmax;
  height: 35vmax;
}

.single-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>
