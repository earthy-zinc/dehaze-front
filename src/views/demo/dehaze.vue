<script setup lang="ts">
import {calculateIndexApi, dehazeApi, getModelApi} from "@/api/dehaze";
import {ModelInfo} from "@/api/dehaze/types";
import SingleUploadPy from "@/components/Upload/SingleUploadPy.vue";
import {imageBaseURL} from "@/utils/request-py";

const dehazeModels = ref<ModelInfo[]>();
const selectedDehazeModel = ref("");

onMounted(async () => {
	const {data} = await getModelApi();
	dehazeModels.value = data
});

const hazeImage = ref("");
const clearImage = ref("")
const outputImage = ref("")
const dehazedImgUrl = computed(() => {
	return outputImage.value ? imageBaseURL + "/" + outputImage.value + "/" : ''
})

const isLoading = ref(false)
const loadingText = ref("开始去雾")

async function dehazeImage() {
	isLoading.value = true
	loadingText.value = "正在去雾"
	const {data} = await dehazeApi(hazeImage.value, selectedDehazeModel.value)
	outputImage.value = data.image_name
	isLoading.value = false
	loadingText.value = "开始去雾"
}

const psnr = ref("")
const ssim = ref("")

async function calculateDehazeIndex() {
	const {data} = await calculateIndexApi(hazeImage.value, clearImage.value)
	psnr.value = data.psnr
	ssim.value = data.ssim
}


function resetForm() {

}
</script>

<template>
	<div class="app-container">
		<el-form>
			<el-form-item>
				<el-select v-model="selectedDehazeModel" placeholder="请选择去雾模型">
					<el-option
							v-for="dehazeModel in dehazeModels"
							:key="dehazeModel.id"
							:label="dehazeModel.model_name"
							:value="dehazeModel.model_name"
					/>
				</el-select>
				<el-button style="margin-left: 15px" type="primary" @click="dehazeImage" :loading="isLoading">{{ loadingText }}</el-button>
				<el-button @click="calculateDehazeIndex">评估效果</el-button>
				<el-button @click="resetForm">重置页面</el-button>
			</el-form-item>
		</el-form>
		<el-form :inline="true">
			<el-form-item label="上传有雾图像">
				<single-upload-py v-model="hazeImage"/>
			</el-form-item>
			<el-form-item label="上传无雾图像">
				<single-upload-py v-model="clearImage"/>
			</el-form-item>
		</el-form>
		<img v-if="outputImage" :src="dehazedImgUrl" alt=""/>
		<div v-show="psnr || ssim">
			最终去雾效果为 PSNR: {{ psnr }} SSIM: {{ ssim }}
		</div>
	</div>
</template>

<style scoped lang="scss">

</style>
