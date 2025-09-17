pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out repository...'
                git branch: 'master', url: 'https://github.com/shwetaa24/personalweb.git'
            }
        }

        stage('Build') {
            steps {
                echo 'No build required for static website'
            }
        }

        stage('Test') {
            steps {
                echo 'No tests defined for this project'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying website...'
                // Add your deployment commands here
                // Example: sh 'scp -r * user@server:/var/www/html'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
