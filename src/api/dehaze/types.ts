export interface ModelInfo {
  value: string;
  label: string;
  children?: ModelInfo;
}

export interface DehazeIndex {
  psnr: string;
  ssim: string;
}

export interface ImageInfo {
  image_name: string;
}
