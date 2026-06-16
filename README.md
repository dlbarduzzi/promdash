# Promdash

A centralized alert management platform that enables teams to efficiently manage Prometheus alerts across multiple clusters.

## Getting Started

Create a `.env` file at the root of your project similar to [.env.example](.env.example).

Initialize database and apply migrations:

```sh
# Replace command with your container management tool (i.e. docker, podman)
podman-compose -f docker-compose.yaml up -d

# Apply migration
npm run db:migrate
```

Run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

[MIT](./LICENSE)
