// Attempt 1: Extremely Hard Technical & Architecture Scenarios
const setAttempt1 = [
  {
    id: 1,
    title: "Question 1/5: Thread-Safe High-Throughput In-Memory Order Ring Buffer (Java 21)",
    description: `Implement a zero-dependency, low-latency concurrent ring buffer in Java 21 tailored for DHL package tracking events.
    
Requirements:
1. Support high-concurrency multi-producer multi-consumer execution using non-blocking primitives (e.g., VarHandle / AtomicReferenceArray / Lock-free algorithms).
2. Avoid synchronized blocks or coarse ReentrantLocks to minimize thread contention.
3. Handle buffer overflow with backpressure handling (Wait / Drop / Evict policies) and support Virtual Threads (Project Loom) seamlessly.`
  },
  {
    id: 2,
    title: "Question 2/5: Distributed Transaction Coordinator & Outbox Pattern (Kafka + Spring Boot 3)",
    description: `Design and write a complete Spring Boot 3 component implementing the Transactional Outbox Pattern with Apache Kafka for order processing.

Requirements:
1. Provide the JPA Entity, Outbox Publisher Service, and Kafka Consumer with Idempotent Delivery.
2. Ensure strict Exactly-Once Semantics (EOS) across DB update and Kafka event emission.
3. Handle dead-letter queues (DLQ), non-retryable exceptions, and Redis-based duplicate detection logic.`
  },
  {
    id: 3,
    title: "Question 3/5: Dynamic Rate Limiter & Token Bucket with Redis (Distributed Systems)",
    description: `Write a robust, distributed Sliding Window Counter Rate Limiter class in Java using Redis (Jedis/Lettuce) or Atomic Atomic Longs.

Requirements:
1. Support multi-tier limits (e.g., 100 req/sec per API key + 5000 req/min per Client IP).
2. Ensure atomic state mutation using Lua Scripts or CAS operations to avoid race conditions.
3. Provide full exception handling for Redis connection timeouts with local fail-open fallback.`
  },
  {
    id: 4,
    title: "Question 4/5: Zero N+1 JPA Entity Mapping & Custom Query Specification Architecture",
    description: `Write a complex Spring Data JPA Specification and Query Builder for a deeply nested Shipment domain model.

Requirements:
1. Entities: Shipment -> PackageItems (One-To-Many) -> CustomsLogs (One-To-Many) -> DriverAssignments (Many-To-One).
2. Write a single JPA Criteria Query or JPQL dynamically filtering shipments by status, location, and date range WITHOUT triggering N+1 query overhead.
3. Use EntityGraphs or JOIN FETCH strategically while maintaining paginated results.`
  },
  {
    id: 5,
    title: "Question 5/5: Reactive Custom Spring Security 6 Filter with OAuth2 / JWT Claims Validation",
    description: `Construct a low-level Spring Security 6 Custom OncePerRequestFilter that intercepts incoming REST API requests.

Requirements:
1. Decode and validate a signed JWT bearer token using RSA Public Key without Spring Security high-level auto-config.
2. Extract custom enterprise claims (\`dhl_tenant_id\`, \`roles\`, \`encryption_hash\`).
3. Inject authenticated Principal into \`SecurityContextHolder\` and reject unauthorized access with custom JSON error structures.`
  }
];

// Attempt 2: Completely New & Harder Alternate Scenario Questions
const setAttempt2 = [
  {
    id: 1,
    title: "Question 1/5: Custom Non-Blocking Lock-Free Priority Task Scheduler (Java 21)",
    description: `Design and code a custom Lock-Free Priority Scheduler using Java 21 features.

Requirements:
1. Process asynchronous logistics tasks categorized by priority (Urgent Express vs Standard).
2. Use ConcurrentSkipListMap or CAS Lock-Free Data Structures.
3. Integrate Project Loom Virtual Threads to execute 100,000 parallel worker tasks efficiently without OOM or thread starvation.`
  },
  {
    id: 2,
    title: "Question 2/5: Kafka Streams Stateful Aggregation & Windowing Engine",
    description: "Write a Kafka Streams Topology in Java processing real-time package telemetry streams.\n\nRequirements:\n1. Group incoming temperature & location telemetry by `packageId` over a 5-minute tumbling window.\n2. Detect anomalies (e.g., temperature spikes > 15°C) and aggregate metrics.\n3. Publish anomaly alerts to an output topic using custom SerDes and RocksDB state store persistence."
  },
  {
    id: 3,
    title: "Question 3/5: Distributed Resilience & Bulkhead Pattern Engine (Resilience4j + Spring 3)",
    description: `Write a production-ready Service Wrapper using Resilience4j programmatically (CircuitBreaker, RateLimiter, Bulkhead).

Requirements:
1. Wrap a remote DHL Fleet Telemetry REST endpoint.
2. Configure dynamic fallback execution, exponential backoff retry strategy, and thread-pool isolation.
3. Expose custom metrics counters to Micrometer / Prometheus.`
  },
  {
    id: 4,
    title: "Question 4/5: Multi-Tenant Schema Isolation & Hibernate Dynamic Connection Provider",
    description: `Implement Multi-Tenant Database Architecture in Spring Boot 3 using Hibernate 6.

Requirements:
1. Implement \`CurrentTenantIdentifierResolver\` and \`MultiTenantConnectionProvider\`.\n2. Resolve tenant dynamically from HTTP Request Headers (\`X-DHL-Tenant-ID\`).
3. Manage tenant-specific HikariCP connection pools safely without connection leaks.`
  },
  {
    id: 5,
    title: "Question 5/5: Distributed Lock Engine using Redis & Redlock Algorithm in Pure Java",
    description: `Construct a distributed lock implementation in Java using Redis commands (SET key value NX PX).

Requirements:
1. Handle lock acquisition, auto-expiry, and safe release using unique instance IDs and Lua scripts.
2. Prevent lock stealing where thread execution exceeds lock TTL.
3. Provide re-entrant capabilities for the same acquiring thread.`
  }
];

function getQuestionsForCurrentAttempt() {
  const attempts = parseInt(localStorage.getItem('dhl_attempts') || '1');
  return attempts > 1 ? setAttempt2 : setAttempt1;
}
