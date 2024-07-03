pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Name of the NodeJS installation configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Student', credentialsId: '1', url: 'https://github.com/AvivHagag/FluentAI-Test.git'
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
