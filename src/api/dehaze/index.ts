import {DehazeIndex, ImageInfo, ModelInfo} from "@/api/dehaze/types";
import requestPy from "@/utils/request-py";
import {AxiosPromise} from "axios";

export function getModelApi(): AxiosPromise<ModelInfo[]> {
	return requestPy({
		url: "/model/",
		method: "get",
	})
}

export function uploadImageApi(file: File): AxiosPromise<ImageInfo> {
	return requestPy({
		url: "/upload/",
		method: "post",
		data: file,
		headers: {
			"Content-Type": "Image/png",
		}
	})
}

export function downloadApi(image_name: string): AxiosPromise<File> {
	return requestPy({
		url: `/download/${image_name}/`,
		method: "get"
	})
}

export function dehazeApi(haze_image: string, model_name: string): AxiosPromise<ImageInfo>{
	return requestPy({
		url: "/dehazeImage/",
		method: "post",
		data: {haze_image, model_name}
	})
}

export function calculateIndexApi(haze_image: string, clear_image: string): AxiosPromise<DehazeIndex> {
	return requestPy({
		url: "/calculateIndex/",
		method: "post",
		data: {haze_image, clear_image}
	})
}
