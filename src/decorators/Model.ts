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
  inputEventName: string,
  propOptions?: Constructor | Constructor[] | PropOptions,
) {
  const propName = 'modelValue';
  const eventName = `update:${propName}`
  return createDecorator((componentOptions, key) => {
    componentOptions.props ||= Object.create(null)
    componentOptions.props[propName] = propOptions

    componentOptions.computed ||= Object.create(null)
    componentOptions.computed[key] = {
      get(this: any) {
        return this[propName]
      },
      set(this: Vue, newValue: any) {
        this.$emit(eventName, newValue)
      },
    }

    let self: Vue
    componentOptions.emits = Array.isArray(componentOptions.emits) 
    ? Object.fromEntries(componentOptions.emits.map(emit => [emit, null])) 
    : { [eventName]: null }
    const created = componentOptions.created 
    componentOptions.created = function (this: any) {
      created?.call(this)
      self = this
    }
    // intercept $emit, change inputEventName into update:modelValue
    componentOptions.emits[inputEventName] = function (this:any, ...payload:any) {
      self.$emit(eventName, ...payload)
      return true
    }
  })
}
