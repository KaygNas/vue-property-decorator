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
  const modelValuePropName = 'modelValue'
  const modelValueEventName = `update:${modelValuePropName}`

  if (inputEventName === modelValueEventName) {
    return Model(modelValuePropName, propOptions)
  } else {
    return createDecorator((componentOptions, key) => {
      componentOptions.props ||= Object.create(null)
      componentOptions.props[modelValuePropName] = propOptions

      componentOptions.computed ||= Object.create(null)
      componentOptions.computed[key] = {
        get(this: any) {
          return this[modelValuePropName]
        },
        set(this: Vue, newValue: any) {
          this.$emit(modelValueEventName, newValue)
        },
      }

      componentOptions.emits ||= []
      componentOptions.emits.push(
        ...[inputEventName, modelValueEventName].filter(
          (event) => !componentOptions.emits.includes(event),
        ),
      )

      // DANGER: trap $emit function and emit modelValueEvent as long as inputEvent emit;
      let self: any
      const beforeCreate = componentOptions.beforeCreate
      componentOptions.beforeCreate = function (this: any) {
        beforeCreate?.call(this)
        self = this
        const emit = self._.emit
        self._.emit = (event: string, ...args: any[]) => {
          if (event === inputEventName) {
            emit(modelValueEventName, ...args)
          }
          return emit(event, ...args)
        }
      }
    })
  }
}
