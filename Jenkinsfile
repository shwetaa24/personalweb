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
                // Use Bash and virtual environment
                sh '''
                    #!/bin/bash
                    python3 -m venv venv
                    source venv/bin/activate
                    pip install --upgrade pip
                    pip install -r requirements.txt
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    #!/bin/bash
                    source venv/bin/activate
                    pytest tests/
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    #!/bin/bash
                    source venv/bin/activate
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
