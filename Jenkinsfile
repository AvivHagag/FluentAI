pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Name of the NodeJS installation configured in Jenkins
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Student', credentialsId: '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', url: 'https://github.com/AvivHagag/FluentAI-Test.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                // Add your deployment steps here
            }
        }
    }

    post {
        always {
            junit 'reports/**/*.xml'
            archiveArtifacts 'build/**/*'
        }
    }
}
