pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/shwetaa24/personalweb.git'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    python3 -m venv venv
                    . venv/bin/activate
                    pip install --upgrade pip
                    pip install -r requirements.txt
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    . venv/bin/activate
                    pytest tests/
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    . venv/bin/activate
                    cp -r * /var/www/html/
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build, Test, Deploy succeeded!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}