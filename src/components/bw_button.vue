<template>
  <button 
  class="group disabled:cursor-not-allowed disabled:opacity-90 outline-none select-none focus-visible:outline-2 focus-visible:outline-primary border-[2px] border-transparent focus-visible:ring-2 ring-secondary border-r-[6px] border-b-[6px]" 
  @mousedown="handlePress"
  @mouseup="handleUnpress"
  @mouseleave="handleLeave"
  @keydown.enter="handlePress"
  @keyup.enter="handleUnpress"
  @keydown.space="handlePress"
  @keyup.space="handleUnpress"
  >
    <div 
    class="relative h-full w-full flex items-center justify-center group-disabled:border-[#737373] group-disabled:shadow-[#737373] overflow-hidden gap-1 border-2"
    :class="[
      isPressedStyle && !props.outlined && !props.text 
      ? 'translate-x-[3px] translate-y-[3px]' 
      : props.outlined || props.text 
      ? 'shadow-none' 
      : 'shadow-solid', 
      $slots.default ? 'px-3 py-1': 'py-[8.5px] px-[9px]',
      rounded,
      severity,
      background
      ]"
    >
    <component
      v-if="props.leftIcon"
      class="group-disabled:text-[#737373]"
      :class="[
        !$slots.default && 'py-2',
        iconSize
      ]"
      :is="props.leftIcon"
      />

      <span 
      v-if="$slots.default"
      class="group-disabled:text-[#737373] mb-[2px]" 
      :class="textSize"
      >
        <slot></slot>
      </span>

      <component
      v-if="props.rightIcon"
      class="group-disabled:text-[#737373]"
      :class="[
        iconSize
      ]"
      :is="props.rightIcon"
      />
    </div>
  </button>
</template>


<script setup lang="ts">
import { ref, computed, type ButtonHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  leftIcon?: Object
  rightIcon?: Object
  size?: SizeVariants
  severity?: ColorVariants
  rounded?: RoundedVariants
  background?: ColorVariants
  outlined?: boolean
  text?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'base',
  severity: 'primary',
  rounded: 'none',
  background: 'none'
});

const emit = defineEmits(['click'])

const isPressedStyle = ref(false)

const handlePress = () => {
  isPressedStyle.value = true
}

const handleUnpress = () => {
  isPressedStyle.value && emit('click')
  isPressedStyle.value = false
}

const handleLeave = () => {
  isPressedStyle.value = false
}

const iconSizes: Record<SizeVariants, string> = {
  small: 'w-[16px] h-[13px]',
  base: 'w-[17px] h-[17px]',
  large: 'w-[19px] h-[21px]',
}

const textSizes: Record<SizeVariants, string> = {
  small: 'text-sm',
  base: 'text-base',
  large: 'text-lg',
}

const roundedSizes: Record<RoundedVariants, string> = {
  none: 'rounded-none',
  base: 'rounded-md',
  large: 'rounded-xl',
  full: 'rounded-full',
}

const backgroundColors: Record<ColorVariants, string> = {
  none: 'bg-none',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  error: 'bg-error dark:bg-darkest_error',
  info: 'bg-info dark:bg-darkest_info',
  warning: 'bg-warning dark:bg-darkest_warning',
  success: 'bg-success dark:bg-darkest_success',
}

const severityOutlined: Record<ColorVariants, string> = {
  none: 'bg-none text-primary border-primary',
  primary: 'bg-none text-primary border-primary',
  secondary: 'bg-none text-secondary border-secondary',
  error: 'bg-none text-darkest_error dark:text-error border-darkest_error dark:border-error',
  info: 'bg-none text-darkest_info dark:text-info border-darkest_info dark:border-info',
  warning: 'bg-none text-darkest_warning dark:text-warning border-darkest_warning dark:border-warning',
  success: 'bg-none text-darkest_success dark:text-success border-darkest_success dark:border-success',
}

const severityText: Record<ColorVariants, string> = {
  none: 'bg-none text-primary border-none',
  primary: 'bg-none text-primary border-none',
  secondary: 'bg-none text-secondary border-none',
  error: 'bg-none text-darkest_error dark:text-error border-none',
  info: 'bg-none text-darkest_info dark:text-info border-none',
  warning: 'bg-none text-darkest_warning dark:text-warning border-none',
  success: 'bg-none text-darkest_success dark:text-success border-none',
}

const severityDefault: Record<ColorVariants, string> = {
  none: 'shadow-secondary text-secondary border-secondary',
  primary: 'shadow-secondary text-secondary border-secondary',
  secondary: 'shadow-primary text-primary border-primary',
  error: 'shadow-darkest_error text-darkest_error border-darkest_error dark:shadow-error dark:text-error dark:border-error',
  info: 'shadow-darkest_info text-darkest_info border-darkest_info dark:shadow-info dark:text-info dark:border-info',
  warning: 'shadow-darkest_warning text-darkest_warning border-darkest_warning dark:shadow-warning dark:text-warning dark:border-warning',
  success: 'shadow-darkest_success text-darkest_success border-darkest_success dark:shadow-success dark:text-success dark:border-success',
}

const iconSize = computed(() => {
  return iconSizes[props.size]
})

const textSize = computed(() => {
  return textSizes[props.size]
})

const rounded = computed(() => {
  return roundedSizes[props.rounded]
})

const severity = computed(() => {
  if (props.outlined) {
    return severityOutlined[props.severity]
  }
  if (props.text) {
    return severityText[props.severity]
  }
  return severityDefault[props.severity]
})

const background = computed(() => {
  if (props.background !== 'none' || props.outlined || props.text) {
    return backgroundColors[props.background]
  } else {
    return backgroundColors[props.severity]
  }
})

</script>