import { jest } from "@jest/globals";
import { SetStateManager } from '../SetStateManager.ts'

describe(SetStateManager.name, () => {
  it('should return default state initially', () => {
    const store = SetStateManager({ foo: 'bar' })
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "foo": "bar",
      }
    `)
  })
  it('should update state', () => {
    const store = SetStateManager({ foo: 'bar' })
    store.setState(prevState => {
      return {
        ...prevState,
        foo: 'yoyoyo',
      }
    })
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "foo": "yoyoyo",
      }
    `)
  })
  it('should emit a change event on state change', () => {
    const callback = jest.fn()
    const store = SetStateManager({ foo: 'bar' })
    store.onChange(callback)
    expect(callback).not.toHaveBeenCalled()
    store.setState(() => ({ foo: 'woah' }))
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
