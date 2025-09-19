pipeline {
    agent any

    environment {
        VENV_DIR = 'venv'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/shwetaa24/personalweb.git'
            }
        }

      stage('Build') {
    steps {
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
                    # Activate virtual environment
                    source $VENV_DIR/bin/activate
                    pytest tests/
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    # Activate virtual environment
                    source $VENV_DIR/bin/activate
                    # Simple deployment: copy files to staging folder
                    cp -r * /var/www/html/
                '''
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
