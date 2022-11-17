import { createDecorator, Vue, VueDecorator } from 'vue-class-component'

/**
 * decorator of a ref prop
 * @param refKey the ref key defined in template
 */
export function Ref(refKey?: string): VueDecorator {
  return createDecorator((componentOptions, key) => {
    // some hacky trick to force componentOptions.computed[key]
    // compute every time component updated
    const refSymbol = {
      symbol: Symbol(refKey || key),
      get: (vm: any) => vm[refSymbol.symbol],
      set: (vm: any) => vm[refSymbol.symbol] = Symbol(refKey || key)
    }

    const createData = componentOptions.data ?? (() => ({}))
    componentOptions.data = function () {
      const data = createData.call(this, this)
      refSymbol.set(data)
      return data
    }

    const created = componentOptions.created
    componentOptions.created = function () {
      created?.call(this)
      refSymbol.get(this)
    }

    const beforeUpdate = componentOptions.beforeUpdate
    componentOptions.beforeUpdate = function () {
      beforeUpdate?.call(this)
      refSymbol.set(this)
    }

    componentOptions.computed ||= Object.create(null)
    componentOptions.computed[key] = {
      cache: false,
      get(this: Vue) {
        refSymbol.get(this)
        return this.$refs[refKey || key]
      },
    }
  })
}
