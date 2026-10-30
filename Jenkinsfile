
pipeline {
    agent any

    environment {
        BASE_URL = 'https://testautomationpractice.blogspot.com/'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Code downloaded from GitHub'
            }
        }

        stage('Check Node and npm') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Check Feature Files') {
            steps {
                bat 'dir src\\features'
                bat 'dir src\\step-definitions'
            }
        }

        stage('Clean Old Allure Results') {
            steps {
                bat 'if exist allure-results rmdir /s /q allure-results'
            }
        }

        stage('Run Automation Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Verify Allure Results') {
            steps {
                bat 'dir allure-results'
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('allure-results')) {
                    allure includeProperties: false,
                           jdk: '',
                           results: [[path: 'allure-results']]
                } else {
                    echo 'Allure results folder not found. Skipping report generation.'
                }
            }
        }
    }
}
