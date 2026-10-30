pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Getting code from GitHub'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies'
            }
        }

        stage('Install Playwright') {
            steps {
                echo 'Installing Playwright browsers'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Executing Cucumber tests'
            }
        }

        stage('Allure Report') {
            steps {
                echo 'Generating Allure report'
            }
        }
    }
}
