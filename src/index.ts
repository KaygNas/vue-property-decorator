/** vue-property-decorator MIT LICENSE copyright 2020 kaorun343 */
export { Vue } from 'vue-class-component'
export { Emit } from './decorators/Emit'
export { LegacyInjectReactive as InjectReactive} from './decorators/Inject'
export { LegacyModel as Model } from './decorators/Model'
export { Prop } from './decorators/Prop'
export { LegacyProvideReactive as ProvideReactive } from './decorators/Provide'
export { Ref } from './decorators/Ref'
export { Watch } from './decorators/Watch'

import { Options, mixins } from 'vue-class-component'

/**
 * @alias Options
 */
export const Component = Options
/** @alias mixins */
export const Mixins = mixins
