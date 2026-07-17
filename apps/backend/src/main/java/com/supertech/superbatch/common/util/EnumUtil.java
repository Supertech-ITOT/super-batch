package com.supertech.superbatch.common.util;

import java.util.Arrays;
import java.util.stream.Collectors;

public class EnumUtil {

    public static String formatLabel(String text) {

        if (text == null || text.isBlank()) {
            return null;
        }

        return Arrays.stream(text.toLowerCase().split("_"))
                .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1))
                .collect(Collectors.joining(" "));
    }
}