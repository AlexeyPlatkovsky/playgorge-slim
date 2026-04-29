# custom_playwright --- Architecture & Feature Specification (v2.0)

## Purpose

Full technical specification for an AI-driven, agnostic Playwright
framework.

Goals: - deterministic structure for AI agents - minimal but extensible
core - production-grade patterns without overengineering

------------------------------------------------------------------------

# 1. Core Concepts

## 1.1 Capability Model

All tests must be composed from capabilities, not primitives.

Examples: - authenticatedUser - apiClient - app - pageObjects

Rule: Tests must NOT directly use Playwright page/context unless inside
framework.

------------------------------------------------------------------------

## 1.2 Layered Architecture

### Core (mandatory)

framework/ core/ fixtures/ config/ assertions/ reporting/

### Optional modules

framework/api/

### Test layers

tests/ demo/ ui/ api/ factories/

------------------------------------------------------------------------

# 2. Feature Specifications

## 2.1 Capability-Based Fixtures (CORE)

Implementation: - base.fixture.ts - capability fixtures composed via
dependency injection

Example: authSession -\> apiClient -\> app -\> page

Rules: - no hidden dependencies - explicit imports - no circular chains

------------------------------------------------------------------------

## 2.2 Config System (CORE)

Implementation: - schema validation (zod or similar) - env loader -
typed access

Example: getConfig().baseUrl

Rules: - no direct process.env usage in tests - all config validated at
startup

------------------------------------------------------------------------

## 2.3 API Module (OPTIONAL)

Structure: framework/api/ baseClient.ts authClient.ts

Features: - request wrapper - retry logic - auth injection

Rules: - no domain logic inside framework - extend in project layer

------------------------------------------------------------------------

## 2.4 Hybrid Testing

Pattern: 1. create data via API 2. validate via UI

Example: user = api.createUser() ui.login(user)

------------------------------------------------------------------------

## 2.5 Test Segmentation

Folders: tests/demo tests/ui tests/api

Tags: @ui @api @e2e @smoke @critical

Rules: - demo isolated - e2e = tag only

------------------------------------------------------------------------

## 2.6 Data Factories

Location: tests/factories/

Features: - deterministic seeds - faker integration

Example: createUser({ role: "admin" })

------------------------------------------------------------------------

## 2.7 Multi-browser

Config: projects: - chromium (default) - firefox - webkit

Execution: CI flag enables full matrix

------------------------------------------------------------------------

## 2.8 Docker Support

Files: Dockerfile docker-compose (optional)

Commands: docker build docker run tests

Rules: - optional - must mirror CI

------------------------------------------------------------------------

# 3. Demo (RealWorld)

Requirements: - auth - articles CRUD - comments

Flows: API create -\> UI validate

------------------------------------------------------------------------

# 4. AI Rules

-   always use capabilities
-   never bypass framework
-   detect optional modules
-   prefer API setup over UI

------------------------------------------------------------------------

# 5. Implementation Plan

Phase 1: - fixtures - config - base structure

Phase 2: - demo tests - segmentation

Phase 3: - API module - factories

Phase 4: - docker - CI

------------------------------------------------------------------------

# 6. Non-goals

-   no heavy abstractions
-   no enterprise overdesign
-   no hidden magic

------------------------------------------------------------------------

# 7. Philosophy

"Strict core, flexible edges"
