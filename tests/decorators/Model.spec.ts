import { mount, VueWrapper } from '@vue/test-utils'
import { h } from 'vue'
import { Vue } from 'vue-class-component'
import { Model, LegacyModel } from '../../src/decorators/Model'

describe(Model, () => {
  class ChildComponent extends Vue {
    @Model('modelValue', String) value!: string

    render() {
      return h('div')
    }
  }

  const INITIAL_VALUE = 'INITIAL VALUE'

  class ParentComponent extends Vue {
    myValue = INITIAL_VALUE

    $refs!: {
      child: ChildComponent
    }

    render() {
      return h(ChildComponent, {
        modelValue: this.myValue,
        [`onUpdate:modelValue`]: (v: string) => (this.myValue = v),
        ref: 'child',
      })
    }
  }

  let wrapper: VueWrapper<ParentComponent>
  let child: ChildComponent

  beforeEach(() => {
    wrapper = mount(ParentComponent)
    child = wrapper.vm.$refs.child
  })

  it('receives prop value from parent', () => {
    expect(child.value).toBe(INITIAL_VALUE)
  })

  it('emits change event to parent', () => {
    const UPDATED_VALUE = 'UPDATED VALUE'
    child.value = UPDATED_VALUE
    expect(wrapper.vm.myValue).toBe(UPDATED_VALUE)
  })
})

describe(LegacyModel, () => {
  const LEGACY_EVENT_NAME = 'EVENT_NAME'
  const CREATED_VALUE = 'CREATED VALUE'
  class ChildComponent extends Vue {
    @LegacyModel(LEGACY_EVENT_NAME, String) value!: string
    createdValue: string | undefined
    created() {
      this.createdValue = CREATED_VALUE
    }

    render() {
      return h('div')
    }
  }

  const INITIAL_VALUE = 'INITIAL VALUE'

  class ParentComponent extends Vue {
    myValue = INITIAL_VALUE

    $refs!: {
      child: ChildComponent
    }

    render() {
      return h(ChildComponent, {
        modelValue: this.myValue,
        [`onUpdate:modelValue`]: (v: string) => (this.myValue = v),
        ref: 'child',
      })
    }
  }

  let wrapper: VueWrapper<ParentComponent>
  let child: ChildComponent

  beforeEach(() => {
    wrapper = mount(ParentComponent)
    child = wrapper.vm.$refs.child
  })

  it('should not break user created option', () => {
    expect(child.createdValue).toBe(CREATED_VALUE)
  })

  it('receives prop value from parent', () => {
    expect(child.value).toBe(INITIAL_VALUE)
  })

  it('emits change event to parent', () => {
    const UPDATED_VALUE = 'UPDATED VALUE'
    child.value = UPDATED_VALUE
    expect(wrapper.vm.myValue).toBe(UPDATED_VALUE)
  })

  it('manually emits change event to parent', () => {
    const UPDATED_VALUE = 'MANUALLY UPDATED VALUE'
    child.$emit(LEGACY_EVENT_NAME, UPDATED_VALUE, UPDATED_VALUE)
    expect(wrapper.vm.myValue).toBe(UPDATED_VALUE)
  })
})