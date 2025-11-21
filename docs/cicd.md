# Introduction

This project demonstrates a complete CI/CD setup built around GitHub Actions. The pipeline ensures reliable testing, preview environments, and production deployment.

# CI/CD Pipeline Stages

1. Pull Request Workflow

    - Install dependencies
    - Run ESLint
    - Run Jest unit tests with coverage
    - Build the project
    - Deploy a temporary Firebase Hosting preview channel
    - Run Playwright E2E tests against the preview environment
    - Publish Playwright reports as build artifacts

2. Production Deployment Workflow
Triggered on pushes to main:
    - Install dependencies
    - Lint and test
    - Upload coverage to Codecov
    - Build production output
    - Deploy to Firebase Hosting
    - Run Playwright tests against production
    - Publish reports and documentation to GitHub Pages

3. Scheduled Dependency Updates
Dependabot runs weekly to update direct dependencies except major versions.

# Goals of the Pipeline

- Prevent merging untested code
- Provide preview environments for every pull request
- Automatically validate UI behavior with E2E tests
- Produce transparent build artifacts and reports
- Enforce code quality with linting and formatting

# Diagram
```plantuml
@startuml
title CI/CD Pipeline Overview

actor Developer

Developer -> GitHub : Push / Pull Request

' PR Pipeline
GitHub -> "GitHub Actions\nPR Workflow" : Trigger
"GitHub Actions\nPR Workflow" -> Node : Install deps
"GitHub Actions\nPR Workflow" -> ESLint : Run lint
"GitHub Actions\nPR Workflow" -> Jest : Run unit tests
"GitHub Actions\nPR Workflow" -> Vite : Build application
"GitHub Actions\nPR Workflow" -> Firebase : Deploy Preview Channel
"GitHub Actions\nPR Workflow" -> Playwright : Run E2E tests\nagainst Preview
Playwright --> "GitHub Actions\nPR Workflow" : Upload HTML report

' Merge to Main
Developer -> GitHub : Merge to main branch

' Production Pipeline
GitHub -> "GitHub Actions\nProd Workflow" : Trigger
"GitHub Actions\nProd Workflow" -> Node : Install deps
"GitHub Actions\nProd Workflow" -> ESLint : Run lint
"GitHub Actions\nProd Workflow" -> Jest : Run tests with coverage
"GitHub Actions\nProd Workflow" -> Codecov : Upload coverage
"GitHub Actions\nProd Workflow" -> Vite : Build production output
"GitHub Actions\nProd Workflow" -> Firebase : Deploy Production
"GitHub Actions\nProd Workflow" -> Playwright : Run E2E tests\nagainst Production
"GitHub Actions\nProd Workflow" -> GitHubPages : Publish Playwright reports

' Dependabot
"Dependabot" -> GitHub : Weekly dependency update PR

@enduml
```