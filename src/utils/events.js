export function register(metrics, layout) {
  const bindings = []
  metrics.forEach(function(metric) {
    if (!metric) {
      return
    }
    metric.deps.forEach(function(service) {
      let binding = bindings.find(b => b.service === service)
      if (!binding) {
        binding = {
          service,
          listener() {
            binding.metrics.forEach(metric => metric.refresh())
            layout.draw()
          },
          metrics: []
        }
        service.on('change', binding.listener)
        bindings.push(binding)
      }
      binding.metrics.push(metric)
    })
  })
  return bindings
}

export function unregister(bindings) {
  bindings.forEach(function({ service, listener }) {
    service.removeListener('change', listener)
  })
}
