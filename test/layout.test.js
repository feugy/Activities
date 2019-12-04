const faker = require('faker')
const Layout = require('../src/layout')
const Metric = require('../src/metric')

describe('Layout root class', () => {
  afterEach(() => jest.resetAllMocks())

  it('builds layout with name and no metrics', () => {
    const name = faker.random.word()
    const locale = faker.random.locale()
    const slotNb = faker.random.number(10)
    const layout = new Layout({ name, locale, slotNb })
    expect(layout.name).toEqual(name)
    expect(layout.locale).toEqual(locale)
    expect(layout.metrics).toEqual([])
    expect(layout.slotNb).toEqual(slotNb)
  })

  describe('assignMetric', () => {
    const expectReLayout = (layout, metrics) => {
      for (const metric of metrics) {
        expect(metric.on).toHaveBeenCalledWith('change', layout.onChangedMetric)
        expect(metric.getDisplayValue).toHaveBeenCalledWith({
          locale: layout.locale
        })
      }
    }

    it('sets new metric to empty placeholder', () => {
      const idx = faker.random.number(10)
      const locale = faker.random.locale()
      const value = faker.lorem.word()
      const metric = new Metric({ value })
      metric.on = jest.fn()
      metric.getDisplayValue = jest.fn().mockReturnValue(metric.value)

      const layout = new Layout({ locale, slotNb: 10 })
      layout.assignMetric(metric, idx)
      expect(layout.metrics[idx]).toEqual(metric)
      expectReLayout(layout, [metric])
      expect(g.clear).toHaveBeenCalled()
      expect(g.drawString).toHaveBeenCalledWith(value, 30, 30 * (idx + 1))
    })

    it('unsets existing metric', () => {
      const idx = faker.random.number(10)
      const locale = faker.random.locale()
      const newValue = faker.lorem.word()
      const layout = new Layout({ locale, slotNb: 10 })
      const oldMetric = new Metric({})
      layout.assignMetric(oldMetric, idx)
      jest.clearAllMocks()

      oldMetric.removeListener = jest.fn()
      oldMetric.getDisplayValue = jest.fn().mockReturnValue(oldMetric.value)

      const newMetric = new Metric({ value: newValue })
      newMetric.on = jest.fn()
      newMetric.getDisplayValue = jest.fn().mockReturnValue(newMetric.value)

      layout.assignMetric(newMetric, idx)
      expect(layout.metrics[idx]).toEqual(newMetric)
      expectReLayout(layout, [newMetric])
      expect(oldMetric.getDisplayValue).not.toHaveBeenCalled()
      expect(oldMetric.removeListener).toHaveBeenCalledWith(
        'change',
        layout.onChangedMetric
      )
      expect(g.clear).toHaveBeenCalled()
      expect(g.drawString).toHaveBeenCalledWith(newValue, 30, 30 * (idx + 1))
    })

    it('rejects metric assigned to unsupported slot', () => {
      const locale = faker.random.locale()
      const layout = new Layout({ locale, slotNb: 3 })
      const idx = faker.random.number() + layout.slotNb
      const metric = new Metric({})
      metric.getDisplayValue = jest.fn()
      metric.on = jest.fn()
      expect(() => layout.assignMetric(metric, idx)).toThrow(
        `Unsupported slot ${idx}`
      )
      expect(() => layout.assignMetric(metric, -idx)).toThrow(
        `Unsupported slot -${idx}`
      )

      expect(g.clear).not.toHaveBeenCalled()
      expect(metric.getDisplayValue).not.toHaveBeenCalled()
      expect(metric.on).not.toHaveBeenCalled()
    })
  })
})
