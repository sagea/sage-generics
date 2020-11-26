import { safeParse } from '../json.ts'

describe(safeParse.name, () => {
  it('should parse a json sring', () => {
    expect(safeParse(`{}`)).toMatchInlineSnapshot(`Object {}`)
    expect(safeParse(`{"hello":"yo","foo":{"bar":123}}`))
      .toMatchInlineSnapshot(`
      Object {
        "foo": Object {
          "bar": 123,
        },
        "hello": "yo",
      }
    `)
  })
  it('should return null if provided string is not parseable', () => {
    expect(safeParse('{')).toEqual(null)
  })
})
