package com.supertech.superbatch.common.util;

public class EnumUtil {

    public static String formatLabel(String text) {
        return text.charAt(0)
                + text.substring(1)
                        .toLowerCase()
                        .replace("_", " ");
    }
}