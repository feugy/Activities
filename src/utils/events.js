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
            layout.draw()
          }
        }
        service.on('change', binding.listener)
        bindings.push(binding)
      }
    })
  })
  return bindings
}

export function unregister(bindings) {
  bindings.forEach(function({ service, listener }) {
    service.removeListener('change', listener)
  })
}
