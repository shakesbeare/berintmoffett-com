FROM rust:1.73

WORKDIR /app

COPY . .

RUN cargo install cargo-leptos

EXPOSE 3002

CMD ["cargo", "leptos", "serve", "--release"]
