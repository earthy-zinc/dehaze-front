<script lang="ts" setup>
import { Nullable } from "@/utils/types";
import { LazyType } from "./types";

defineOptions({
  name: "LazyImg",
});

const emit = defineEmits(["load", "success", "error", "showBigPicture"]);
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
});

const imgLoaded = inject("imgLoaded") as () => void;
const lazy = inject("lazy") as LazyType;
const lazyRef = ref<Nullable<any>>(null);

watch(
  () => props.url,
  (newValue, oldValue) => {
    unRender();
    render();
  }
);

onMounted(() => {
  render();
});

onUnmounted(() => {
  unRender();
});

function render() {
  if (!lazyRef.value) return;

  lazy.mount(lazyRef.value, props.url, (status) => {
    imgLoaded();
    if (status) emit("success", props.url);
    else emit("error", props.url);
  });
}

function unRender() {
  if (!lazyRef.value) return;

  lazy.unmount(lazyRef.value);
}

function imageLoad() {
  emit("load", props.url);
}
</script>

<template>
  <div class="lazy__box">
    <div class="lazy__resource">
      <img
        ref="lazyRef"
        :alt="alt"
        :title="title"
        class="lazy__img"
        @load="imageLoad"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lazy__box {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
}

.lazy__resource {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lazy__img {
  display: block;
  transition: all 0.5s;
}

.lazy__img:hover {
  transform: scale(1.2);
}

.lazy__img[lazy="loading"] {
  width: 100%;
  padding: 5em 0;
}

.lazy__img[lazy="loaded"] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lazy__img[lazy="error"] {
  width: 48px;
  height: auto;
  padding: 5em 0;
}
</style>
