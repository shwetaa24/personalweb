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
                // Install Python dependencies without virtual environment
                sh '''
                    python3 -m pip install --upgrade pip
                    python3 -m pip install -r requirements.txt
                '''
            }
        }

        stage('Test') {
            steps {
                // Run tests directly
                sh 'python3 -m pytest tests/'
            }
        }

        stage('Deploy') {
            steps {
                // Simple deployment: copy files to staging folder
                sh 'cp -r * /var/www/html/'
            }
        }
    }

    post {
        success {
            echo '✅ Build, Test, and Deploy succeeded!'
            // Optional: add Slack/email notifications here
        }
        failure {
            echo '❌ Build failed!'
            // Optional: add Slack/email notifications here
        }
    }
}
