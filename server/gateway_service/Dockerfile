FROM golang:1.25.4-alpine AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o gateway_service ./cmd/main.go

# ======================================== #

FROM alpine
WORKDIR /app

COPY --from=builder /app/gateway_service .
COPY --from=builder /app/config ./config

CMD ["./gateway_service"]
