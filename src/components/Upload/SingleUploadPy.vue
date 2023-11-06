<script setup lang="ts">

import {uploadImageApi} from "@/api/dehaze";
import {imageBaseURL} from "@/utils/request-py";
import {UploadRawFile, UploadRequestOptions} from "element-plus";

const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
});

const emit = defineEmits(["update:modelValue"]);
const imageName = useVModel(props, "modelValue", emit);

const imgUrl = computed(() => {
	return imageName.value ? imageBaseURL + "/" + imageName.value + "/" : ""
});
async function uploadFile(options: UploadRequestOptions): Promise<any> {
	// options.file.size
	const { data } =  await uploadImageApi(options.file);
	console.log(new URL(data.image_name, imageBaseURL).toString())
	imageName.value = data.image_name
}

function handleBeforeUpload(file: UploadRawFile) {
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
		<img v-if="imgUrl" :src="imgUrl" class="single" alt=""/>
		<el-icon v-else class="single-uploader-icon"><i-ep-plus /></el-icon>
</el-upload>
</template>

<style scoped>
.single-uploader .single {
	display: block;
	width: 178px;
	height: 178px;
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

.el-icon.single-uploader-icon {
	width: 178px;
	height: 178px;
	font-size: 28px;
	color: #8c939d;
	text-align: center;
}
</style>
