package com.supertech.superbatch.common.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ApiResponse<T> {
        private String timestamp;
        private String message;
        private boolean success;
        private int status;
        private T data;

        public static <T> ApiResponse<T> success(String msg, T data) {
                return ApiResponse.<T>builder()
                                .timestamp(LocalDateTime.now().toString())
                                .success(true)
                                .message(msg)
                                .status(200)
                                .data(data)
                                .build();
        }

        public static <T> ApiResponse<T> error(String msg, T data, int status) {
                return ApiResponse.<T>builder()
                                .timestamp(LocalDateTime.now().toString())
                                .success(false)
                                .message(msg)
                                .status(status)
                                .data(data)
                                .build();
        }

}