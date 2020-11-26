import { jest } from "@jest/globals";
import { SageGenericsType } from '../symbols.ts'
import * as logger from '../utils/logger.ts'

jest.mock('../localStorage')
const { LocalObjectStorage } = await import('../LocalObjectStorage.ts');


expect.addSnapshotSerializer({
  test: obj => obj && obj[SageGenericsType] === LocalObjectStorage.name,
  serialize: (value: ReturnType<typeof LocalObjectStorage>) =>
    [`key=${value.key}`, JSON.stringify(value.get(), null, 2)].join('\n'),
})

describe(LocalObjectStorage.name, () => {
  it('Storage setting and getting', () => {
    const storage = LocalObjectStorage('WoahKey', { a: 1, foo: 'bar' })

    expect(storage).toMatchInlineSnapshot(`
      key=SAGE-GENERICS-LOCAL-OBJECT-STORAGE.WoahKey
      {
        "a": 1,
        "foo": "bar"
      }
    `)

    storage.set({ a: 3, foo: 'yo' })
    expect(storage).toMatchInlineSnapshot(`
      key=SAGE-GENERICS-LOCAL-OBJECT-STORAGE.WoahKey
      {
        "a": 3,
        "foo": "yo"
      }
    `)

    storage.set(lastStorage => ({
      ...lastStorage,
      foo: 'Updated, but a is the same yo',
    }))
    expect(storage).toMatchInlineSnapshot(`
      key=SAGE-GENERICS-LOCAL-OBJECT-STORAGE.WoahKey
      {
        "a": 3,
        "foo": "Updated, but a is the same yo"
      }
    `)

    storage.clear()
    expect(storage).toMatchInlineSnapshot(`
      key=SAGE-GENERICS-LOCAL-OBJECT-STORAGE.WoahKey
      {
        "a": 1,
        "foo": "bar"
      }
    `)
  })
  test('set should log an error and not update state if provided value is not an object', () => {
    const storage = LocalObjectStorage('OtherKey', { a: 'b' })
    // @ts-expect-error
    storage.set('')
    // @ts-expect-error
    expect(logger.warn.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "LocalObjectStorage.set(key, value) Expected value to be an object or a function",
        ],
      ]
    `)
    expect(storage).toMatchInlineSnapshot(`
      key=SAGE-GENERICS-LOCAL-OBJECT-STORAGE.OtherKey
      {
        "a": "b"
      }
    `)
  })
})
