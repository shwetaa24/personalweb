pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'pip install -r requirements.txt'
            }
        }

        stage('Test') {
            steps {
                sh 'pytest tests/'
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo "Deploying app..."'
                sh 'sudo cp -r * /var/www/html/'
            }
        }
    }

    post {
        success {
            echo "✅ Build #${BUILD_NUMBER} succeeded"
        }
        failure {
            echo "❌ Build #${BUILD_NUMBER} failed"
        }
    }
}
