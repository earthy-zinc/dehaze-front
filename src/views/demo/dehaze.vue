<script setup lang="ts">
import SingleUpload from "@/components/Upload/SingleUpload.vue";

const singlePicUrl = ref("");

</script>

<template>
	<div class="app-container">
		<el-form>
			<el-form-item label="单图上传">
				<single-upload v-model="singlePicUrl" />
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped lang="scss">

</style>
