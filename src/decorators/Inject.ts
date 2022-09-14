import { inject, InjectionKey } from 'vue'
import { createDecorator, VueDecorator } from 'vue-class-component'

export type InjectOptions = {
  from?: string | InjectionKey<any>
  default?: any
}

/**
 * Decorator for inject options
 * @param options the options for the injected value
 */
export function Inject(
  options: InjectOptions = Object.create(null),
): VueDecorator {
  return createDecorator((componentOptions, key) => {
    const originalSetup = componentOptions.setup
    componentOptions.setup = (props, ctx) => {
      const result = originalSetup?.(props, ctx)
      const injectedValue = inject(options.from || key, options.default)
      return {
        ...result,
        [key]: injectedValue,
      }
    }
  })
}

/**
 * @deprecated - use Inject({from: 'key', default: 'default'}) instead
 * Decorator for legacy InjectReactive
 */
export function LegacyInjectReactive(
  keyOrOptions: InjectOptions | InjectOptions['from'],
) {
  if (
    typeof keyOrOptions === 'string' ||
    typeof keyOrOptions === 'undefined' ||
    typeof keyOrOptions === 'symbol' ||
    keyOrOptions instanceof Symbol
  ) {
    return Inject({ from: keyOrOptions })
  } else {
    return Inject(keyOrOptions)
  }
}
