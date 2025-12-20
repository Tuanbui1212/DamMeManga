package org.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Run {

    public static void main(String[] args) {
        SpringApplication.run(Run.class, args);
        System.out.println("Server is running...");

        Runtime runtime = Runtime.getRuntime();

        long max = runtime.maxMemory();       // RAM tối đa JVM cho phép
        long total = runtime.totalMemory();   // RAM JVM đã cấp phát
        long free = runtime.freeMemory();     // RAM còn trống
        long used = total - free;             // RAM đang dùng

        System.out.println("===== JVM MEMORY =====");
        System.out.println("Max Memory  : " + max / 1024 / 1024 + " MB");
        System.out.println("Total Memory: " + total / 1024 / 1024 + " MB");
        System.out.println("Used Memory : " + used / 1024 / 1024 + " MB");
    }
}
