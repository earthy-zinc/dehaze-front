import { Dataset } from "@/api/dataset/model";

export default [
  {
    id: 1,
    parentId: -1,
    type: "图像去雾",
    name: "I-HAZE",
    description: "用于均匀浓雾图像去雾的一个小规模数据集",
    path: "/root/dataset/dehaze/I-HAZE",
    size: "122.34MB",
    total: 50,
    children: [],
    createTime: new Date(),
    updateTime: new Date(),
    status: 1,
  },
  {
    id: 2,
    parentId: -1,
    type: "图像去雾",
    name: "RESIDE",
    description: "用于图像去雾的一个大规模合成数据集",
    path: "/root/dataset/dehaze/RESIDE",
    size: "2.35GB",
    total: 11250,
    children: [
      {
        id: 3,
        parentId: 2,
        type: "图像去雾",
        name: "ITS",
        description: "用于图像去雾的一个大规模合成数据集ITS",
        path: "/root/dataset/dehaze/RESIDE/ITS",
        size: "578.2MB",
        total: 3250,
        createTime: new Date(),
        updateTime: new Date(),
        status: 1,
      },
      {
        id: 4,
        parentId: 2,
        type: "图像去雾",
        name: "OTS",
        description: "用于图像去雾的一个大规模合成数据集ITS",
        path: "/root/dataset/dehaze/RESIDE/OTS",
        size: "468.5MB",
        total: 5250,
        createTime: new Date(),
        updateTime: new Date(),
        status: 1,
      },
      {
        id: 5,
        parentId: 2,
        type: "图像去雾",
        name: "SOTS",
        description: "用于图像去雾的一个大规模合成数据集SOTS",
        path: "/root/dataset/dehaze/RESIDE/SOTS",
        size: "468.5MB",
        total: 5250,
        createTime: new Date(),
        updateTime: new Date(),
        sort: 2,
        status: 1,
      },
    ],
    createTime: new Date(),
    updateTime: new Date(),
    status: 1,
  },
  {
    id: 10,
    parentId: -1,
    type: "图像去雾",
    name: "O-HAZE",
    description: "用于均匀浓雾图像去雾的一个小规模数据集",
    path: "/root/dataset/dehaze/O-HAZE",
    size: "122.34MB",
    total: 50,
    children: [],
    createTime: new Date(),
    updateTime: new Date(),
    status: 1,
  },
  {
    id: 11,
    parentId: -1,
    type: "图像去雾",
    name: "NH-HAZE",
    description: "用于非均匀图像去雾的一个小规模数据集",
    path: "/root/dataset/dehaze/NH-HAZE",
    size: "122.34MB",
    total: 50,
    children: [
      {
        id: 12,
        parentId: 11,
        type: "图像去雾",
        name: "NH-HAZE-20",
        description: "用于均匀浓雾图像去雾的一个小规模数据集",
        path: "/root/dataset/dehaze/NH-HAZE",
        size: "122.34MB",
        total: 50,
        children: [],
        createTime: new Date(),
        updateTime: new Date(),
        status: 1,
      },
      {
        id: 13,
        parentId: 11,
        type: "图像去雾",
        name: "NH-HAZE-21",
        description: "用于均匀浓雾图像去雾的一个小规模数据集",
        path: "/root/dataset/dehaze/NH-HAZE",
        size: "122.34MB",
        total: 50,
        children: [],
        createTime: new Date(),
        updateTime: new Date(),
        status: 1,
      },
      {
        id: 14,
        parentId: 11,
        type: "图像去雾",
        name: "NH-HAZE-23",
        description: "用于均匀浓雾图像去雾的一个小规模数据集",
        path: "/root/dataset/dehaze/NH-HAZE",
        size: "122.34MB",
        total: 50,
        children: [],
        createTime: new Date(),
        updateTime: new Date(),
        status: 1,
      },
    ],
    createTime: new Date(),
    updateTime: new Date(),
    status: 1,
  },
  {
    id: 15,
    parentId: -1,
    type: "图像去雾",
    name: "DENSE-HAZE",
    description: "用于浓雾图像去雾的一个小规模数据集",
    path: "/root/dataset/dehaze/DENSE-HAZE",
    size: "122.34MB",
    total: 50,
    children: [],
    createTime: new Date(),
    updateTime: new Date(),
    status: 1,
  },
  {
    id: 16,
    parentId: -1,
    type: "图像去雾",
    name: "RS-HAZE",
    description: "用于遙感图像去雾的一个大规模数据集",
    path: "/root/dataset/dehaze/RS-HAZE",
    size: "122.34MB",
    total: 50,
    children: [],
    createTime: new Date(),
    updateTime: new Date(),
    status: 1,
  },
] as Dataset[];
