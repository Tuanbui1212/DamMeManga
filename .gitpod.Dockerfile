# Base image Gitpod có sẵn nhiều công cụ dev
FROM gitpod/workspace-full

# Cài JDK 21
RUN sudo apt update && \
    sudo apt install -y wget tar && \
    wget https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.9%2B10/OpenJDK21U-jdk_x64_linux_hotspot_21.0.9_10.tar.gz && \
    sudo mkdir -p /usr/lib/jvm && \
    sudo tar -xvf OpenJDK21U-jdk_x64_linux_hotspot_21.0.9_10.tar.gz -C /usr/lib/jvm/ && \
    rm OpenJDK21U-jdk_x64_linux_hotspot_21.0.9_10.tar.gz

# Thiết lập JAVA_HOME và PATH
ENV JAVA_HOME=/usr/lib/jvm/jdk-21.0.9+10
ENV PATH=$JAVA_HOME/bin:$PATH

# Cài Maven nếu chưa có
RUN sudo apt install -y maven
