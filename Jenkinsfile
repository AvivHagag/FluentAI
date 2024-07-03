pipeline {
    agent any

    tools {
        nodejs "nodejs" // Make sure this matches the name of the NodeJS installation configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Jenkins', credentialsId: '1', url: 'https://github.com/AvivHagag/FluentAI-Test.git'
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

       
    }

    post {
        always {
            junit 'reports/**/*.xml'
            archiveArtifacts 'build/**/*'
        }
    }
}