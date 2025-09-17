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
        // Using SSH to copy files to web server
        sh '''
            scp -o StrictHostKeyChecking=no -r Jenkinsfile index.html script.js style.css ubuntu@65.1.194.177:/var/www/html/
        '''
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
