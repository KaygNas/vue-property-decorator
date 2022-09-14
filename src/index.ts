/** vue-property-decorator MIT LICENSE copyright 2020 kaorun343 */
export { mixins, Options, Vue } from 'vue-class-component'
export { Emit } from './decorators/Emit'
export { Inject, LegacyInjectReactive } from './decorators/Inject'
export { Model, LegacyModel } from './decorators/Model'
export { Prop } from './decorators/Prop'
export { Provide, LegacyProvideReactive } from './decorators/Provide'
export { Ref } from './decorators/Ref'
export { Watch } from './decorators/Watch'

/**
 * TODO: 完全兼容上个版本的实现 https://github.com/kaorun343/vue-property-decorator
 * - @Prop ✅
 * - @PropSync
 * - @Model -> @LegacyModel ✅
 * - @ModelSync
 * - @Watch ✅
 * - @Provide
 * - @Inject
 * - @ProvideReactive -> @LegacyProvideReactive ✅
 * - @InjectReactive -> @LegacyInjectReactive ✅
 * - @Emit
 * - @Ref ✅
 * - @VModel
 * - @Component ✅
 * - Mixins
 */

import { Options, mixins } from 'vue-class-component'
/** @alias Options */
export const Component = Options
/** @alias mixins */
export const Mixins = mixins
