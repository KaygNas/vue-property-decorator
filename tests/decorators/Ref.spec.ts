import { mount, VueWrapper, flushPromises } from '@vue/test-utils'
import { h } from 'vue'
import { Vue } from 'vue-class-component'
import { Ref } from '../../src/decorators/Ref'

describe(Ref, () => {
  describe('without refKey', () => {
    const KEY = 'KEY'
    class MyComponent extends Vue {
      @Ref()
      [KEY]!: HTMLDivElement

      render() {
        return h('div', { ref: KEY }, 'THIS-IS-MY-REF-OBJECT')
      }
    }

    let wrapper: VueWrapper<MyComponent>

    beforeEach(() => {
      wrapper = mount(MyComponent)
    })

    it('returns ref object', () => {
      expect(wrapper.vm[KEY]).toMatchInlineSnapshot(`
        <div>
          THIS-IS-MY-REF-OBJECT
        </div>
      `)
    })
  })

  describe('with refKey', () => {
    const REF_KEY = 'REF_KEY'
    const KEY = 'KEY'
    class MyComponent extends Vue {
      @Ref(REF_KEY)
      [KEY]!: HTMLDivElement

      render() {
        return h('div', { ref: REF_KEY }, 'THIS-IS-MY-REF-OBJECT')
      }
    }

    let wrapper: VueWrapper<MyComponent>

    beforeEach(() => {
      wrapper = mount(MyComponent)
    })

    it('returns ref object', () => {
      expect(wrapper.vm[KEY]).toMatchInlineSnapshot(`
        <div>
          THIS-IS-MY-REF-OBJECT
        </div>
      `)
    })
  })

  describe('reactive ref when conditional rendering', () => {
    const KEY = 'KEY'

    class MyComponent extends Vue {
      @Ref() [KEY]!: HTMLDivElement
      visible = false


      async mounted() {
        await waitUntil(100)
        this.visible = true
      }


      render() {
        const { visible } = this
        return visible ? h('div', { ref: KEY }, 'THIS-IS-MY-REF-OBJECT') : undefined
      }
    }

    let wrapper: VueWrapper<MyComponent>

    beforeEach(() => {
      wrapper = mount(MyComponent)
    })

    it('returns ref object reactivly', async () => {
      expect(wrapper.vm.visible).toBe(false)
      expect(wrapper.vm[KEY]).toBeUndefined()

      await waitUntil(100)
      await flushPromises()

      expect(wrapper.vm.visible).toBe(true)
      expect(wrapper.vm[KEY]).toMatchInlineSnapshot(`
      <div>
        THIS-IS-MY-REF-OBJECT
      </div>
    `)

    })
  })
})


function waitUntil(time: number) {
  return new Promise((resovle, reject) => {
    setTimeout(resovle, time)
  })
}