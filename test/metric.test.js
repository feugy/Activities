const faker = require('faker')
const Metric = require('../src/metric')

describe('Metric root class', () => {
  it('builds metrics with name and initial value', () => {
    const name = faker.random.word()
    const value = faker.random.number()
    const metric = new Metric({ name, value })
    expect(metric.name).toEqual(name)
    expect(metric.value).toEqual(value)
  })

  it('builds metrics with name and default value', () => {
    const name = faker.random.word()
    const metric = new Metric({ name })
    expect(metric.name).toEqual(name)
    expect(metric.value).toBeNull()
  })

  describe('getDisplayValue', () => {
    it('returns default string', () => {
      expect(new Metric({}).getDisplayValue()).toEqual('--')
    })

    it('returns stringified value', () => {
      const value = faker.random.number()
      expect(new Metric({ value }).getDisplayValue()).toEqual(value.toString())
    })

    it('handles 0', () => {
      expect(new Metric({ value: 0 }).getDisplayValue()).toEqual('0')
    })

    it('handles false', () => {
      expect(new Metric({ value: false }).getDisplayValue()).toEqual('Off')
    })

    it('handles true', () => {
      expect(new Metric({ value: true }).getDisplayValue()).toEqual('On')
    })
  })

  describe('setValue', () => {
    it('changes value and fire event', done => {
      const oldValue = faker.random.number()
      const newValue = faker.random.number({ min: oldValue + 1 })
      const metric = new Metric({ name: 'test', value: oldValue })
      metric.on('change', args => {
        expect(metric.value).toEqual(newValue)
        expect(args).toEqual({ metric, oldValue })
        done()
      })

      metric.setValue(newValue)
    })
  })
})
