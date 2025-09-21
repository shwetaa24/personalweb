pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/shwetaa24/personalweb', branch: 'main', credentialsId: 'github-creds'
            }
        }
        stage('Build') {
            steps {
                echo 'No build required for static files'
            }
        }
        stage('Test') {
            steps {
                echo 'No tests defined'
            }
        }
        stage('Deploy') {
            steps {
                sh 'mkdir -p /var/www/html/myapp'
                sh 'rm -rf /var/www/html/myapp/*'
                sh 'cp -r Jenkinsfile index.html script.js style.css /var/www/html/myapp/'
            }
        }
    }
    post {
        success {
            echo '✅ Build Succeeded!'
        }
        failure {
            echo '❌ Build Failed! Check logs.'
        }
    }
}
