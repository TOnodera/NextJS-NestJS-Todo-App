FROM node:22-bookworm

RUN apt-get update -y \
    && apt-get install -y git vim locales tzdata \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# TZ設定
RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# ロケール設定
RUN sed -i -e 's/# \(ja_JP.UTF-8\)/\1/' /etc/locale.gen \
    && locale-gen \
    && update-locale LANG=ja_JP.UTF-8
WORKDIR /workspaces/nextjs
USER node
