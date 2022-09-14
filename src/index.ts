/** vue-property-decorator MIT LICENSE copyright 2020 kaorun343 */
export { mixins, Options, Vue } from 'vue-class-component'
export { Emit } from './decorators/Emit'
export { Inject, LegacyInjectReactive } from './decorators/Inject'
export { Model, LegacyModel } from './decorators/Model'
export { Prop } from './decorators/Prop'
export { Provide, LegacyProvideReactive } from './decorators/Provide'
export { Ref } from './decorators/Ref'
export { Watch } from './decorators/Watch'

import { Options, mixins } from 'vue-class-component'

/**
 * @alias Options
 */
export const Component = Options
/** @alias mixins */
export const Mixins = mixins
