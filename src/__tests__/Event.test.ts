import { Event } from '../Event'
describe(Event.name, () => {
  it('should add listeners and call them when emitted', () => {
    const cb1 = jest.fn()
    const cb2 = jest.fn()
    const cb3 = jest.fn()
    const event = Event<any>()
    event.on(cb1)
    event.on(cb2)
    event.on(cb3)
    expect(cb1).toHaveBeenCalledTimes(0)
    expect(cb2).toHaveBeenCalledTimes(0)
    expect(cb3).toHaveBeenCalledTimes(0)
    event.emit('hello')
    expect(cb1).toHaveBeenCalledTimes(1)
    expect(cb2).toHaveBeenCalledTimes(1)
    expect(cb3).toHaveBeenCalledTimes(1)
  })
  it('should remove listeners if off is called or the return function from on', () => {
    const cb1 = jest.fn()
    const cb2 = jest.fn()
    const event = Event<any>()
    event.on(cb1)
    const killEvent = event.on(cb2)
    event.emit('Call1')
    expect(cb1).toHaveBeenCalledTimes(1)
    expect(cb1).toHaveBeenCalledWith('Call1')
    expect(cb2).toHaveBeenCalledTimes(1)
    expect(cb2).toHaveBeenCalledWith('Call1')
    event.off(cb1)
    event.emit('Call2')

    expect(cb1).toHaveBeenCalledTimes(1)
    expect(cb1).not.toHaveBeenCalledWith('Call2')
    expect(cb2).toHaveBeenCalledTimes(2)
    expect(cb2).toHaveBeenCalledWith('Call2')

    killEvent()

    event.emit('Call3')

    expect(cb1).toHaveBeenCalledTimes(1)
    expect(cb1).not.toHaveBeenCalledWith('Call3')
    expect(cb2).toHaveBeenCalledTimes(2)
    expect(cb2).not.toHaveBeenCalledWith('Call3')
  })
  it('should remove all listeners if clear is called', () => {
    const cb1 = jest.fn()
    const cb2 = jest.fn()
    const cb3 = jest.fn()
    const event = Event<any>()
    event.on(cb1)
    event.on(cb2)
    event.on(cb3)
    event.emit('hello')
    expect(cb1).toHaveBeenCalledTimes(1)
    expect(cb2).toHaveBeenCalledTimes(1)
    expect(cb3).toHaveBeenCalledTimes(1)
    event.clear()
    event.emit('hello')
    expect(cb1).toHaveBeenCalledTimes(1)
    expect(cb2).toHaveBeenCalledTimes(1)
    expect(cb3).toHaveBeenCalledTimes(1)
  })
  it('should emit any kind of event', () => {
    const cb = jest.fn()
    const event = Event<any>()
    event.on(cb)
    // @ts-expect-error
    event.emit()
    expect(cb).toHaveBeenCalledWith()
    event.emit('')
    expect(cb).toHaveBeenCalledWith('')
    event.emit({})
    expect(cb).toHaveBeenCalledWith({})
    event.emit([])
    expect(cb).toHaveBeenCalledWith([])
  })
  it('should only emit the first argument', () => {
    const cb = jest.fn()
    const event = Event<any>()
    event.on(cb)
    // @ts-expect-error
    event.emit('a', 'b', 'c')
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith('a')
  })
  it('SAFEGUARD: when emit is called without any callbacks', () => {
    const event = Event<any>()
    event.emit({})
  })

  it('SAFEGUARD: when on is called without a callback', () => {
    const event = Event<any>()
    // @ts-expect-error
    expect(() => event.on('invalid yo')).not.toThrow()
    // @ts-expect-error
    expect(() => event.on()).not.toThrow()
  })
  it('SAFEGUARD: when on is called without a callback and the return value is called', () => {
    const event = Event<any>()
    // @ts-expect-error
    const killEvent = event.on('invalid yo')
    expect(() => killEvent()).not.toThrow()
  })
  it('SAFEGUARD: when off is called with an unknown function', () => {
    const event = Event<any>()
    expect(() => event.off(() => {})).not.toThrow()
  })
  it('SAFEGUARD: when off is called without a callback', () => {
    const event = Event<any>()
    // @ts-expect-error
    expect(() => event.off('invalid callback')).not.toThrow()
    // @ts-expect-error
    expect(() => event.off()).not.toThrow()
  })
})
