import {DehazeIndex} from "@/api/dehaze/types";
import requestPy from "@/utils/request-py";
import {AxiosPromise} from "axios";

export function uploadImageApi(file: File) {
	return requestPy({
		url: "/upload",
		method: "post",
		data: file,
		headers: {
			"Content-Type": "Image/png",
		}
	})
}

export function dehazeApi(file: File): AxiosPromise<File>{
	return requestPy({
		url: "/dehaze",
		method: "post",
		data: file,
		headers: {
			"Content-Type": "Image/png",
		}
	})
}

export function calculateIndexApi(): AxiosPromise<DehazeIndex> {
	return requestPy({

	})
}
