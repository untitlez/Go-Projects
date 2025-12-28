FROM golang:1.25.4-alpine AS builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
RUN apk add --no-cache tzdata

COPY . .
RUN go build -o user_service ./cmd/main.go

# ======================================== #

FROM alpine
WORKDIR /app

COPY --from=builder /app/user_service .
COPY --from=builder /app/config ./config

RUN apk add --no-cache ca-certificates tzdata

EXPOSE 8001

CMD ["./user_service"]
