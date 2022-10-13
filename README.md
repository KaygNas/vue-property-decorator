# Vue Property Decorator

This library fully depends on [vue-class-component](https://github.com/vuejs/vue-class-component), so please read its README before using this library.

This repository is fork from [kaorun343/vue-property-decorator](https://github.com/kaorun343/vue-property-decorator).

## Dependencies

- [Vue](https://github.com/vuejs/vue)
- [vue-class-component](https://github.com/vuejs/vue-class-component)

## Backward Compatible
Since `vue-property-decorator@10.0.0-rc.1` has multiple breaking change, in order to make migration from vue2 to vue3 more smoothly, some of API in `^9.0.0` are left untouched in this repo, it would make migration easier.

Here's the list:
(Those with ✅ behind mean they work the same as the previous version.)

- @Prop ✅
- <s>@PropSync</s>
- @Model ✅
- <s>@ModelSync</s>
- @Watch ✅
- @ProvideReactive ✅
- @InjectReactive ✅
- @Emit ✅
- @Ref ✅
- @Component ✅
- Mixins ✅

## Attention

- This forking is trying to help project using vue2 migrate to vue3.
- Since the next version of `vue-class-component` stayed rc for over two years, it's recommended not to depend on `vue-property-decorator` for further coding.
- This forking might not be maintain for anymore.

## Installation

```bash
$ npm install --save kaygnas-vue-property-decorator
# or
$ yarn add kaygnas-vue-property-decorator
```

## Usage

for usage, please check [kaorun343/vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

## License

MIT
