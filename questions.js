const testQuestions = [
  {
    id: 1,
    title: "1. Spring Boot 3 & Java 21 Virtual Threads",
    description: "Write a Spring Boot 3 REST controller endpoint using Java 21 features (Record types, pattern matching) that handles high-concurrency tracking events. Explain how Virtual Threads (Project Loom) increase throughput compared to standard thread pools."
  },
  {
    id: 2,
    title: "2. Apache Kafka Message Deduplication & Idempotency",
    description: "Write a Spring `@KafkaListener` consumer snippet processing shipment events. Explain how you implement idempotency using Redis or DB unique keys to prevent duplicate event processing."
  },
  {
    id: 3,
    title: "3. Spring Security 6 & OAuth2 / JWT Protection",
    description: "Write a Spring Security configuration snippet enforcing OAuth2/JWT authentication on `/api/v1/logistics/**` routes while leaving `/actuator/health` open. Show how custom JWT claims are extracted."
  },
  {
    id: 4,
    title: "4. Database Performance & JPA N+1 Resolution",
    description: "Write a Spring Data JPA Repository JPQL query using `JOIN FETCH` or `@EntityGraph` to resolve the N+1 select problem when fetching Shipment Entities along with their LineItems."
  },
  {
    id: 5,
    title: "5. Circuit Breaker & Redis Distributed Caching",
    description: "Write code using Resilience4j `@CircuitBreaker` for a external carrier API call. Describe the fallback mechanism and how Redis is configured as a read-through cache."
  },
  {
    id: 6,
    title: "6. Kubernetes Memory Troubleshooting & Monitoring",
    description: "A Spring Boot microservice on OpenShift/Kubernetes fails with OOMKilled errors. List 3 JVM flags/settings to inspect and explain how Prometheus/Grafana metrics isolate heap vs non-heap memory leaks."
  },
  {
    id: 7,
    title: "7. Hands-on Coding: Thread-Safe Sliding Window Rate Limiter",
    description: "Implement a plain Java class `SlidingWindowRateLimiter` (without external libraries) that restricts calls to maximum N requests per M seconds per client ID using thread-safe structures."
  }
];
