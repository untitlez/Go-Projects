FROM golang:1.25.4-alpine AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
RUN apk add --no-cache tzdata

COPY . .
RUN go build -o profile_service ./cmd/main.go

# ======================================== #

FROM alpine
WORKDIR /app

COPY --from=builder /app/profile_service .
COPY --from=builder /app/config ./config

RUN apk add --no-cache ca-certificates tzdata

EXPOSE 8002

CMD ["./profile_service"]
