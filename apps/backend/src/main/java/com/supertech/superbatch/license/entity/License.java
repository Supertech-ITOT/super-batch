package com.supertech.superbatch.license.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.supertech.superbatch.license.enums.LicensePlan;
import com.supertech.superbatch.license.enums.LicenseStatus;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private LicensePlan plan;

    @Column(nullable = false, length = 100)
    private String machineId;

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
    private LocalDateTime activatedAt;

    private LocalDateTime lastValidatedAt;

    @Column(nullable = false)
    private Integer maxClients;

    @Column(length = 20)
    private String version;
}