package com.supertech.superbatch.manager.license.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.supertech.superbatch.manager.license.enums.LicenseStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "license")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class License {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String licenseKey;

    @Column(nullable = false, unique = true, length = 100)
    private String licenseNumber;

    @Column(nullable = false, length = 100)
    private String machineFingerprint;

    @Column(nullable = false, length = 255)
    private String customerEmail;

    @Column(nullable = false, length = 100)
    private String customerName;

    @Column(nullable = false, length = 100)
    private String companyName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private LicenseStatus status;

    @Column(nullable = false)
    private LocalDate expiryDate;

    @Column(nullable = false)
    private LocalDate activationDate;

    @Column
    private LocalDateTime lastValidatedAt;

    @Column(nullable = false)
    private Integer userCount;

    @Column(nullable = false)
    private Long planId;

    @Column(nullable = false, length = 100)
    private String planName;

    @Column(length = 255)
    private String planDescription;

    @Column(nullable = false)
    private Integer planMaxUser;
}