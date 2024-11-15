import {
  Dataset,
  DatasetQuery,
  ImageItem,
  ImageItemQuery,
} from "@/api/dataset/model";
import request from "@/utils/request";

class DatasetAPI {
  /**
   * 数据集树形表格
   * @param queryParams
   */
  static getList(queryParams?: DatasetQuery) {
    return request<any, Dataset[]>({
      url: "/api/v1/dataset",
      method: "get",
      params: queryParams,
    });
  }

  /**
   * 根据Id获取数据集信息
   * @param id 数据集id
   */
  static getDatasetInfoById(id: number) {
    return request<any, Dataset>({
      url: "/api/v1/dataset/" + id,
      method: "get",
    });
  }

  /**
   * 获取数据集详细图片
   *
   * @param id
   * @param queryParams
   */
  static getImageItem(id: number, queryParams: ImageItemQuery) {
    return request<any, PageResult<ImageItem[]>>({
      url: "/api/v1/dataset/" + id + "/images",
      method: "get",
      params: queryParams,
    });
  }

  /**
   * 新增数据集
   *
   * @param data
   */
  static add(data: Dataset) {
    return request({
      url: "/api/v1/dataset",
      method: "post",
      data: data,
    });
  }

  /**
   *  修改数据集
   *
   * @param id
   * @param data
   */
  static update(id: number, data: Dataset) {
    return request({
      url: "/api/v1/dataset/" + id,
      method: "put",
      data: data,
    });
  }

  /**
   * 删除数据集
   *
   * @param ids
   */
  static deleteByIds(ids: string[]) {
    return request({
      url: "/api/v1/dataset/" + ids,
      method: "delete",
    });
  }
}

export default DatasetAPI;
