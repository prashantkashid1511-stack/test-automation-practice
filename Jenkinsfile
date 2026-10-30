
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

        stage('Run Automation Tests') {
            steps {
                bat 'npm test -- --format summary'
            }
        }

    } // End of stages

    post {
        always {
            allure includeProperties: false,
                   jdk: '',
                   results: [[path: 'allure-results']]
        }
    }

} // End of pipeline
