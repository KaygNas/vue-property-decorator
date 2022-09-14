import {
  createDecorator,
  PropOptions,
  Vue,
  VueDecorator,
} from 'vue-class-component'

type Constructor = (new () => any) | SymbolConstructor

/**
 * Decorator for v-model
 * @param propName e.g. `modelValue`
 * @param propOptions the options for the prop
 */
export function Model(
  propName: string,
  propOptions?: Constructor | Constructor[] | PropOptions,
): VueDecorator {
  return createDecorator((componentOptions, key) => {
    const eventName = `update:${propName}`
    componentOptions.props ||= Object.create(null)
    componentOptions.props[propName] = propOptions
    componentOptions.emits ||= []
    componentOptions.emits.push(eventName)
    componentOptions.computed ||= Object.create(null)
    componentOptions.computed[key] = {
      get(this: any) {
        return this[propName]
      },
      set(this: Vue, newValue: any) {
        this.$emit(eventName, newValue)
      },
    }
  })
}

/**
 * @deprecated
 *
 * Decorator for v-model having same behaviour in Vue2
 * @param event will be ignore and always be 'update:modelValue' as vue3 specify.
 * @param propOptions the options for the prop
 */
export function LegacyModel(
  event: string,
  propOptions?: Constructor | Constructor[] | PropOptions,
) {
  return Model('modelValue', propOptions)
}
