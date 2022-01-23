import type { ComponentPublicInstance, Ref } from 'vue-demi';

export type MaybeRef<T> = T | Ref<T>;
export type MaybeElementRef = MaybeRef<HTMLElement | SVGElement | ComponentPublicInstance | undefined | null>;