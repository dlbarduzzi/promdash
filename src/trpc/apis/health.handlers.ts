function getHealthHandler() {
  return {
    status: 200,
    message: "TRPC connection is healthy.",
  }
}

export { getHealthHandler }
