import tracer from 'dd-trace'

// Init DD
tracer.init({
  analytics: true,
  service: process.env.DD_SERVICE_NAME,
  runtimeMetrics: true,
})

tracer.use('graphql', {
  analytics: true,
  service: `${process.env.DD_SERVICE_NAME}-graphql`,
})

tracer.use('http', {
  analytics: true,
  service: process.env.DD_SERVICE_NAME,
})

tracer.use('net', { enabled: false })
tracer.use('fs', { enabled: false })
tracer.use('dns', { enabled: false })